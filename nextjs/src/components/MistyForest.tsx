export default function MistyForest() {
  return (
    <div className="snap-start snap-always md:min-h-dvh shrink-0 bg-light-brown flex flex-col justify-center overflow-hidden relative" id="projects">
      {/* Atmospheric bottom fog */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brown/10 to-transparent" />

      <div className="lg:container lg:mx-auto flex flex-col gap-6 py-16 px-8 h-full grow">
        {/* Section label */}
        <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
          <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Our Projects ✦</span>
          <div className="h-px flex-1 bg-brown/20" />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 grow">
          {/* Left: text block */}
          <div className="flex flex-col gap-6 justify-center w-full md:w-2/5 shrink-0">
            <span
              data-aos="fade-up" data-aos-delay="100" data-aos-once="true"
              className="font-play text-xs tracking-widest uppercase text-brown/70 border border-brown/30 rounded-full px-3 py-1 w-fit"
            >Board Game</span>
            <h2
              data-aos="fade-up" data-aos-delay="150" data-aos-once="true"
              className="font-rye text-5xl md:text-6xl font-bold text-brown drop-shadow-lg text-center md:text-left"
            >
              MIST;Y FOREST
            </h2>
            <p
              data-aos="fade-up" data-aos-delay="200" data-aos-once="true"
              className="font-play text-lg md:text-xl text-[#4F321E]/80 leading-relaxed text-center md:text-left"
            >
              In the fog-veiled Mist;y Forest, the little cats embark on a journey into the unknown...
            </p>
            <div data-aos="fade-up" data-aos-delay="250" data-aos-once="true" className="flex flex-col items-center md:items-start">
              <a
                href="/mist;y-forest"
                className="font-play px-10 py-3 bg-[#4F321E] text-white rounded-full transform transition-all duration-100 ease-linear hover:scale-105 hover:bg-[#A3371D] cursor-pointer shadow-xl text-lg"
              >
                Journey Begins
              </a>
            </div>
          </div>

          {/* Right: character showcase */}
          <div className="flex flex-row gap-4 grow min-h-[420px] md:min-h-0">
            {/* Sese + Rye stacked */}
            <div className="flex flex-col gap-4 w-1/2 md:w-2/5">
              <div
                data-aos="fade-left" data-aos-delay="150" data-aos-once="true"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-md bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/sese/Art1.png')" }}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/70 to-transparent px-3 py-2">
                  <span className="font-rye text-white text-sm drop-shadow">Sese</span>
                </div>
              </div>
              <div
                data-aos="fade-left" data-aos-delay="250" data-aos-once="true"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-md bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/rye/Art1.png')" }}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/70 to-transparent px-3 py-2">
                  <span className="font-rye text-white text-sm drop-shadow">Rye</span>
                </div>
              </div>
            </div>

            {/* Koro — tall hero card */}
            <div
              data-aos="fade-left" data-aos-delay="50" data-aos-once="true"
              className="relative flex-1 rounded-2xl overflow-hidden shadow-md bg-bottom bg-no-repeat bg-cover"
              style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/koro/Art1.png')" }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/70 to-transparent px-4 py-3">
                <span className="font-rye text-white text-lg drop-shadow">Koro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}