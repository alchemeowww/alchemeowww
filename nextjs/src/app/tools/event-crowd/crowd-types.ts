export type Attention = 'looking' | 'not-looking' | 'unknown';
export type AttentionModelStatus = 'idle' | 'loading' | 'ready' | 'unavailable';
export type Direction = 'left-to-right' | 'right-to-left';
export type CountMode = 'line-crossing' | 'person-detection';
export type IntervalMinutes = number;
export type CameraZoomRange = { min: number; max: number; step: number };

export type CrowdConfig = {
	sessionName: string;
	countMode: CountMode;
	intervalMinutes: IntervalMinutes;
	linePosition: number;
	detectionArea: 'full' | 'center';
	minimumConfidence: number;
	minimumTrackingMs: number;
	gazeDurationMs: number;
	cameraId: string;
	cameraZoom: number;
	resolution: '720p' | '1080p';
};

export type Crossing = {
	timestamp: number;
	direction: Direction | 'presence';
	attention: Attention;
};

export type AttentionReading = {
	trackId: number;
	timestamp: number;
	attention: Attention;
};

export type LookingSuccess = {
	trackId: number;
	timestamp: number;
};

export type AttentionSummary = {
	looking: number;
	notLooking: number;
	unknown: number;
};

export type TrackedPerson = {
	id: number;
	left: number;	top: number;	width: number;	height: number;
	confidence: number;
	attention: Attention;
};

export type IntervalRow = {
	start: number;
	end: number;
	total: number;
	presence: number;
	leftToRight: number;
	rightToLeft: number;
	looking: number;
	notLooking: number;
	unknown: number;
};

export type CrowdSession = {
	id: string;
	name: string;
	startedAt: number;
	endedAt: number;
	config: CrowdConfig;
	rows: IntervalRow[];
};