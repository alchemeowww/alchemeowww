'use client';

import { useEffect, useRef, useState } from 'react';
import BoothLocationAnimation from '@/components/BoothLocationAnimation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type Preview = {
	mapUrl: string;
	svgUrl: string;
	imageWidth: number;
	imageHeight: number;
};

export default function WeAreHereTool() {
	const [mapFile, setMapFile] = useState<File | null>(null);
	const [svgFile, setSvgFile] = useState<File | null>(null);
	const [motionPathSelector, setMotionPathSelector] = useState('path');
	const [markerColor, setMarkerColor] = useState('#ffb700');
	const [preview, setPreview] = useState<Preview | null>(null);
	const [error, setError] = useState('');
	const mapInputRef = useRef<HTMLInputElement>(null);
	const svgInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!preview) return;
		return () => {
			URL.revokeObjectURL(preview.mapUrl);
			URL.revokeObjectURL(preview.svgUrl);
		};
	}, [preview]);

	const updateMapFile = (file: File | null) => {
		setMapFile(file);
		setPreview(null);
		setError('');
	};

	const updateSvgFile = (file: File | null) => {
		setSvgFile(file);
		setPreview(null);
		setError('');
	};

	const generatePreview = async () => {
		setError('');
		if (!mapFile || !svgFile) {
			setError('Upload both a map image and an SVG file to continue.');
			return;
		}
		if (!mapFile.type.startsWith('image/')) {
			setError('The map file must be an image.');
			return;
		}
		if (!svgFile.name.toLowerCase().endsWith('.svg') && svgFile.type !== 'image/svg+xml') {
			setError('The overlay file must be an SVG.');
			return;
		}

		try {
			const svgSource = await svgFile.text();
			const svgDocument = new DOMParser().parseFromString(svgSource, 'image/svg+xml');
			const svgElement = svgDocument.documentElement;
			if (svgElement.localName !== 'svg' || svgDocument.querySelector('parsererror')) {
				throw new Error('This file is not a valid SVG document.');
			}

			let pathElement: Element | null;
			try {
				pathElement = svgElement.querySelector(motionPathSelector);
			} catch {
				throw new Error('Enter a valid CSS selector for the motion path.');
			}
			if (!pathElement || pathElement.localName !== 'path') {
				throw new Error(`No SVG <path> matches “${motionPathSelector}”.`);
			}

			const bitmap = await createImageBitmap(mapFile);
			const imageWidth = bitmap.width;
			const imageHeight = bitmap.height;
			bitmap.close();

			setPreview({
				mapUrl: URL.createObjectURL(mapFile),
				svgUrl: URL.createObjectURL(svgFile),
				imageWidth,
				imageHeight,
			});
		} catch (caughtError) {
			setError(caughtError instanceof Error ? caughtError.message : 'Could not prepare this preview.');
		}
	};

	return (
		<>
			<Header />
			<main className="mt-14 flex grow flex-col bg-cream text-dark-brown">
				<section className="relative overflow-hidden border-b border-brown/10 bg-light-brown">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_90%_at_78%_35%,_rgb(143_63_26_/_0.11),_transparent_70%)]" />
					<div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:py-16">
						<p className="font-play text-xs uppercase tracking-widest text-brown/55">Alchemeowww tools / 01</p>
						<h1 className="font-rye text-4xl leading-tight text-brown sm:text-5xl">We are here</h1>
						<p className="max-w-2xl font-play text-base leading-relaxed text-dark-brown/70">
							Bring a venue map and an SVG route together. Upload both files, choose the route path, and preview a moving marker tracing your way to the booth.
						</p>
					</div>
				</section>

				<section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-9 sm:px-8 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:gap-10 lg:py-12">
					<div className="flex flex-col gap-7">
						<div className="flex items-center gap-3">
							<span className="font-play text-xs uppercase tracking-widest text-brown/55">Build a preview</span>
							<div className="h-px flex-1 bg-brown/15" />
						</div>

						<div className="flex flex-col gap-3">
							<label htmlFor="map-upload" className="font-play text-sm font-bold text-dark-brown">01 / Map image</label>
							<input
								ref={mapInputRef}
								id="map-upload"
								type="file"
								accept="image/*"
								className="sr-only"
								onChange={(event) => updateMapFile(event.target.files?.[0] ?? null)}
							/>
							<div className="flex min-h-24 items-center justify-between gap-4 border border-dashed border-brown/30 bg-white/45 px-4 py-4">
								<div className="flex min-w-0 items-center gap-3">
									<span className="material-symbols-outlined text-2xl text-primary">map</span>
									<div className="min-w-0">
										<p className="truncate font-play text-sm text-dark-brown">{mapFile?.name ?? 'Choose a map image'}</p>
										<p className="font-play text-xs text-dark-brown/50">PNG, JPG, WebP or other image</p>
									</div>
								</div>
								<button type="button" onClick={() => mapInputRef.current?.click()} className="shrink-0 border border-brown/20 px-3 py-2 font-play text-xs font-bold text-brown transition-colors hover:bg-brown hover:text-cream">
									{mapFile ? 'Replace' : 'Browse'}
								</button>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<label htmlFor="svg-upload" className="font-play text-sm font-bold text-dark-brown">02 / Route SVG</label>
							<input
								ref={svgInputRef}
								id="svg-upload"
								type="file"
								accept=".svg,image/svg+xml"
								className="sr-only"
								onChange={(event) => updateSvgFile(event.target.files?.[0] ?? null)}
							/>
							<div className="flex min-h-24 items-center justify-between gap-4 border border-dashed border-brown/30 bg-white/45 px-4 py-4">
								<div className="flex min-w-0 items-center gap-3">
									<span className="material-symbols-outlined text-2xl text-primary">route</span>
									<div className="min-w-0">
										<p className="truncate font-play text-sm text-dark-brown">{svgFile?.name ?? 'Choose an SVG overlay'}</p>
										<p className="font-play text-xs text-dark-brown/50">SVG must share the map canvas dimensions</p>
									</div>
								</div>
								<button type="button" onClick={() => svgInputRef.current?.click()} className="shrink-0 border border-brown/20 px-3 py-2 font-play text-xs font-bold text-brown transition-colors hover:bg-brown hover:text-cream">
									{svgFile ? 'Replace' : 'Browse'}
								</button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="path-selector" className="font-play text-sm font-bold text-dark-brown">03 / Motion path selector</label>
							<input
								id="path-selector"
								value={motionPathSelector}
								onChange={(event) => {
									setMotionPathSelector(event.target.value);
									setPreview(null);
									setError('');
								}}
								placeholder="path or #route"
								className="w-full border border-brown/20 bg-white/70 px-3 py-2.5 font-mono text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
							/>
							<p className="font-play text-xs leading-relaxed text-dark-brown/55">
								Defaults to the first <code className="text-brown">&lt;path&gt;</code>. Use an SVG selector like <code className="text-brown">#route</code> to target a specific path.
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="marker-color" className="font-play text-sm font-bold text-dark-brown">04 / Marker color</label>
							<div className="flex items-center gap-3 border border-brown/20 bg-white/70 px-3 py-2">
								<input
									id="marker-color"
									type="color"
									value={markerColor}
									onChange={(event) => setMarkerColor(event.target.value)}
									aria-label="Choose marker color"
									className="h-9 w-12 cursor-pointer border-0 bg-transparent p-0"
								/>
								<output htmlFor="marker-color" className="font-mono text-sm uppercase text-dark-brown">{markerColor}</output>
							</div>
						</div>

						{error && <p role="alert" className="border-l-2 border-accent bg-accent/5 px-3 py-2 font-play text-sm text-accent">{error}</p>}

						<button
							type="button"
							onClick={generatePreview}
							className="flex items-center justify-center gap-2 bg-[#4F321E] px-5 py-3 font-play text-sm font-bold text-cream transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>
							<span className="material-symbols-outlined text-lg">play_arrow</span>
							Generate animation
						</button>

						<div className="border-t border-brown/15 pt-5">
							<p className="mb-3 font-play text-xs uppercase tracking-widest text-brown/55">How it works</p>
							<ol className="flex flex-col gap-2 font-play text-sm leading-relaxed text-dark-brown/65">
								<li><span className="mr-2 font-bold text-primary">1.</span>Export the map and route SVG from the same-size artboard.</li>
								<li><span className="mr-2 font-bold text-primary">2.</span>Pick the SVG path that describes the route.</li>
								<li><span className="mr-2 font-bold text-primary">3.</span>The path is drawn while a marker follows it in a loop.</li>
							</ol>
						</div>
					</div>

					<div className="flex min-h-[24rem] flex-col border border-brown/15 bg-[#f5efe6]">
						<div className="flex items-center justify-between gap-4 border-b border-brown/10 px-4 py-3">
							<div>
								<p className="font-play text-sm font-bold text-dark-brown">Animated preview</p>
								<p className="font-play text-xs text-dark-brown/50">{preview ? 'Looping route preview' : 'Your generated map will appear here'}</p>
							</div>
							<span className={`h-2.5 w-2.5 rounded-full ${preview ? 'animate-pulse bg-[#4f8d62]' : 'bg-brown/20'}`} aria-label={preview ? 'Preview active' : 'Preview inactive'} />
						</div>
						<div className="relative flex grow items-center justify-center overflow-hidden p-4 sm:p-6">
							{preview ? (
								<BoothLocationAnimation
									imageSrc={preview.mapUrl}
									imageAlt={`Map preview from ${mapFile?.name ?? 'uploaded map'}`}
									svgSrc={preview.svgUrl}
									imageWidth={preview.imageWidth}
									imageHeight={preview.imageHeight}
									motionPathSelector={motionPathSelector}
									markerColor={markerColor}
									className="w-full overflow-hidden border border-brown/10 bg-white shadow-sm"
									imageClassName="h-auto max-h-[65vh] w-full object-contain"
									overlayClassName=""
								/>
							) : (
								<div className="flex min-h-72 w-full flex-col items-center justify-center gap-4 border border-dashed border-brown/20 bg-white/35 px-6 text-center">
									<span className="material-symbols-outlined text-5xl text-brown/25">add_location_alt</span>
									<div>
										<p className="font-rye text-lg text-brown/70">Map your way in</p>
										<p className="mt-1 font-play text-sm text-dark-brown/50">Upload both assets, then generate the animation.</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
