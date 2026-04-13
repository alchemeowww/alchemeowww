import Footer from "./Footer";

export default function Events() {
  return (
    <div className="snap-start md:min-h-screen shrink-0 flex flex-col justify-center bg-light-brown" id="events">
      <div className="lg:container lg:mx-auto flex flex-col md:flex-row justify-center items-center gap-12 w-full py-16 p-8 grow">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 w-full">
          <div data-aos="flip-down" className="text-center w-full lg:w-1/3 lg:text-start">
            <h1 className="font-rye text-5xl md:text-6xl font-bold mb-6 text-brown drop-shadow-lg self-start">
              Past Events & Markets
            </h1>
          </div>
          <section className="flex flex-col gap-8 w-full md:w-2/3 lg:pl-24">
            <div className="flex flex-col w-full">
              <div className="flex relative pb-8 sm:items-center w-full">
                <div data-aos="fade-down" className="h-full w-6 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div data-aos="fade-down" data-aos-delay="100" className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-brown text-white relative z-10 title-font font-medium text-sm">
                </div>
                <div data-aos="fade-down" data-aos-delay="100" className="flex-grow md:pl-12 w-full pl-6 flex items-center flex-row gap-4 sm:gap-12">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full inline-flex items-center justify-center overflow-hidden">
                    <img src="/images/events/cf.webp" alt="Comic Fiesta 2025 event logo" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-medium title-font mb-1 text-xl text-darken">Comic Fiesta 2025</h2>
                    <h2 className="font-medium title-font mb-1 text-darken">KLCC</h2>
                    <p className="leading-relaxed text-gray-500">20 - 21 Dec 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex relative pb-8 sm:items-center">
                <div data-aos="fade-down" data-aos-delay="200" className="h-full w-6 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div data-aos="fade-down" data-aos-delay="200" className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-brown text-white relative z-10 title-font font-medium text-sm">
                </div>
                <div data-aos="fade-down" className="flex-grow md:pl-12 w-full pl-6 flex items-center flex-row gap-4 sm:gap-12">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full inline-flex items-center justify-center overflow-hidden">
                    <img src="/images/events/cosmic.webp" alt="Cosmic 2025 event logo" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-medium title-font mb-1 text-xl text-darken">Cosmic 2025</h2>
                    <h2 className="font-medium title-font mb-1 text-darken">Sunway Pyramid</h2>
                    <p className="leading-relaxed text-gray-500">12 - 14 Sep 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex relative pb-8 sm:items-center">
                <div data-aos="fade-down" className="h-full w-6 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div data-aos="fade-down" data-aos-delay="300" className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-brown text-white relative z-10 title-font font-medium text-sm">
                </div>
                <div data-aos="fade-down" data-aos-delay="300" className="flex-grow md:pl-12 w-full pl-6 flex items-center flex-row gap-4 sm:gap-12">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full inline-flex items-center justify-center overflow-hidden">
                    <img src="/images/events/amg.webp" alt="Animangaki 2025 event logo" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-medium title-font mb-1 text-xl text-darken">Animangaki 2025</h2>
                    <h2 className="font-medium title-font mb-1 text-darken">The Mines - MIECC</h2>
                    <p className="leading-relaxed text-gray-500">22 - 24 Aug 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex relative pb-8 sm:items-center">
                <div data-aos="fade-down" className="h-full w-6 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div data-aos="fade-down" data-aos-delay="400" className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-brown text-white relative z-10 title-font font-medium text-sm">
                </div>
                <div data-aos="fade-down" data-aos-delay="400" className="flex-grow md:pl-12 w-full pl-6 flex items-center flex-row gap-4 sm:gap-12">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full inline-flex items-center justify-center overflow-hidden">
                    <img src="/images/events/df.webp" alt="Design Fiesta 2025 event logo" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-medium title-font mb-1 text-xl text-darken">Design Fiesta 2025</h2>
                    <h2 className="font-medium title-font mb-1 text-darken">Tokyo Big Sight</h2>
                    <p className="leading-relaxed text-gray-500">5 - 6 Jul 2025</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex" data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-delay="400">
              <a className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#8F3F1A] text-white text-lg font-bold shadow-lg hover:scale-105 hover:bg-[#4F321E] transition-all" href="/events">
                Past Events
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}