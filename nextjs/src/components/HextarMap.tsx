'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { io } from 'socket.io-client';
import pako from 'pako';

// Fix default marker icon paths broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HEXTAR_COORDS: [number, number] = [3.168724541722136, 101.61466425285002];

const SOCKET_URL = 'https://rapidbus-socketio-avl.prasarana.com.my';
const SOCKET_EVENT_IN = 'onFts-client';
const SOCKET_EVENT_OUT = 'onFts-reload';
const SOCKET_SID = '5ipamfo2bumjion6rcfjdbkhmu0032u0';
const SOCKET_PROVIDER = 'prm';
const ROUTE_FILTER = '';

const EV_BUS = new Set([
  'BNG4101', 'BNG4102', 'BNG4103', 'BNG4204', 'BNG4105',
  'BNG4106', 'BNG4107', 'BNG4108', 'BNG4109', 'BNG4110',
  'BNG4111', 'BNG4112', 'BNG4113', 'BNG4014', 'BNG4015',
]);

type RapidBus = {
  bus_no?: string;
  captain_id?: string;
  route?: string;
  provider?: string;
  latitude?: number | string;
  longitude?: number | string;
  speed?: number | string;
  dt_gps?: string;
  dir?: number | string;
  trip_rev_kind?: string;
  accessibility?: unknown;
};

type RapidBusPayload = Record<string, RapidBus>;

function parseNumber(value: number | string | undefined): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function routeMatches(busRoute: string, targetRoute: string): boolean {
  if (!targetRoute) return true;

  const normalizedBus = busRoute.trim();
  const normalizedTarget = targetRoute.trim();

  return (
    normalizedBus === normalizedTarget ||
    normalizedBus.includes(normalizedTarget) ||
    normalizedTarget.includes(normalizedBus) ||
    (normalizedTarget === 'BC04' &&
      (normalizedBus === 'BC4' || normalizedBus === 'BC04' || normalizedBus === 'BC 04'))
  );
}

function filterBuses(data: RapidBusPayload): RapidBusPayload {
  const filtered: RapidBusPayload = {};

  Object.entries(data).forEach(([key, bus]) => {
    if (!bus) return;
    if (!ROUTE_FILTER) {
      if (bus.provider?.toLowerCase() === SOCKET_PROVIDER) {
        filtered[key] = bus;
      }
      return;
    }

    if (bus.route && routeMatches(String(bus.route), ROUTE_FILTER)) {
      filtered[key] = bus;
    }
  });
console.log('Filtered bus data:', filtered);
  return filtered;
}

function decodeGzippedPayload(payload: string): RapidBusPayload {
  try {
    console.log('Received gzipped payload:', payload);
    const binary = atob(payload);
      console.log('Received gzipped payload (binary):', binary);
      var charData = binary.split('').map(function (x) {
        return x.charCodeAt(0);
    });
    var binData = new Uint8Array(charData);
    const inflated = pako.inflate(binData);
    const decoded = new TextDecoder('utf-8').decode(new Uint8Array(inflated));
    console.log('Decoded gzipped payload:', decoded);
    return JSON.parse(decoded) as RapidBusPayload;
  } catch {
    try {
        console.log('Decoded gzipped payload:', JSON.parse(payload));
      return JSON.parse(payload) as RapidBusPayload;
    } catch {
      return {};
    }
  }
}

function createBusIcon(bus: RapidBus): L.Icon {
  let iconColor = bus.trip_rev_kind === '00'
    ? 'green'
    : bus.trip_rev_kind === '99'
      ? 'yellow'
      : 'blue';

  if (['01', '03', '05'].includes(String(bus.trip_rev_kind ?? ''))) {
    iconColor = 'red';
  }

  const isAccessible = Boolean(bus.accessibility) && ['green', 'yellow'].includes(iconColor);
  const isEvBus = EV_BUS.has(String(bus.bus_no ?? '')) && ['green', 'yellow'].includes(iconColor);

  return L.icon({
    iconUrl: `https://myrapidbus.prasarana.com.my/assets/images/map/bus_icon/bus_${iconColor}${isAccessible ? '_oku' : ''}${isEvBus ? '_evb' : ''}.png`,
    iconSize: [30, 30],
  });
}

