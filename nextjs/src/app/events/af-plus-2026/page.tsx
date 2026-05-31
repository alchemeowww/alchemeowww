import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
	name: string;
	description?: string;
	bullets?: string[];
	images: { src: string; alt: string }[];
};

const fanArtProducts: Product[] = [
	{
		name: 'Digimon Adventures',
		bullets: [
			'Standee + Shaker Keychain Digivice',
			'Standee',
			'NFC with light Digimon Crest',
		],
		images: [
			{
				src: '/images/events/af-plus/Fan Art/Digimon Standee.jpg',
				alt: 'Digimon Adventures standee artwork',
			}
		],
	},
	{
		name: 'Cardcaptor Sakura',
		bullets: ['Wooden NFC Keychain'],
		images: [
			{
				src: '/images/events/af-plus/Fan Art/Cardcaptor Sakura Wooden NFC Keychain.png',
				alt: 'Cardcaptor Sakura wooden NFC keychain',
			},
		],
	},
	{
		name: 'Frieren',
		bullets: ['Spinnable Interactive Keychain', 'Wooden NFC Keychain'],
		images: [
			{
				src: '/images/events/af-plus/Fan Art/Frieren Interactive Keychain.png',
				alt: 'Frieren interactive keychain',
			},
		],
	},
];

const originalCatArtProducts: Product[] = [
	{
		name: 'Interactive Magnet Standee',
		description:
			'Spinnable cat furball standee with a paper clip at the back, plus a magnetic feeling bubble you can swap based on your mood.',
		images: [
			{
				src: '/images/events/af-plus/Le Meownogatari/Interactive standee.jpg',
				alt: 'Interactive cat standee close-up',
			},
		],
	},
	{
		name: 'Interactive Keychain',
		images: [
			{
				src: '/images/products/interactive-keychain.webp',
				alt: 'Interactive keychain artwork preview',
			},
		],
	},
	{
		name: 'Interactive Fridge Magnet',
    images: [
      {
        src: '/images/products/magnet.webp',
        alt: 'Interactive magnet standee with mood bubble',
      },
		],
	},
	{
		name: 'Stickers Sheet',
		images: [
			{
				src: '/images/events/af-plus/Le Meownogatari/Sticker Sheet Cat in Box.jpeg',
				alt: 'Cat in box sticker sheet',
			},
			// {
			// 	src: '/images/events/af-plus/Le Meownogatari/Sticker Sheet Hanging Cat.jpeg',
			// 	alt: 'Hanging cat sticker sheet',
			// },
			// {
			// 	src: '/images/events/af-plus/Le Meownogatari/Sticker Sheet Hanging Cat(1).jpeg',
			// 	alt: 'Hanging cat sticker sheet variant',
			// },
		],
	},
];

const mistyForestProducts: Product[] = [
	{
		name: 'Story Interactive Board Game',
		description:
			'The first ready game follows Hansel and Gretel (Candy House). It plays like snake and ladder: roll dice, move through steps, and trigger online Alchemy and Trap Card interactions on the game website.',
		images: [
			{
				src: '/images/events/af-plus/MIST_Y FOREST/Boardgame 2.jpg',
				alt: 'MIST;Y FOREST board game preview 2',
			},
			{
				src: '/images/events/af-plus/MIST_Y FOREST/Boardgame 3.jpg',
				alt: 'MIST;Y FOREST board game preview 3',
			},
		],
	},
	{
		name: 'Story Art Book',
		description:
			'A new story art book version is planned around the same Hansel and Gretel fairy-tale universe, retold with original MIST;Y FOREST characters and a fresh storyline.',
		images: [
			{
				src: '/images/events/af-plus/MIST_Y FOREST/MIST_Y FOREST.jpg',
				alt: 'MIST;Y FOREST story world visual',
			},
		],
	},
	{
		name: 'Interactive Keychain and NFC with Light',
		description:
			'NFC with light keychain combines collectable design with utility. The NFC chip can be configured for quick actions such as opening a link or digital business card details.',
		images: [
			{
				src: '/images/events/af-plus/MIST_Y FOREST/NFC glowing keychain.gif',
				alt: 'MIST;Y FOREST NFC glowing keychain',
			},
			{
				src: '/images/events/af-plus/MIST_Y FOREST/Website - NFC Light Lantern.png',
				alt: 'NFC light lantern keychain design',
			},
		],
	},
	{
		name: 'Wooden Cardholder with NFC Light',
		description:
			'Layered wooden cardholder with NFC light feature. You can keep a transport card inside and tap at station gates while enjoying the light effect.',
		images: [
			{
				src: '/images/events/af-plus/MIST_Y FOREST/Wooden Cardholder with light.jpg',
				alt: 'Real wooden cardholder with light photo',
			},
		],
	},
];

