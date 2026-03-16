import Image from 'next/image';

export default function Hero() {
  return (
    <div className="snap-start snap-always md:min-h-screen h-screen shrink-0">
      <div className="lg:container lg:mx-auto px-4 py-8 h-full flex flex-col md:flex-row justify-center items-center gap-8 relative">
        <div className="shrink-0" data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
          <Image
            src="/images/alchemeowww-logo.webp"
            alt="Alchemeowww Logo"
            width={256}
            height={256}
            className="h-32 md:h-48 lg:h-64 w-auto"
            priority
          />
        </div>
        <div className="flex flex-col gap-6 justify-center items-center md:items-start">
          <h1 data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="font-rye text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary drop-shadow-md text-center md:text-left">
            Welcome to <span className="text-primary">Alchemeowww</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="400" data-aos-once="true" className="font-play text-lg md:text-2xl text-text-dark drop-shadow-md text-center md:text-left">
            Random Alchemist who always make fancy lil labbish
          </p>
        </div>
        <div className="absolute bottom-18 md:bottom-8 flex flex-col items-center text-brown animate-bounce" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="300" data-aos-once="true">
          <a href="#projects" className="rounded-full bg-light-brown p-2 w-10 h-10 shadow-lg flex flex-col items-center">
            <div className="block md:hidden">
              <span className="material-symbols-outlined">swipe_down</span>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}