function createPopup(bus: RapidBus): string {
  return [
    `<b>${bus.bus_no ?? 'Unknown Bus'} (${bus.captain_id ?? '-'})</b>`,
    `<br>GPS: ${bus.dt_gps ?? '-'}`,
    `<br>Speed: ${bus.speed ?? '0'}km/h`,
    `<br>Route: ${bus.route ?? '-'}`,
  ].join('');
}

export default function HextarMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const busMarkersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: HEXTAR_COORDS,
      zoom: 16,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    L.marker(HEXTAR_COORDS)
      .addTo(map)
      .bindPopup(
        '<div style="font-family:sans-serif;text-align:center;">' +
          '<strong>Hextar World</strong><br/>' +
          'Empire City, Damansara<br/>' +
          '<small>CAFKL X Venue</small>' +
        '</div>'
      )
      .openPopup();

    const syncBusMarkers = (incomingData: RapidBusPayload) => {
      const mapInstance = mapRef.current;
      if (!mapInstance) return;

      const currentBusIds = new Set<string>();

      Object.values(incomingData).forEach((bus) => {
        const busNo = String(bus.bus_no ?? '').trim();
        const lat = parseNumber(bus.latitude);
        const lng = parseNumber(bus.longitude);

        if (!busNo || lat === null || lng === null) return;

        currentBusIds.add(busNo);
        const icon = createBusIcon(bus);
        const popupHtml = createPopup(bus);
        const existing = busMarkersRef.current.get(busNo);

        if (existing) {
          existing.setLatLng([lat, lng]);
          existing.setIcon(icon);
          existing.setPopupContent(popupHtml);
          return;
        }

        const marker = L.marker([lat, lng], { icon })
          .bindPopup(popupHtml, { autoClose: false })
          .bindTooltip(busNo)
          .setZIndexOffset(5000)
          .addTo(mapInstance);

        busMarkersRef.current.set(busNo, marker);
      });

      busMarkersRef.current.forEach((marker, busNo) => {
        if (currentBusIds.has(busNo)) return;
        marker.remove();
        busMarkersRef.current.delete(busNo);
      });
    };

    // autoConnect: false prevents the socket from opening immediately.
    // We defer the actual connect() call via setTimeout so that React
    // StrictMode's synchronous cleanup (unmount → remount) can cancel the
    // first invocation before the WebSocket handshake ever starts.
    let mounted = true;
    let timerId: number | undefined;

    const socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    });

    const requestReload = () => {
      if (socket.connected) {
        socket.emit(SOCKET_EVENT_OUT, {
          sid: SOCKET_SID,
          uid: '',
          provider: SOCKET_PROVIDER,
          route: ROUTE_FILTER,
        });
      }
    };

    socket.on('connect', () => {
      requestReload();
      timerId = window.setInterval(requestReload, 5000);
    });

    socket.on(SOCKET_EVENT_IN, (rawPayload: string) => {
      const decoded = decodeGzippedPayload(rawPayload);
      console.log('RapidBus raw bus data (decoded):', decoded);
      const filtered = filterBuses(decoded);
      syncBusMarkers(filtered);
    });

    // Defer connect so StrictMode cleanup can cancel before handshake starts
    const connectTimer = window.setTimeout(() => {
      if (mounted) socket.connect();
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(connectTimer);
      window.clearInterval(timerId);
      socket.off(SOCKET_EVENT_IN);
      socket.disconnect();

      busMarkersRef.current.forEach((marker) => marker.remove());
      busMarkersRef.current.clear();

      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full rounded-2xl overflow-hidden border border-brown/10 shadow-md"
      style={{ height: '380px' }}
    />
  );
}
