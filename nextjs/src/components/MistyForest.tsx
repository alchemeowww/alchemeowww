export default function MistyForest() {
  return (
    <div className="snap-start snap-always md:min-h-screen shrink-0 bg-light-brown flex flex-col justify-center overflow-hidden" id="projects">
      <div className="lg:container lg:mx-auto flex flex-col justify-center items-center gap-8 py-16 p-8 h-full grow">
        <div className="w-full flex flex-col md:flex-row gap-8 grow h-full">
          <div className="flex flex-col gap-8 items-end justify-start grow h-full w-full md:w-1/2 lg:w-auto md:h-auto md:self-stretch">
            <div className="flex flex-col gap-8 justify-center items-center md:items-start">
              <h2 className="font-rye text-5xl md:text-6xl font-bold text-brown drop-shadow-lg text-center md:text-left">
                MIST;Y FOREST
              </h2>
              <p className="font-play text-lg md:text-3xl text-[#4F321E] drop-shadow-md text-center md:text-left">
                In the fog-veiled Mist;y Forest, the little cats embark on a journey into the unknown...
              </p>
              <div className="relative w-full flex flex-col items-center md:items-start">
                <a href="/mistiy-forest" className="font-play px-12 py-2 bg-[#4F321E] text-white rounded-full transform transition-all duration-100 ease-linear hover:scale-110 hover:bg-[#A3371D] cursor-pointer shadow-xl text-2xl">
                  Journey Begins
                </a>
              </div>
            </div>
            <div className="flex flex-col flex-1 h-full gap-8 w-full items-end justify-end">
              <div data-aos="fade-left" className="w-full md:w-2/3 lg:w-1/3 h-[380px] md:h-1/2 max-w-full flex flex-col items-center justify-center shadow-sm rounded-xl bg-light-cream bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/sese/Art1.png')" }}>
              </div>
              <div data-aos="fade-left" data-aos-delay="200" className="w-full h-[300px] md:h-1/2 max-w-full lg:w-2/3 shrink-0 flex flex-col items-center justify-center shadow-sm rounded-xl bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/rye/Art1.png')" }}>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="100" data-aos-anchor-placement="center-bottom" className="h-[380px] md:h-auto md:self-stretch w-full md:w-2/5 shrink-0 flex flex-col items-center justify-center shadow-sm rounded-xl bg-bottom md:bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/mistiy-forest/images/characters/koro/Art1.png')" }}>
          </div>
        </div>
      </div>
    </div>
  );
}