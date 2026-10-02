'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import type { CrowdConfig, Crossing, TrackedPerson } from './crowd-types';

type MonitorStatus = 'idle' | 'starting' | 'live' | 'error';
type Track = { id: number; x: number; y: number; firstSeen: number; lastSeen: number; counted: boolean };

const PERSON_MODEL = 'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite';
const FACE_MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

export function useCrowdMonitor(
	videoRef: MutableRefObject<HTMLVideoElement | null>,
	canvasRef: MutableRefObject<HTMLCanvasElement | null>,
	config: CrowdConfig,
	enabled: boolean,
) {
	const [status, setStatus] = useState<MonitorStatus>('idle');
	const [error, setError] = useState('');
	const [crossings, setCrossings] = useState<Crossing[]>([]);
	const [people, setPeople] = useState<TrackedPerson[]>([]);
	const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
	const [cameraId, setCameraId] = useState(config.cameraId);
	const configRef = useRef(config);
	configRef.current = config;

	const refreshCameras = useCallback(async () => {
		if (!navigator.mediaDevices?.enumerateDevices) return;
		const devices = await navigator.mediaDevices.enumerateDevices();
		setCameras(devices.filter((device) => device.kind === 'videoinput'));
	}, []);

	useEffect(() => {
		setCameraId(config.cameraId);
	}, [config.cameraId]);

	useEffect(() => {
		if (!enabled) {
			setStatus('idle');
			setPeople([]);
			return;
		}
		let cancelled = false;
		let frameRequest = 0;
		const videoElement = videoRef.current;
		const canvasElement = canvasRef.current;
		let stream: MediaStream | undefined;
		let detector: import('@mediapipe/tasks-vision').ObjectDetector | undefined;
		let faceLandmarker: import('@mediapipe/tasks-vision').FaceLandmarker | undefined;
		let lastFrame = 0;
		let lastFaceFrame = 0;
		let nextId = 1;
		let tracks: Track[] = [];
		let recentFaces: Array<{ x: number; y: number; looking: boolean | null }> = [];
		let lastPublish = 0;

		const boot = async () => {
			try {
				setStatus('starting');
				setError('');
				const mediaDevices = navigator.mediaDevices;
				if (!mediaDevices?.getUserMedia) throw new Error('Camera access is not available in this browser.');
				stream = await mediaDevices.getUserMedia({
					video: {
						...(cameraId ? { deviceId: { exact: cameraId } } : { facingMode: { ideal: 'environment' } }),
						width: { ideal: configRef.current.resolution === '1080p' ? 1920 : 1280 },
						height: { ideal: configRef.current.resolution === '1080p' ? 1080 : 720 },
					},
					audio: false,
				});
				if (cancelled) return stream.getTracks().forEach((track) => track.stop());
				const video = videoRef.current;
				if (!video) throw new Error('Camera preview could not be initialized.');
				video.srcObject = stream;
				await video.play();
				await refreshCameras();

				const vision = await import('@mediapipe/tasks-vision');
				const fileset = await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm');
				const createDetector = (delegate: 'GPU' | 'CPU') => vision.ObjectDetector.createFromOptions(fileset, {
					baseOptions: { modelAssetPath: PERSON_MODEL, delegate },
					categoryAllowlist: ['person'], runningMode: 'VIDEO', maxResults: 20,
					scoreThreshold: configRef.current.minimumConfidence,
				});
				const createFaceLandmarker = (delegate: 'GPU' | 'CPU') => vision.FaceLandmarker.createFromOptions(fileset, {
					baseOptions: { modelAssetPath: FACE_MODEL, delegate },
					runningMode: 'VIDEO', numFaces: 20, outputFacialTransformationMatrixes: false,
				});
				const [personTask, faceTask] = await Promise.allSettled([
					createDetector('GPU').catch(() => createDetector('CPU')),
					createFaceLandmarker('GPU').catch(() => createFaceLandmarker('CPU')),
				]);
				if (personTask.status === 'rejected') throw personTask.reason;
				detector = personTask.value;
				if (faceTask.status === 'fulfilled') faceLandmarker = faceTask.value;
				if (cancelled) {
					detector.close();
					faceLandmarker?.close();
					return;
				}
				setStatus('live');

				const processFrame = (time: number) => {
					if (cancelled) return;
					frameRequest = requestAnimationFrame(processFrame);
					const currentVideo = videoRef.current;
					if (!detector || !currentVideo || currentVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || time - lastFrame < 250) return;
					lastFrame = time;
					const now = performance.now();
					const frame = detector.detectForVideo(currentVideo, now);
					const activeConfig = configRef.current;
					if (faceLandmarker && now - lastFaceFrame > 450) {
						lastFaceFrame = now;
						try {
							const result = faceLandmarker.detectForVideo(currentVideo, now);
							recentFaces = result.faceLandmarks.map((landmarks) => {
								const leftEye = landmarks[33];
								const rightEye = landmarks[263];
								const nose = landmarks[1];
								if (!leftEye || !rightEye || !nose) return { x: 0, y: 0, looking: null };
								const eyeDistance = Math.abs(rightEye.x - leftEye.x);
								const eyeMidpoint = (rightEye.x + leftEye.x) / 2;
								const yawOffset = Math.abs(nose.x - eyeMidpoint) / Math.max(eyeDistance, 0.001);
								const eyeHeight = (leftEye.y + rightEye.y) / 2;
								const pitchOffset = Math.abs(nose.y - eyeHeight) / Math.max(eyeDistance, 0.001);
								return { x: nose.x, y: nose.y, looking: yawOffset < 0.19 && pitchOffset > 0.25 && pitchOffset < 0.82 ? true : yawOffset > 0.32 || pitchOffset <= 0.25 || pitchOffset >= 0.82 ? false : null };
							});
						} catch {
							recentFaces = [];
						}
					}

					const detected = frame.detections.flatMap((detection) => {
						const box = detection.boundingBox;
						const confidence = detection.categories[0]?.score ?? 0;
						if (!box || confidence < activeConfig.minimumConfidence) return [];
						const x = (box.originX + box.width / 2) / currentVideo.videoWidth;
						const y = (box.originY + box.height / 2) / currentVideo.videoHeight;
						return [{ x, y, left: box.originX / currentVideo.videoWidth, top: box.originY / currentVideo.videoHeight, width: box.width / currentVideo.videoWidth, height: box.height / currentVideo.videoHeight, confidence }];
					})
						.filter((person) => activeConfig.detectionArea === 'full' || (person.x > 0.15 && person.x < 0.85));
					const used = new Set<number>();
					const nextTracks: Track[] = [];
					const visiblePeople: TrackedPerson[] = [];
					for (const person of detected) {
						let closestIndex = -1;
						let closestDistance = 0.18;
						tracks.forEach((track, index) => {
							if (used.has(index)) return;
							const distance = Math.hypot(track.x - person.x, track.y - person.y);
							if (distance < closestDistance) { closestDistance = distance; closestIndex = index; }
						});
						const previous = closestIndex >= 0 ? tracks[closestIndex] : undefined;
						if (closestIndex >= 0) used.add(closestIndex);
						const track: Track = previous
							? { ...previous, x: person.x, y: person.y, lastSeen: now }
							: { id: nextId++, x: person.x, y: person.y, firstSeen: now, lastSeen: now, counted: false };
						const face = recentFaces.find((item) => item.x >= person.left && item.x <= person.left + person.width && item.y >= person.top && item.y <= person.top + person.height);
						const attention = face?.looking === true ? 'looking' : face?.looking === false ? 'not-looking' : 'unknown';
						if (previous && !track.counted && now - track.firstSeen >= activeConfig.minimumTrackingMs && ((previous.x < activeConfig.linePosition / 100 && person.x >= activeConfig.linePosition / 100) || (previous.x > activeConfig.linePosition / 100 && person.x <= activeConfig.linePosition / 100))) {
							track.counted = true;
							setCrossings((current) => [...current, { timestamp: Date.now(), direction: person.x > previous.x ? 'left-to-right' : 'right-to-left', attention }]);
						}
						nextTracks.push(track);
						visiblePeople.push({ id: track.id, left: person.left, top: person.top, width: person.width, height: person.height, confidence: person.confidence });
					}
					tracks = [...nextTracks, ...tracks.filter((track, index) => !used.has(index) && now - track.lastSeen < 1200)];
					if (time - lastPublish > 100) {
						lastPublish = time;
						setPeople(visiblePeople);
						drawOverlay(canvasRef.current, currentVideo, visiblePeople, activeConfig.linePosition, activeConfig.detectionArea);
					}
				};
				frameRequest = requestAnimationFrame(processFrame);
			} catch (caughtError) {
				if (!cancelled) {
					setError(caughtError instanceof Error ? caughtError.message : 'Could not start camera monitoring.');
					setStatus('error');
				}
			}
		};

		void boot();
		return () => {
			cancelled = true;
			cancelAnimationFrame(frameRequest);
			stream?.getTracks().forEach((track) => track.stop());
			if (videoElement) videoElement.srcObject = null;
			detector?.close();
			faceLandmarker?.close();
			canvasElement?.getContext('2d')?.clearRect(0, 0, canvasElement.width, canvasElement.height);
		};
	}, [enabled, cameraId, config.resolution, refreshCameras, videoRef, canvasRef]);

	const clearCrossings = useCallback(() => setCrossings([]), []);
	return { status, error, crossings, people, cameras, cameraId, setCameraId, refreshCameras, clearCrossings };
}

