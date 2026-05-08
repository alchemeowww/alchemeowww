export default function Merchandises() {
  return (
    <div className="snap-start snap-always md:min-h-dvh md:h-screen flex flex-col shrink-0 relative overflow-hidden" id="merchandises">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,_var(--color-light-brown)/60%,_transparent_70%)]" />

      <div className="lg:container lg:mx-auto flex flex-col gap-6 justify-center h-full py-16 px-8">
        {/* Section label */}
        <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
          <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ fancy lil labbish ✦</span>
          <div className="h-px flex-1 bg-secondary/10" />
        </div>

        <h1 data-aos="fade-up" data-aos-delay="100" data-aos-once="true" className="font-rye text-5xl md:text-6xl font-bold text-brown drop-shadow-lg">
          Merch
        </h1>

        <div className="flex flex-col gap-4 md:h-4/5 w-full">
          {/* Row 1: Sticker (tall) + Board Game + Interactive Standee */}
          <div className="flex flex-col sm:flex-row gap-4 md:h-3/5 w-full">
            {/* Sticker — tall left card */}
            <div
              data-aos="fade-up" data-aos-delay="100" data-aos-once="true"
              className="w-full sm:w-2/5 h-[420px] sm:h-auto relative shadow-lg rounded-2xl bg-white self-stretch bg-center bg-no-repeat bg-cover overflow-hidden"
              style={{ backgroundImage: "url('/images/products/sticker-sheets.png')" }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 pt-16 flex flex-col gap-0.5">
                <div className="font-rye text-xl text-brown drop-shadow">Sticker Sheets</div>
                <div className="font-play text-xs text-brown/70">Customizable cat in box</div>
              </div>
            </div>

            {/* Right column: Board Game + Interactive Standee */}
            <div className="flex flex-col sm:w-3/5 gap-4 md:h-full">
              {/* Board Game */}
              <div
                data-aos="fade-up" data-aos-delay="200" data-aos-once="true"
                className="overflow-hidden w-full h-[320px] md:h-1/2 relative shadow-lg rounded-2xl bg-white"
              >
                <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                <div className="absolute w-full h-full md:right-10 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 flex flex-col gap-0.5">
                  <div className="font-rye text-xl text-brown">Board Game</div>
                  <div className="font-play text-xs text-brown/70">Journey into the fog-veiled MIST;Y FOREST</div>
                  <a href="/mist;y-forest" className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-[#4F321E] px-4 py-1.5 text-xs font-play font-bold text-white transition hover:bg-[#A3371D] hover:scale-105">
                    Explore More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Interactive Standee */}
              <div
                data-aos="fade-up" data-aos-delay="300" data-aos-once="true"
                className="overflow-hidden w-full h-[300px] md:h-1/2 relative shadow-lg rounded-2xl bg-white"
              >
                <div className="absolute top-4 md:top-0 md:right-5 w-full h-2/3 md:h-full bg-center md:bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/interactive-standee.png')" }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 flex flex-col gap-0.5 md:w-1/2">
                  <div className="font-rye text-xl text-brown">Interactive Standee</div>
                  <div className="font-play text-xs text-brown/70">Fancy lil labbish that has lil usage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Keychain + NFC & TnGo + Card Holder */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:h-2/5">
            {/* Keychain */}
            <div
              data-aos="fade-up" data-aos-delay="150" data-aos-once="true"
              className="overflow-hidden w-full h-[280px] md:h-full md:w-1/3 relative shadow-lg rounded-2xl bg-white"
            >
              <div className="absolute w-full h-full bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/keychain.png')" }} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 flex flex-col gap-0.5">
                <div className="font-rye text-xl text-brown">Keychain</div>
                <div className="font-play text-xs text-brown/70">Fancy lil labbish that brings you happiness</div>
              </div>
            </div>

            {/* NFC & TnGo — featured card */}
            <div
              data-aos="fade-up" data-aos-delay="250" data-aos-once="true"
              className="overflow-hidden w-full h-[320px] md:h-full md:w-2/5 relative shadow-lg rounded-2xl bg-white"
            >
              <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/nfc.png')" }} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 flex flex-col gap-1">
                <div className="font-rye text-xl text-brown">NFC & TnGo</div>
                <div className="font-play text-xs text-brown/70">Lights up your life with fancy NFC light</div>
                <a href="/nfc" className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-[#4F321E] px-4 py-1.5 text-xs font-play font-bold text-white transition hover:bg-[#A3371D] hover:scale-105">
                  Explore More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Card Holder */}
            <div
              data-aos="fade-up" data-aos-delay="350" data-aos-once="true"
              className="overflow-hidden w-full h-[280px] md:h-full md:w-1/3 relative shadow-lg rounded-2xl bg-white"
            >
              <div className="absolute w-full h-full bg-contain bg-top-right bg-no-repeat" style={{ backgroundImage: "url('/images/products/cardholder.webp')" }} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 py-4 flex flex-col gap-0.5">
                <div className="font-rye text-xl text-brown">Card Holder</div>
                <div className="font-play text-xs text-brown/70">Layered wooden cardholder that lights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}