'use client';

import type { ChangeEvent } from 'react';
import type { CrowdConfig, Crossing, IntervalRow, TrackedPerson } from './crowd-types';

type Props = {
	config: CrowdConfig;
	updateConfig: (key: keyof CrowdConfig, value: CrowdConfig[keyof CrowdConfig]) => void;
	monitoring: boolean;
	status: 'idle' | 'starting' | 'live' | 'error';
	error: string;
	startedAt: number | null;
	elapsed: string;
	rows: IntervalRow[];
	crossings: Crossing[];
	people: TrackedPerson[];
	todayTotal: number;
	cameras: MediaDeviceInfo[];
	start: () => void;
	stop: () => void;
	videoRef: React.RefObject<HTMLVideoElement | null>;
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	onExport: (format: 'csv' | 'json') => void;
};

const formatTime = (timestamp: number) => new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(timestamp);

export default function CrowdDashboard(props: Props) {
	const { config, updateConfig, monitoring, status, error, startedAt, elapsed, rows, crossings, people, todayTotal, cameras, start, stop, videoRef, canvasRef, onExport } = props;
	const total = crossings.length;
	const leftToRight = crossings.filter((crossing) => crossing.direction === 'left-to-right').length;
	const rightToLeft = total - leftToRight;
	const looking = crossings.filter((crossing) => crossing.attention === 'looking').length;
	const latestRows = rows.slice(-8);
	const peak = Math.max(1, ...rows.map((row) => row.total));

	const field = (key: keyof CrowdConfig, value: CrowdConfig[keyof CrowdConfig]) => updateConfig(key, value);
	const handleRange = (key: keyof CrowdConfig) => (event: ChangeEvent<HTMLInputElement>) => field(key, Number(event.target.value));

	return (
		<div className="crowd-shell">
			<header className="crowd-topbar">
				<div className="crowd-brand"><span className="crowd-brand-mark"><span className="material-symbols-outlined">moving</span></span><span>FIELDNOTES <small>/ CROWD</small></span></div>
				<div className="crowd-top-meta"><span className={`crowd-live-dot ${monitoring ? 'is-live' : ''}`} />{monitoring ? 'MONITORING' : 'SESSION STANDBY'}<span className="crowd-top-divider" />LOCAL PROCESSING</div>
			</header>

			<main className="crowd-main">
				<section className="crowd-heading">
					<div><p className="crowd-kicker">EVENT INTELLIGENCE <span>•</span> TOOL 04</p><h1>Visitor flow</h1><p className="crowd-subtitle">A private, on-device view of how people move through your space.</p></div>
					<div className="crowd-session-actions">
						<label className="crowd-session-name"><span>SESSION</span><input value={config.sessionName} onChange={(event) => field('sessionName', event.target.value)} aria-label="Session name" maxLength={60} disabled={monitoring} /></label>
						<button className={`crowd-start ${monitoring ? 'is-stop' : ''}`} type="button" onClick={monitoring ? stop : start} disabled={status === 'starting'}>
							<span className="material-symbols-outlined">{monitoring ? 'stop' : status === 'starting' ? 'progress_activity' : 'videocam'}</span>{monitoring ? 'Stop session' : status === 'starting' ? 'Preparing camera' : 'Start monitoring'}
						</button>
					</div>
				</section>

				{error && <p className="crowd-error" role="alert"><span className="material-symbols-outlined">warning</span>{error}</p>}

				<section className="crowd-stat-grid" aria-label="Session summary">
					<Stat label="SESSION FOOTFALL" value={String(total).padStart(2, '0')} note="completed crossings" icon="groups" />
					<Stat label="LEFT → RIGHT" value={String(leftToRight).padStart(2, '0')} note="westbound flow" icon="trending_flat" tone="green" />
					<Stat label="RIGHT → LEFT" value={String(rightToLeft).padStart(2, '0')} note="eastbound flow" icon="trending_flat" tone="amber" reverse />
					<Stat label="LOOKED TOWARD CAMERA" value={String(looking).padStart(2, '0')} note={`${total ? Math.round(looking / total * 100) : 0}% of crossings`} icon="visibility" tone="rose" />
				</section>

				<section className="crowd-workspace">
					<div className="crowd-primary-column">
						<section className="crowd-panel camera-panel">
							<div className="crowd-panel-head"><div><p className="crowd-overline">01 / LIVE VIEW</p><h2>Camera feed</h2></div><span className={`crowd-feed-state ${status === 'live' ? 'is-live' : ''}`}><i />{status === 'live' ? 'LIVE' : status === 'starting' ? 'CONNECTING' : 'OFFLINE'}</span></div>
							<div className="crowd-camera-stage">
								<video ref={videoRef} className={monitoring ? 'is-visible' : ''} muted playsInline aria-label="Live camera preview" />
								<canvas ref={canvasRef} className={monitoring ? 'is-visible' : ''} aria-hidden="true" />
								{!monitoring && <div className="crowd-camera-placeholder"><span className="material-symbols-outlined">videocam_off</span><p>Camera is off</p><small>Start a session to activate the live view</small></div>}
								{monitoring && <div className="crowd-camera-corner">{people.length} IN FRAME <span>·</span> LINE {config.linePosition}%</div>}
							</div>
							<div className="crowd-camera-foot"><span><span className="material-symbols-outlined">shield_lock</span>Frames stay on this device</span><span><i className="crowd-legend-person" /> Person <i className="crowd-legend-line" /> Counting line</span></div>
						</section>

						<section className="crowd-panel flow-panel">
							<div className="crowd-panel-head"><div><p className="crowd-overline">02 / INTERVAL ACTIVITY</p><h2>Footfall over time</h2></div><span className="crowd-chart-unit">PEOPLE / {config.intervalMinutes} MIN</span></div>
							{rows.length ? <div className="crowd-chart" role="img" aria-label="Footfall per recording interval">
								<div className="crowd-chart-y"><span>{peak}</span><span>{Math.round(peak / 2)}</span><span>0</span></div>
								<div className="crowd-chart-bars">{latestRows.map((row) => <div className="crowd-chart-column" key={row.start}><div className="crowd-bar-track"><span style={{ height: `${Math.max(row.total ? 8 : 2, row.total / peak * 100)}%` }} title={`${row.total} visitors`} /></div><small>{formatTime(row.start)}</small></div>)}</div>
							</div> : <div className="crowd-chart-empty"><span className="material-symbols-outlined">monitoring</span><p>Interval activity appears here</p><small>Complete a line crossing to begin the chart.</small></div>}
						</section>
					</div>

					<aside className="crowd-side-column">
						<section className="crowd-panel session-panel">
							<div className="crowd-panel-head compact"><div><p className="crowd-overline">SESSION STATUS</p><h2>{monitoring ? 'In progress' : 'Ready to begin'}</h2></div><span className="material-symbols-outlined crowd-status-icon">{monitoring ? 'sensors' : 'schedule'}</span></div>
							<div className="crowd-session-stats"><div><span>DURATION</span><strong>{elapsed}</strong></div><div><span>TODAY’S TOTAL</span><strong>{String(todayTotal + total).padStart(2, '0')}</strong></div></div>
							<div className="crowd-interval-current"><span>CURRENT INTERVAL</span><strong>{rows.length ? `${formatTime(rows[rows.length - 1].start)} — ${rows[rows.length - 1].total} visitors` : 'Waiting for first crossing'}</strong></div>
						</section>

						<details className="crowd-panel settings-panel" open>
							<summary><div><p className="crowd-overline">03 / SESSION SETUP</p><h2>Detection settings</h2></div><span className="material-symbols-outlined">tune</span></summary>
							<div className="crowd-setting"><label htmlFor="interval">Recording interval</label><select id="interval" value={[1, 5, 10, 15, 30, 60].includes(config.intervalMinutes) ? config.intervalMinutes : 'custom'} onChange={(event) => field('intervalMinutes', event.target.value === 'custom' ? 20 : Number(event.target.value))} disabled={monitoring}>{[1, 5, 10, 15, 30, 60].map((minutes) => <option key={minutes} value={minutes}>{minutes === 60 ? '1 hour' : `${minutes} minutes`}</option>)}<option value="custom">Custom</option></select></div>
							{![1, 5, 10, 15, 30, 60].includes(config.intervalMinutes) && <div className="crowd-setting"><label htmlFor="custom-interval">Custom minutes</label><input id="custom-interval" className="crowd-custom-interval" type="number" min="1" max="720" value={config.intervalMinutes} onChange={(event) => field('intervalMinutes', Math.min(720, Math.max(1, Number(event.target.value) || 1)))} disabled={monitoring} /></div>}
							<div className="crowd-setting"><label htmlFor="camera-select">Camera</label><select id="camera-select" value={config.cameraId} onChange={(event) => field('cameraId', event.target.value)} disabled={monitoring}><option value="">Browser default</option>{cameras.map((camera, index) => <option value={camera.deviceId} key={camera.deviceId}>{camera.label || `Camera ${index + 1}`}</option>)}</select></div>
							<div className="crowd-setting"><label htmlFor="resolution">Resolution</label><select id="resolution" value={config.resolution} onChange={(event) => field('resolution', event.target.value)} disabled={monitoring}><option value="720p">HD · 720p</option><option value="1080p">Full HD · 1080p</option></select></div>
							<div className="crowd-setting"><label htmlFor="area">Detection area</label><select id="area" value={config.detectionArea} onChange={(event) => field('detectionArea', event.target.value)} disabled={monitoring}><option value="full">Full frame</option><option value="center">Center 70%</option></select></div>
							<div className="crowd-setting crowd-range-setting"><label htmlFor="line-position">Counting line <output>{config.linePosition}%</output></label><input id="line-position" type="range" min="20" max="80" step="1" value={config.linePosition} onChange={handleRange('linePosition')} disabled={monitoring} /></div>
							<div className="crowd-setting crowd-range-setting"><label htmlFor="confidence">Minimum confidence <output>{Math.round(config.minimumConfidence * 100)}%</output></label><input id="confidence" type="range" min="30" max="90" step="5" value={Math.round(config.minimumConfidence * 100)} onChange={(event) => field('minimumConfidence', Number(event.target.value) / 100)} disabled={monitoring} /></div>
							<div className="crowd-setting"><label htmlFor="tracking-duration">Minimum tracking time</label><select id="tracking-duration" value={config.minimumTrackingMs} onChange={(event) => field('minimumTrackingMs', Number(event.target.value))} disabled={monitoring}><option value="0">No minimum</option><option value="500">0.5 seconds</option><option value="1000">1 second</option><option value="1500">1.5 seconds</option></select></div>
							<p className="crowd-settings-note"><span className="material-symbols-outlined">info</span>Pose-based attention is an estimate. Faces that are small, obscured, or uncertain are recorded as unknown.</p>
						</details>

						<section className="crowd-panel attention-panel">
							<div className="crowd-panel-head compact"><div><p className="crowd-overline">04 / ATTENTION ESTIMATE</p><h2>Camera attention</h2></div><span className="material-symbols-outlined">face</span></div>
							<div className="crowd-attention-bar"><i style={{ width: `${total ? looking / total * 100 : 0}%` }} /><i style={{ width: `${total ? crossings.filter((crossing) => crossing.attention === 'not-looking').length / total * 100 : 0}%` }} /></div>
							<div className="crowd-attention-legend"><span><i className="looking-dot" />Looking <b>{looking}</b></span><span><i className="notlooking-dot" />Not looking <b>{crossings.filter((crossing) => crossing.attention === 'not-looking').length}</b></span><span><i className="unknown-dot" />Unknown <b>{crossings.filter((crossing) => crossing.attention === 'unknown').length}</b></span></div>
						</section>
					</aside>
				</section>

				<section className="crowd-panel report-panel">
					<div className="crowd-panel-head report-head"><div><p className="crowd-overline">05 / SESSION REPORT</p><h2>Interval breakdown</h2></div><div className="crowd-export-actions"><button type="button" onClick={() => onExport('csv')} disabled={!rows.length}><span className="material-symbols-outlined">table_view</span>Export CSV</button><button type="button" onClick={() => onExport('json')} disabled={!rows.length} aria-label="Export JSON"><span className="material-symbols-outlined">data_object</span><span className="export-json-label">JSON</span></button></div></div>
					<div className="crowd-table-wrap"><table><thead><tr><th>INTERVAL</th><th>TOTAL</th><th>LEFT → RIGHT</th><th>RIGHT → LEFT</th><th>LOOKING</th><th>NOT LOOKING</th><th>UNKNOWN</th></tr></thead><tbody>{rows.length ? rows.slice().reverse().slice(0, 12).map((row) => <tr key={row.start}><td>{formatTime(row.start)} – {formatTime(row.end)}</td><td className="table-total">{row.total}</td><td>{row.leftToRight}</td><td>{row.rightToLeft}</td><td>{row.looking}</td><td>{row.notLooking}</td><td>{row.unknown}</td></tr>) : <tr><td colSpan={7} className="crowd-table-empty">Your interval summary will appear after monitoring begins.</td></tr>}</tbody></table></div>
				</section>

				<div className="crowd-privacy"><span className="material-symbols-outlined">enhanced_encryption</span><p><strong>Privacy by design</strong> · Video is processed in your browser. No footage or face data is uploaded or saved. Anonymous tracking IDs are discarded when the session ends.</p></div>
				{startedAt && <p className="crowd-started-at">SESSION STARTED {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(startedAt)}</p>}
			</main>
		</div>
	);
}

function Stat({ label, value, note, icon, tone = 'default', reverse = false }: { label: string; value: string; note: string; icon: string; tone?: string; reverse?: boolean }) {
	return <article className={`crowd-stat crowd-stat-${tone}`}><div className="crowd-stat-top"><span>{label}</span><span className={`material-symbols-outlined ${reverse ? 'is-reversed' : ''}`}>{icon}</span></div><div className="crowd-stat-value">{value}</div><p>{note}</p></article>;
}