function drawOverlay(canvas: HTMLCanvasElement | null, video: HTMLVideoElement, people: TrackedPerson[], linePosition: number, area: CrowdConfig['detectionArea']) {
	if (!canvas || !video.videoWidth || !video.videoHeight) return;
	if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
	}
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (area === 'center') {
		context.fillStyle = 'rgba(15, 24, 22, 0.4)';
		context.fillRect(0, 0, canvas.width * 0.15, canvas.height);
		context.fillRect(canvas.width * 0.85, 0, canvas.width * 0.15, canvas.height);
	}
	context.setLineDash([12, 10]);
	context.strokeStyle = '#f4c95d';
	context.lineWidth = Math.max(2, canvas.width / 500);
	context.beginPath();
	context.moveTo(canvas.width * linePosition / 100, 0);
	context.lineTo(canvas.width * linePosition / 100, canvas.height);
	context.stroke();
	context.setLineDash([]);
	people.forEach((person) => {
		const x = person.left * canvas.width;
		const y = person.top * canvas.height;
		const width = person.width * canvas.width;
		const height = person.height * canvas.height;
		context.strokeStyle = '#82d6ac';
		context.lineWidth = Math.max(2, canvas.width / 500);
		context.strokeRect(x, y, width, height);
		context.fillStyle = '#82d6ac';
		context.font = `600 ${Math.max(12, canvas.width / 90)}px sans-serif`;
		context.fillText(`P${person.id}  ${Math.round(person.confidence * 100)}%`, x, Math.max(14, y - 6));
	});
}