'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CrowdDashboard from './CrowdDashboard';
import type { AttentionReading, AttentionSummary, CrowdConfig, CrowdSession, Crossing, IntervalMinutes, IntervalRow, LookingSuccess } from './crowd-types';
import { useCrowdMonitor } from './useCrowdMonitor';

const CONFIG_KEY = 'event-crowd-config-v1';
const SESSIONS_KEY = 'event-crowd-sessions-v1';
const DEFAULT_CONFIG: CrowdConfig = {
	sessionName: 'Market floor',
	countMode: 'line-crossing',
	intervalMinutes: 5,
	linePosition: 50,
	detectionArea: 'full',
	minimumConfidence: 0.55,
	minimumTrackingMs: 500,
	gazeDurationMs: 1000,
	cameraId: '',
	cameraZoom: 1,
	resolution: '720p',
};

export default function EventCrowdPage() {
	const [config, setConfig] = useState(DEFAULT_CONFIG);
	const [monitoring, setMonitoring] = useState(false);
	const [startedAt, setStartedAt] = useState<number | null>(null);
	const [endedAt, setEndedAt] = useState<number | null>(null);
	const [clock, setClock] = useState(0);
	const [savedToday, setSavedToday] = useState(0);
	const [completedRows, setCompletedRows] = useState<IntervalRow[] | null>(null);
	const [hydrated, setHydrated] = useState(false);
	const backupHandleRef = useRef<BackupFileHandle | null>(null);
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
	const rows = useMemo(() => {
		if (!startedAt) return [];
		if (!monitoring && completedRows) return completedRows;
		return buildRows(startedAt, currentEnd, monitor.crossings, monitor.attentionReadings, monitor.lookingSuccesses, config.intervalMinutes);
	}, [startedAt, currentEnd, monitoring, completedRows, monitor.crossings, monitor.attentionReadings, monitor.lookingSuccesses, config.intervalMinutes]);
	const attentionCounts = useMemo<AttentionSummary>(() => {
		if (!monitoring && completedRows) {
			return completedRows.reduce((summary, row) => ({
				looking: summary.looking + row.looking,
				notLooking: summary.notLooking + row.notLooking,
				unknown: summary.unknown + row.unknown,
			}), { looking: 0, notLooking: 0, unknown: 0 });
		}
		const summary = monitor.attentionReadings.reduce((counts, reading) => {
			if (reading.attention === 'not-looking') counts.notLooking += 1;
			else if (reading.attention === 'unknown') counts.unknown += 1;
			return counts;
		}, { looking: 0, notLooking: 0, unknown: 0 });
		summary.looking = monitor.lookingSuccesses.length;
		return summary;
	}, [monitoring, completedRows, monitor.attentionReadings, monitor.lookingSuccesses]);
	const completedCount = monitoring ? Math.max(0, rows.length - 1) : 0;
	useEffect(() => {
		if (!completedCount || !startedAt) return;
		void writeBackup(backupHandleRef.current, buildBackupCsv(rows.slice(0, completedCount)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [completedCount, startedAt]);
	const elapsed = formatDuration(startedAt ? currentEnd - startedAt : 0);

	const start = async () => {
		backupHandleRef.current = await pickBackupFile(config.sessionName);
		setConfig((current) => ({ ...current, sessionName: current.sessionName.trim() || 'Untitled session' }));
		monitor.clearCrossings();
		setCompletedRows(null);
		const startTime = Date.now();
		setStartedAt(startTime);
		setEndedAt(null);
		setClock(startTime);
		setMonitoring(true);
	};

	const stop = () => {
		const endTime = Date.now();
		const finalRows = startedAt !== null ? buildRows(startedAt, endTime, monitor.crossings, monitor.attentionReadings, monitor.lookingSuccesses, config.intervalMinutes) : [];
		if (startedAt !== null) {
			const session: CrowdSession = {
				id: `${startedAt}`,
				name: config.sessionName.trim() || 'Untitled session',
				startedAt,
				endedAt: endTime,
				config: { ...config },
				rows: finalRows,
			};
			try {
				const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]') as CrowdSession[];
				localStorage.setItem(SESSIONS_KEY, JSON.stringify([session, ...sessions].slice(0, 50)));
				if (new Date(startedAt).toDateString() === new Date().toDateString()) setSavedToday((value) => value + session.rows.reduce((sum, row) => sum + row.total, 0));
			} catch {
				localStorage.removeItem(SESSIONS_KEY);
			}
		}
		if (finalRows.length) {
			const backupCsv = buildBackupCsv(finalRows);
			if (backupHandleRef.current) void writeBackup(backupHandleRef.current, backupCsv);
			else downloadFile(backupCsv, `${fileSlug(config.sessionName)}-footfall-backup.csv`, 'text/csv;charset=utf-8');
			backupHandleRef.current = null;
		}
		setCompletedRows(finalRows);
		monitor.clearAttentionReadings();
		monitor.clearLookingSuccesses();
		setEndedAt(endTime);
		setClock(endTime);
		setMonitoring(false);
	};

	const onExport = (format: 'csv' | 'json') => {
		if (!rows.length) return;
		const payload = format === 'json' ? JSON.stringify({ session: config.sessionName, countMode: config.countMode, gazeDurationMs: config.gazeDurationMs, startedAt, endedAt: currentEnd, intervalMinutes: config.intervalMinutes, rows }, null, 2) : [
			['Session', 'Counting method', 'Look duration threshold (ms)', 'Interval start', 'Interval end', 'Total footfall', 'Presence', 'Left to right', 'Right to left', 'Looking', 'Not looking', 'Unknown'].join(','),
			...rows.map((row) => [csv(config.sessionName), csv(config.countMode), config.gazeDurationMs, new Date(row.start).toISOString(), new Date(row.end).toISOString(), row.total, row.presence, row.leftToRight, row.rightToLeft, row.looking, row.notLooking, row.unknown].join(',')),
		].join('\r\n');
		downloadFile(payload, `${fileSlug(config.sessionName)}.${format}`, format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json');
	};

	return <><Header showLogo={false}/><div className="event-crowd-page"><CrowdDashboard config={config} updateConfig={updateConfig} monitoring={monitoring} status={monitor.status} attentionStatus={monitor.attentionStatus} error={monitor.error} startedAt={startedAt} elapsed={elapsed} rows={rows} crossings={monitor.crossings} attentionCounts={attentionCounts} people={monitor.people} todayTotal={savedToday + (monitoring ? monitor.crossings.length : 0)} cameras={monitor.cameras} zoomRange={monitor.zoomRange} start={start} stop={stop} videoRef={videoRef} canvasRef={canvasRef} onExport={onExport} /></div><Footer smallFooter={true} /></>;
}

function buildRows(start: number, end: number, crossings: Crossing[], attentionReadings: AttentionReading[], lookingSuccesses: LookingSuccess[], intervalMinutes: IntervalMinutes): IntervalRow[] {
	const intervalMs = intervalMinutes * 60_000;
	const count = Math.max(1, Math.ceil(Math.max(0, end - start) / intervalMs));
	return Array.from({ length: count }, (_, index) => {
		const rowStart = start + index * intervalMs;
		const rowEnd = Math.min(rowStart + intervalMs, Math.max(rowStart, end));
		const events = crossings.filter((crossing) => crossing.timestamp >= rowStart && (crossing.timestamp < rowStart + intervalMs || index === count - 1 && crossing.timestamp <= end));
		const readings = attentionReadings.filter((reading) => reading.timestamp >= rowStart && (reading.timestamp < rowStart + intervalMs || index === count - 1 && reading.timestamp <= end));
		const successfulLooks = lookingSuccesses.filter((success) => success.timestamp >= rowStart && (success.timestamp < rowStart + intervalMs || index === count - 1 && success.timestamp <= end));
		const leftToRight = events.filter((event) => event.direction === 'left-to-right').length;
		const rightToLeft = events.filter((event) => event.direction === 'right-to-left').length;
		const presence = events.filter((event) => event.direction === 'presence').length;
		const looking = successfulLooks.length;
		const notLooking = readings.filter((reading) => reading.attention === 'not-looking').length;
		const unknown = readings.filter((reading) => reading.attention === 'unknown').length;
		return { start: rowStart, end: rowEnd, total: events.length, presence, leftToRight, rightToLeft, looking, notLooking, unknown };
	});
}

function formatDuration(milliseconds: number) {
	const seconds = Math.floor(Math.max(0, milliseconds) / 1000);
	return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function csv(value: string) {
	return `"${value.replaceAll('"', '""')}"`;
}
type BackupFileHandle = { createWritable: () => Promise<{ write: (data: string) => Promise<void>; close: () => Promise<void> }> };

function fileSlug(name: string) {
	return (name.trim() || 'crowd-session').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
}

function downloadFile(content: string, filename: string, type: string) {
	const url = URL.createObjectURL(new Blob([content], { type }));
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}

// Lets the user pick a file once so the backup can be rewritten after every interval; unsupported browsers fall back to a download on stop.
async function pickBackupFile(sessionName: string): Promise<BackupFileHandle | null> {
	const picker = (window as unknown as { showSaveFilePicker?: (options: object) => Promise<BackupFileHandle> }).showSaveFilePicker;
	if (!picker) return null;
	try {
		return await picker({ suggestedName: `${fileSlug(sessionName)}-footfall-backup.csv`, types: [{ description: 'CSV file', accept: { 'text/csv': ['.csv'] } }] });
	} catch {
		return null;
	}
}

async function writeBackup(handle: BackupFileHandle | null, content: string) {
	if (!handle) return;
	try {
		const writable = await handle.createWritable();
		await writable.write(content);
		await writable.close();
	} catch (error) {
		console.error('Could not write the footfall backup', error);
	}
}

function formatDateTime(timestamp: number) {
	const date = new Date(timestamp);
	const pad = (value: number) => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function buildBackupCsv(rows: IntervalRow[]) {
	return [
		['startDateTime', 'endDateTime', 'totalFootfall', 'leftToRight', 'rightToLeft', 'lookingAtBooth'].join(','),
		...rows.map((row) => [formatDateTime(row.start), formatDateTime(row.end), row.total, row.leftToRight, row.rightToLeft, row.looking].join(',')),
	].join('\r\n');
}
