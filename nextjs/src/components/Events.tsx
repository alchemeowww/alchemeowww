import Footer from "./Footer";

const events = [
  {
    name: "Anime Fest+ 2026(Round 2) - TBC",
    venue: "World Trade Center, Kuala Lumpur",
    date: "26 - 27 Sep 2026",
    image: "/images/events/booths/AF-tbc.webp",
    alt: "Anime Fest+ 2026(Round 2) - TBC event logo",
    upcoming: true,
    googleMapsLink: "https://maps.app.goo.gl/4ZfRs7Hkqitwr9eT9",
    link: '/events/af-plus-2026',
  },

  {
    name: "Cosmic 2026 - TBC",
    venue: "Sunway Pyramid Convention Center",
    date: "11 - 13 Sep 2026",
    image: "/images/events/booths/Cosmic Sep2026 TBC.webp",
    alt: "Cosmic 2026 - TBC event logo",
    upcoming: true,
    googleMapsLink: "https://maps.app.goo.gl/ZMZxJ2zVjYjwk3XV9",
    link: '/events/cosmic-2026',
  },
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
    link: '/events/cafkl-x'
  },
  {
    name: "Cosmic Spring 2026",
    venue: "Lalaport Bukit Bintang",
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
    <div className="snap-start md:min-h-dvh shrink-0 flex flex-col justify-between bg-light-brown relative overflow-hidden" id="events">
      {/* Ambient top fog */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-brown/8 to-transparent" />

      <div className="lg:container lg:mx-auto flex flex-col gap-6 w-full py-16 px-8 grow">
        {/* Section label */}
        <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
          <div className="h-px flex-1 bg-brown/20" />
          <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Where to Find Us ✦</span>
          <div className="h-px flex-1 bg-brown/20" />
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 w-full">
          {/* Left heading block */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100" data-aos-once="true">
            <h1 className="font-rye text-5xl md:text-6xl font-bold text-brown drop-shadow-lg text-center lg:text-left">
              Events &<br />Markets
            </h1>
            <p className="font-play text-sm text-brown/60 text-center lg:text-left leading-relaxed">
              Catch us at conventions and markets across Malaysia — come say hi, grab some merch, and journey into the Mist;y Forest!
            </p>
          </div>

          {/* Right timeline */}
          <section className="flex flex-col gap-3 w-full lg:w-2/3">
            {events.map((event, index) => {
              const CardTag = event.link ? 'a' : 'div';
              return (
                <CardTag
                  key={event.name}
                  data-aos="fade-up"
                  data-aos-delay={String((index + 1) * 80)}
                  data-aos-once="true"
                  {...(event.link ? { href: event.link } : {})}
                  className={`flex items-center gap-5 rounded-2xl px-5 py-4 border transition-all
                    ${event.upcoming
                      ? 'bg-white/70 border-amber-200 shadow-md'
                      : 'bg-white/30 border-brown/10 opacity-70'
                    }
                    ${event.link ? 'cursor-pointer hover:scale-[1.01] hover:shadow-lg' : ''}`}
                >
                  {/* Event logo */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center`}>
                    <img src={event.image} alt={event.alt} className="w-full h-full object-cover" />
                  </div>

                  {/* Event info */}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-rye text-lg text-brown truncate">{event.name}</h2>
                      {event.upcoming && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Upcoming
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-brown/70">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span className="font-play">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-brown/60">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {event.googleMapsLink ? (
                        <a href={event.googleMapsLink} target="_blank" rel="noopener noreferrer" className="font-play hover:text-primary transition-colors underline underline-offset-2 decoration-brown/30">
                          {event.venue}
                        </a>
                      ) : (
                        <span className="font-play">{event.venue}</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow for upcoming */}
                  {/* {event.upcoming && (
                    <span className="material-symbols-outlined text-brown/30 shrink-0">chevron_right</span>
                  )} */}
                </CardTag>
              );
            })}

            <div className="mt-4 flex" data-aos="fade-up" data-aos-delay="450" data-aos-once="true">
              <a
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full h-12 px-8 bg-[#4F321E] text-white font-play text-sm font-bold shadow-lg hover:scale-105 hover:bg-[#A3371D] transition-all"
                href="/events"
              >
                All Events
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}