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
      <div className="flex flex-col grow">
      {/* Hero / Profile Header */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-5 mt-[95px]">
        <div className="w-full max-w-[960px] flex flex-col gap-8 md:flex-row items-center md:items-start p-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-full max-w-[320px] md:w-64 md:h-64 shadow-xl border-4 border-white dark:border-secondary/30"
            style={{ backgroundImage: 'url("/images/owner.webp")' }}
          />
          <div className="flex flex-col flex-1 gap-4 text-center md:text-left">
            <h1 className="text-primary font-rye text-4xl md:text-4xl lg:text-5xl leading-tight">
              ALCHEMIST | ARTIST
            </h1>
            <p className="text-secondary/80 dark:text-background-light/80 text-xl font-bold">
              Halo! I&apos;m Kyatto, the brand owner of Alchemeowww!
            </p>
            <p className="text-secondary dark:text-background-light/90 text-lg font-normal leading-relaxed">
              You can call me Kyatto (Cat キャット) or 仙草 xiān cǎo (Grass Jelly - the BEST topping in milk tea).
            </p>
            <p className="text-secondary dark:text-background-light/90 text-lg font-normal leading-relaxed">
              I initially started as a resin crafter in my first brand in 2016, but due to change of obsession, I move
              over to doodle after the pandemic. I enjoy design fancy lil glowing labbish using my art.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10 bg-secondary/5">
        <div className="w-full max-w-[960px] flex flex-col">
          <h2 className="text-secondary dark:text-background-light text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5 border-l-4 border-primary">
            The Story Behind <span className="font-rye text-primary">Alchemeowww</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div className="flex flex-col gap-4">
              <p className="text-secondary dark:text-background-light text-base font-normal leading-relaxed">
                In Alchemeowww, I design interesting and fancy glowing merchandise.
              </p>
              <p className="text-secondary dark:text-background-light text-base font-normal leading-relaxed">
                I started with drawing some cute cats art then I found out that normal prints, stickers nor flat keychains
                are just way too boring. So I decided to explore more fancy technologies.
              </p>
              <p className="text-secondary dark:text-background-light text-base font-normal leading-relaxed">
                I have created interactive merchandise like spinnable keychain, standee, NFC glowing charms and even I
                remake Tng into my keychain!
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-secondary dark:text-background-light text-base font-normal leading-relaxed">
                Other than that, I have introduced my board game MIST;Y FOREST in 2025. It has characters, storyline,
                instructions, and it needs to interact with my game website.
              </p>
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 italic text-primary/80">
                Alchemeowww 錬金術喵 is a combination of Alchemist + Cat. It is pronounced as &quot;Al&quot; + &quot;K&quot; +
                &quot;Meow&quot;. Yes, the &quot;Che&quot; is pronounced as Chemistry&apos;s &quot;Che&quot; not Cherry&apos;s &quot;Che&quot;
                or &quot;奧客喵&quot; in hokkien
                <br /><br />
                ฅ/ᐠ. ̫ .ᐟ\ฅ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-20" id="contact">
        <div className="w-full max-w-[960px] flex flex-col items-center text-center px-4 py-16 bg-primary rounded-xl text-white">
          <h2 className="font-rye text-3xl md:text-5xl mb-6">Drop me some messages!</h2>
          <p className="max-w-[600px] text-lg mb-8 opacity-90">
            As you know time flies, we do not want to live without leaving anything. I ain&apos;t good in speech, also bad
            in writing, but thanks God I still have my chubby fingers to make something else so I ain&apos;t gonna waste
            them. Every baby I made are with my full love. Hope they are touching your hearts
            <br />ฅ/ᐠ. ̫ .ᐟ\ฅ
          </p>
          <div className="flex gap-4">
            <a
              href="https://ig.me/m/alchemeowww"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-background-light transition-colors"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
