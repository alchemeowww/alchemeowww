'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CrowdDashboard from './CrowdDashboard';
import type { CrowdConfig, CrowdSession, Crossing, IntervalMinutes, IntervalRow } from './crowd-types';
import { useCrowdMonitor } from './useCrowdMonitor';
import './event-crowd.css';

const CONFIG_KEY = 'event-crowd-config-v1';
const SESSIONS_KEY = 'event-crowd-sessions-v1';
const DEFAULT_CONFIG: CrowdConfig = {
	sessionName: 'Market floor',
	intervalMinutes: 5,
	linePosition: 50,
	detectionArea: 'full',
	minimumConfidence: 0.55,
	minimumTrackingMs: 500,
	cameraId: '',
	resolution: '720p',
};

export default function EventCrowdPage() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [monitoring, setMonitoring] = useState(false);
	const [startedAt, setStartedAt] = useState<number | null>(null);
	const [endedAt, setEndedAt] = useState<number | null>(null);
	const [clock, setClock] = useState(0);
	const [savedToday, setSavedToday] = useState(0);
	const [hydrated, setHydrated] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const monitor = useCrowdMonitor(videoRef, canvasRef, config, monitoring);
	const refreshCameras = monitor.refreshCameras;

	useEffect(() => {
		let cancelled = false;
		const restoreLocalData = async () => {
			await Promise.resolve();
			if (cancelled) return;
			try {
				const storedConfig = localStorage.getItem(CONFIG_KEY);
				if (storedConfig) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(storedConfig) as Partial<CrowdConfig> });
				const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]') as CrowdSession[];
				const today = new Date().toDateString();
				setSavedToday(sessions.filter((session) => new Date(session.startedAt).toDateString() === today).reduce((sum, session) => sum + session.rows.reduce((rowSum, row) => rowSum + row.total, 0), 0));
			} catch {
				localStorage.removeItem(CONFIG_KEY);
			}
			setClock(Date.now());
			setHydrated(true);
			void refreshCameras();
		};
		void restoreLocalData();
		return () => { cancelled = true; };
	}, [refreshCameras]);

	useEffect(() => {
		if (!hydrated) return;
		localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
	}, [config, hydrated]);

	useEffect(() => {
		if (!monitoring) return;
		const timer = window.setInterval(() => setClock(Date.now()), 1000);
		return () => window.clearInterval(timer);
	}, [monitoring]);

	const updateConfig = useCallback((key: keyof CrowdConfig, value: CrowdConfig[keyof CrowdConfig]) => {
		setConfig((current) => ({ ...current, [key]: value }));
	}, []);

	const currentEnd = monitoring ? clock : endedAt ?? clock;
	const rows = useMemo(() => startedAt ? buildRows(startedAt, currentEnd, monitor.crossings, config.intervalMinutes) : [], [startedAt, currentEnd, monitor.crossings, config.intervalMinutes]);
	const elapsed = formatDuration(startedAt ? currentEnd - startedAt : 0);

	const start = () => {
		setConfig((current) => ({ ...current, sessionName: current.sessionName.trim() || 'Untitled session' }));
		monitor.clearCrossings();
		const startTime = Date.now();
		setStartedAt(startTime);
		setEndedAt(null);
		setClock(startTime);
		setMonitoring(true);
	};

	const stop = () => {
		const endTime = Date.now();
		if (startedAt !== null) {
			const session: CrowdSession = {
				id: `${startedAt}`,
				name: config.sessionName.trim() || 'Untitled session',
				startedAt,
				endedAt: endTime,
				config: { ...config },
				rows: buildRows(startedAt, endTime, monitor.crossings, config.intervalMinutes),
			};
			try {
				const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]') as CrowdSession[];
				localStorage.setItem(SESSIONS_KEY, JSON.stringify([session, ...sessions].slice(0, 50)));
				if (new Date(startedAt).toDateString() === new Date().toDateString()) setSavedToday((value) => value + session.rows.reduce((sum, row) => sum + row.total, 0));
			} catch {
				localStorage.removeItem(SESSIONS_KEY);
			}
		}
		setEndedAt(endTime);
		setClock(endTime);
		setMonitoring(false);
	};

	const onExport = (format: 'csv' | 'json') => {
		if (!rows.length) return;
		const payload = format === 'json' ? JSON.stringify({ session: config.sessionName, startedAt, endedAt: currentEnd, intervalMinutes: config.intervalMinutes, rows }, null, 2) : [
			['Session', 'Interval start', 'Interval end', 'Total footfall', 'Left to right', 'Right to left', 'Looking', 'Not looking', 'Unknown'].join(','),
			...rows.map((row) => [csv(config.sessionName), new Date(row.start).toISOString(), new Date(row.end).toISOString(), row.total, row.leftToRight, row.rightToLeft, row.looking, row.notLooking, row.unknown].join(',')),
		].join('\r\n');
		const blob = new Blob([payload], { type: format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json' });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = `${(config.sessionName.trim() || 'crowd-session').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase()}.${format}`;
		anchor.click();
		URL.revokeObjectURL(url);
	};

	return <><Header /><div className="event-crowd-page"><CrowdDashboard config={config} updateConfig={updateConfig} monitoring={monitoring} status={monitor.status} error={monitor.error} startedAt={startedAt} elapsed={elapsed} rows={rows} crossings={monitor.crossings} people={monitor.people} todayTotal={savedToday + (monitoring ? monitor.crossings.length : 0)} cameras={monitor.cameras} start={start} stop={stop} videoRef={videoRef} canvasRef={canvasRef} onExport={onExport} /></div><Footer /></>;
}

function buildRows(start: number, end: number, crossings: Crossing[], intervalMinutes: IntervalMinutes): IntervalRow[] {
	const intervalMs = intervalMinutes * 60_000;
	const count = Math.max(1, Math.ceil(Math.max(0, end - start) / intervalMs));
	return Array.from({ length: count }, (_, index) => {
		const rowStart = start + index * intervalMs;
		const rowEnd = Math.min(rowStart + intervalMs, Math.max(rowStart, end));
		const events = crossings.filter((crossing) => crossing.timestamp >= rowStart && (crossing.timestamp < rowStart + intervalMs || index === count - 1 && crossing.timestamp <= end));
		const leftToRight = events.filter((event) => event.direction === 'left-to-right').length;
		const rightToLeft = events.length - leftToRight;
		const looking = events.filter((event) => event.attention === 'looking').length;
		const notLooking = events.filter((event) => event.attention === 'not-looking').length;
		return { start: rowStart, end: rowEnd, total: events.length, leftToRight, rightToLeft, looking, notLooking, unknown: events.length - looking - notLooking };
	});
}

function formatDuration(milliseconds: number) {
	const seconds = Math.floor(Math.max(0, milliseconds) / 1000);
	return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function csv(value: string) {
	return `"${value.replaceAll('"', '""')}"`;
}