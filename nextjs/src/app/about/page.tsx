import type { Metadata } from "next";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "About - Alchemeowww",
  description: "Meet Kyatto, the artist and brand owner of Alchemeowww. Resin crafter turned doodler creating fancy glowing merchandise and art.",
  alternates: {
    canonical: "https://alchemeowww.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://alchemeowww.com/about",
    title: "About - Alchemeowww",
    description: "Meet Kyatto, the artist and brand owner of Alchemeowww.",
    images: ["https://alchemeowww.com/images/alchemeowww-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Alchemeowww",
    description: "Meet Kyatto, the artist and brand owner of Alchemeowww.",
    images: ["https://alchemeowww.com/images/alchemeowww-logo.png"],
  },
};

export default function About() {
  return (
    <>
      <Header activePage="about" />
      <div className="flex flex-col grow bg-cream">

        {/* Hero / Profile */}
        <div className="relative overflow-hidden bg-light-brown">
          {/* Ambient radial */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,_var(--color-primary)/8%,_transparent_70%)]" />
          <div className="lg:container lg:mx-auto px-8 py-20 mt-14 flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Profile photo */}
            <div
              className="flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-2xl shadow-xl bg-center bg-no-repeat bg-cover border-4 border-white/40"
              style={{ backgroundImage: 'url("/images/owner.webp")' }}
            />
            {/* Intro text */}
            <div className="flex flex-col gap-4 text-center md:text-left max-w-xl">
              <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ The Alchemist ✦</span>
              <h1 className="font-rye text-4xl md:text-5xl text-brown drop-shadow leading-tight">
                ALCHEMIST | ARTIST
              </h1>
              <p className="font-play text-lg font-bold text-brown/90">
                Halo! I&apos;m Kyatto, the brand owner of Alchemeowww!
              </p>
              <p className="font-play text-base text-brown/70 leading-relaxed">
                You can call me Kyatto (Cat キャット) or 仙草 xiān cǎo (Grass Jelly — the BEST topping in milk tea).
              </p>
              <p className="font-play text-base text-brown/70 leading-relaxed">
                I initially started as a resin crafter in 2016, then moved over to doodle after the pandemic.
                I enjoy designing fancy lil glowing labbish using my art.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col gap-8">
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ The Story ✦</span>
            <div className="h-px flex-1 bg-secondary/10" />
          </div>

          <h2 className="font-rye text-3xl md:text-4xl text-brown drop-shadow">
            The Story Behind <span className="text-primary">Alchemeowww</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-play text-base text-secondary/80 leading-relaxed">
                In Alchemeowww, I design interesting and fancy glowing merchandise.
              </p>
              <p className="font-play text-base text-secondary/80 leading-relaxed">
                I started with drawing some cute cats art then found out that normal prints, stickers and flat keychains
                are just way too boring — so I decided to explore more fancy technologies.
              </p>
              <p className="font-play text-base text-secondary/80 leading-relaxed">
                I have created interactive merchandise like spinnable keychains, standees, NFC glowing charms,
                and even remade TnG into a keychain!
              </p>
              <p className="font-play text-base text-secondary/80 leading-relaxed">
                Other than that, I introduced my board game <span className="font-rye text-brown">MIST;Y FOREST</span> in 2025 —
                complete with characters, storyline, and an interactive game website.
              </p>
            </div>

            {/* Name lore card */}
            <div className="flex flex-col gap-4">
              <div className="bg-light-brown rounded-2xl p-6 border border-brown/10 shadow-sm flex flex-col gap-3">
                <span className="font-play text-xs tracking-widest uppercase text-brown/40">✦ Name Lore ✦</span>
                <p className="font-rye text-xl text-brown">Alchemeowww 錬金術喵</p>
                <p className="font-play text-sm text-brown/70 leading-relaxed italic">
                  A combination of Alchemist + Cat. Pronounced as &quot;Al&quot; + &quot;K&quot; + &quot;Meow&quot;.
                  Yes, the &quot;Che&quot; is pronounced like Chemistry&apos;s &quot;Che&quot; — not Cherry&apos;s &quot;Che&quot;,
                  or &quot;奧客喵&quot; in Hokkien.
                </p>
                <p className="text-2xl">ฅ/ᐠ. ̫ .ᐟ\ฅ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-light-brown" id="contact">
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col items-center text-center gap-6">
            {/* Section label */}
            <span className="font-play text-xs tracking-widest uppercase text-brown/40">✦ Say Hello ✦</span>
            <h2 className="font-rye text-3xl md:text-5xl text-brown drop-shadow">
              Drop me some messages!
            </h2>
            <p className="font-play max-w-xl text-base text-brown/70 leading-relaxed">
              As you know time flies, we do not want to live without leaving anything. I ain&apos;t good in speech,
              also bad in writing — but thanks God I still have my chubby fingers to make something else.
              Every baby I made are with my full love. Hope they are touching your hearts.
              <br /><br />ฅ/ᐠ. ̫ .ᐟ\ฅ
            </p>
            <a
              href="https://ig.me/m/alchemeowww"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-play font-bold text-sm bg-[#4F321E] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#A3371D] hover:scale-105 transition-all"
            >
              <i className="fa-brands fa-instagram" />
              Send a Message
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
