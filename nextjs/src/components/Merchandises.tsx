export default function Merchandises() {
  return (
    <div className="snap-start snap-always md:min-h-screen md:h-100 flex flex-col shrink-0" id="merchandises">
      <div className="lg:container lg:mx-auto flex flex-col gap-4 justify-center h-full items-center py-16 p-8">
        <h1 className="font-rye text-5xl md:text-6xl font-bold mb-6 text-brown drop-shadow-lg">
          Merchandises
        </h1>
        <div className="flex flex-col gap-8 md:h-4/5 w-full text-shadow-lg text-shadow-white">
          <div className="flex flex-col sm:flex-row gap-8 md:h-3/5 w-full">
            <div data-aos="fade-down" data-aos-anchor-placement="center-bottom" className="w-full sm:w-1/2 md:w-2/5 h-[500px] sm:h-auto relative shadow-xl rounded-2xl bg-white self-stretch bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/products/sticker-sheets.png')" }}>
              <div className="absolute bottom-[15px] px-5 flex flex-col gap-1">
                <div className="font-rye text-2xl text-brown">Sticker</div>
                <div>Customizable cat in box</div>
              </div>
            </div>
            <div className="flex flex-col sm:w-1/2 md:w-2/3 gap-8 md:h-full">
              <div data-aos="fade-down" data-aos-delay="200" data-aos-anchor-placement="center-bottom" className="overflow-hidden w-full h-[400px] md:h-1/2 relative shadow-xl rounded-2xl bg-white">
                <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }}></div>
                <div className="absolute w-full h-full md:right-10 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }}></div>
                <div className="absolute bottom-[15px] px-5 flex flex-col gap-1">
                  <div className="font-rye text-2xl text-brown">Board Game</div>
                  <div>Journey into the fog-veiled MIST;Y FOREST</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 w-full h-[380px] sm:h-[350px] md:h-1/2">
                <div data-aos="fade-down" data-aos-delay="300" data-aos-anchor-placement="center-bottom" className="overflow-hidden w-full h-[380px] sm:h-[350px] md:h-full relative shadow-xl rounded-2xl bg-white">
                  <div className="absolute top-5 md:top-0 md:right-5 w-full h-2/3 md:h-full bg-center md:bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/interactive-standee.png')" }}></div>
                  <div className="absolute bottom-[15px] px-5 flex flex-col gap-1 md:w-1/2">
                    <div className="font-rye text-2xl text-brown">Interactive Standee</div>
                    <div>Fancy lil labbish that has lil usage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full md:h-2/5">
            <div data-aos="fade-down" data-aos-delay="100" data-aos-anchor-placement="center-bottom" className="overflow-hidden w-full h-[300px] sm:h-[350px] md:h-full md:w-1/3 relative shadow-xl rounded-2xl bg-white">
              <div className="absolute w-full h-full bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/keychain.png')" }}></div>
              <div className="absolute bottom-[15px] px-5 flex flex-col gap-1">
                <div className="font-rye text-2xl text-brown">Keychain</div>
                <div>Fancy lil labbish that brings you happiness</div>
              </div>
            </div>
            <div data-aos="fade-down" data-aos-delay="200" data-aos-anchor-placement="center-bottom" className="overflow-hidden w-full h-[380px] md:h-full md:w-2/5 relative shadow-xl rounded-2xl bg-white">
              <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/nfc.png')" }}></div>
              <div className="absolute bottom-[15px] px-5 flex flex-col gap-1">
                <a href="/nfc" className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-cream px-4 py-2 text-sm font-bold text-text-main transition hover:bg-cream/60">
                  Explore More <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <div className="font-rye text-2xl text-brown">NFC & TnGo</div>
                <div>Lights up your life with fancy NFC light</div>
              </div>
            </div>
            <div data-aos="fade-down" data-aos-delay="300" data-aos-anchor-placement="center-bottom" className="overflow-hidden w-full h-[330px] md:h-full md:w-1/3 relative shadow-xl rounded-2xl bg-white">
              <div className="absolute w-full h-full md:h-full bg-contain bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/cardholder.webp')" }}></div>
              <div className="absolute bottom-[15px] px-5 flex flex-col gap-1">
                <div className="font-rye text-2xl text-brown">Card Holder</div>
                <div>Layered wooden cardholder that lights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}