function ProductCard({ product }: { product: Product }) {
	return (
		<div className="rounded-2xl border border-brown/10 bg-white/70 overflow-hidden shadow-sm flex flex-col md:flex-row">
			<div className="p-6 flex flex-col gap-3 md:w-2/5 md:border-r md:border-brown/10">
				<h3 className="font-rye text-xl text-dark-brown">{product.name}</h3>
				{product.description ? (
					<p className="font-play text-sm text-brown/70 leading-relaxed">{product.description}</p>
				) : null}
				{product.bullets?.length ? (
					<ul className="font-play text-sm text-brown/80 list-disc pl-5 space-y-1">
						{product.bullets.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				) : null}
			</div>

			<div
				className={`grid gap-2 p-3 md:w-3/5 md:p-4 self-start ${
					product.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
				}`}
			>
				{product.images.map((image) => (
					<div key={image.src} className="rounded-xl overflow-hidden border border-brown/10 bg-white">
						<div className="relative aspect-square">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover object-center"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function AfPlusPage() {
	return (
		<>
			<Header activePage="events" />

			<div className="flex flex-col bg-cream mt-14">
				<div className="relative overflow-hidden bg-light-brown">
					<div className="lg:container lg:mx-auto px-8 py-16 flex flex-col gap-8">
						<div className="flex items-center gap-3">
							<div className="h-px w-8 bg-brown/30" />
							<span className="font-play text-xs tracking-widest uppercase text-brown/50">Anime Fest+ 2026</span>
						</div>

						<div className="grid md:grid-cols-2 gap-8 items-center">
							<div className="flex flex-col gap-4">
								<h1 className="font-rye text-4xl md:text-5xl text-dark-brown leading-tight">
									Anime Fest+ 2026<br />Round 2
								</h1>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
									<div className="rounded-xl border border-brown/15 bg-white/60 px-4 py-3">
										<p className="font-play text-xs uppercase tracking-widest text-brown/50">Date</p>
										<p className="font-rye text-dark-brown text-lg">26 to 27 Sep 2026</p>
									</div>
									<div className="rounded-xl border border-brown/15 bg-white/60 px-4 py-3">
										<p className="font-play text-xs uppercase tracking-widest text-brown/50">Venue</p>
										<p className="font-rye text-dark-brown text-lg">WTC Kuala Lumpur</p>
									</div>
								</div>

								<div className="flex flex-wrap gap-3 pt-2">
									<a
										href="https://maps.app.goo.gl/uzFFhcNdpm3xBM5q7"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors"
									>
										<span className="material-symbols-outlined" style={{ fontSize: '16px' }}>map</span>
										Open Venue Map
									</a>
									<Link
										href="/events"
										className="inline-flex items-center gap-2 px-6 py-2.5 border border-brown/30 hover:bg-brown/10 text-brown rounded-full font-play text-sm transition-colors"
									>
										Back to Events
									</Link>
								</div>
							</div>

							<div className="rounded-2xl overflow-hidden border border-brown/10 shadow-lg bg-white/60">
								<div className="relative aspect-4/3">
									<Image
										src="/images/events/af-plus/MIST_Y FOREST/MIST_Y FOREST.jpg"
										alt="Anime Fest plus featured artwork preview"
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover"
										priority
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-8">
					<div className="flex items-center gap-3">
						<div className="flex-1 h-px bg-brown/15" />
						<span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">Fan Art</span>
						<div className="flex-1 h-px bg-brown/15" />
					</div>
					<p className="font-play text-brown/70 text-center max-w-3xl mx-auto">
						Nostalgic and fantasy-inspired drops featuring Digimon Adventures, Cardcaptor Sakura,
						and Frieren with standees, interactive keychains, and NFC pieces.
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
						{fanArtProducts.map((product) => (
							<ProductCard key={product.name} product={product} />
						))}
					</div>
				</div>

        <div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-brown/15" />
            <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">MIST;Y FOREST 迷霧森林</span>
            <div className="flex-1 h-px bg-brown/15" />
          </div>
          <p className="font-play text-brown/70 text-center max-w-4xl mx-auto leading-relaxed">
            MIST;Y FOREST is an interactive story universe about 3 main characters who enter the forest,
            meet along the journey, and experience different stories together. The first playable release is
            based on Hansel and Gretel (Candy House), with online interactable Alchemy and Trap cards that
            players draw from the game website to continue their run.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {mistyForestProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>

				<div className="bg-light-brown/70">
					<div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-8">
						<div className="flex items-center gap-3">
							<div className="flex-1 h-px bg-brown/20" />
							<span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">Original Cat Art</span>
							<div className="flex-1 h-px bg-brown/20" />
						</div>
						<p className="font-play text-brown/70 text-center max-w-3xl mx-auto">
							Original interactive cat-themed creations, from mood-swappable magnet standees
							to playful keychains, fridge magnets, and sticker sheets.
						</p>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
							{originalCatArtProducts.map((product) => (
								<ProductCard key={product.name} product={product} />
							))}
						</div>
					</div>
				</div>

				<div className="lg:container lg:mx-auto px-8 py-14">
					<div className="rounded-2xl border border-brown/10 bg-white/70 p-8 md:p-10 text-center flex flex-col gap-4 items-center">
						<h2 className="font-rye text-2xl md:text-3xl text-dark-brown">See You At AF+ Round 2</h2>
						<p className="font-play text-brown/70 max-w-2xl">
							All artworks shown on this page are planned for Anime Fest+ 2026 (Round 2).
							Stock may vary by day, so come early for the full selection.
						</p>
						<Link
							href="/events"
							className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors"
						>
							Explore Other Events
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
