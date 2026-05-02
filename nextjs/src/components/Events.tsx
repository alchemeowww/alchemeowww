import Footer from "./Footer";

const events = [
  {
    name: "Animangaki 2026",
    venue: "The Mines - MIECC",
    date: "28 - 30 Aug 2026",
    image: "/images/events/booths/amg2026.webp",
    alt: "Animangaki 2026 event logo",
    upcoming: true,
    googleMapsLink: "https://maps.app.goo.gl/C7HbKketwg1n9UoJ7",
  },
  {
    name: "Comic Art Festival KL X",
    venue: "Hextar World Empire City",
    date: "13 - 14 Jun 2026",
    image: "/images/events/booths/CAFKLX.webp",
    alt: "Comic Art Festival KL X event logo",
    upcoming: true,
    googleMapsLink: "https://maps.app.goo.gl/Gthk6ha1NHf4i8w97",
  },
  {
    name: "Cosmic Spring 2026",
    venue: "Lalaport Bukit Bintang City Centre",
    date: "25 - 26 Apr 2026",
    image: "/images/events/cosmic-spring.webp",
    alt: "Cosmic Spring 2026 event logo",
    upcoming: false,
  },
  {
    name: "Comic Fiesta 2025",
    venue: "KLCC",
    date: "20 - 21 Dec 2025",
    image: "/images/events/cf.webp",
    alt: "Comic Fiesta 2025 event logo",
    upcoming: false,
  }
];

export default function Events() {
  return (
    <div className="snap-start md:min-h-screen shrink-0 flex flex-col justify-center bg-light-brown" id="events">
      <div className="lg:container lg:mx-auto flex flex-col md:flex-row justify-center items-center gap-12 w-full py-16 p-8 grow">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 w-full">
          <div data-aos="flip-down" className="text-center w-full lg:w-1/3 lg:text-start">
            <h1 className="font-rye text-5xl md:text-6xl font-bold mb-6 text-brown drop-shadow-lg self-start">
              Events & Markets
            </h1>
          </div>
          <section className="flex flex-col gap-8 w-full md:w-2/3 lg:pl-24">
            <div className="flex flex-col w-full">
              {events.map((event, index) => (
                <div key={event.name} className="flex relative pb-8 sm:items-center w-full">
                  <div data-aos="fade-down" className="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay={String((index + 1) * 100)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center relative z-10 title-font font-medium text-sm ${
                      event.upcoming ? "bg-amber-400 shadow-md shadow-amber-300 ring-2 ring-amber-200" : "bg-brown text-white"
                    }`}
                  >
                    {event.upcoming && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                  </div>
                  <div data-aos="fade-down" data-aos-delay={String((index + 1) * 100)} className="flex-grow md:pl-12 w-full pl-6 flex items-center flex-row gap-4 sm:gap-12">
                    <div className={`flex-shrink-0 w-20 h-20 rounded-full inline-flex items-center justify-center overflow-hidden bg-white ${!event.upcoming ? "opacity-80" : ""}`}>
                      <img src={event.image} alt={event.alt} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className={`font-medium title-font text-xl text-darken`}>{event.name}</h2>
                        {event.upcoming && (
                          <span className="inline-flex animate-pulse items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <h2 className={`font-medium title-font mb-1 flex flex-row items-center gap-1`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                        <a href={event.googleMapsLink} target="_blank" rel="noopener noreferrer">{event.venue}</a>
                      </h2>
                      <p className="leading-relaxed text-secondary">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex" data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-delay="400">
              <a className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#8F3F1A] text-white text-lg font-bold shadow-lg hover:scale-105 hover:bg-[#4F321E] transition-all" href="/events">
                More Events
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}