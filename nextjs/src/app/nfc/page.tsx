import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AOSInit from '../../components/AOSInit';

const possibilities = [
  { icon: 'language',          label: 'Launch a Website',                    href: null },
  { icon: 'contact_page',      label: 'Digital Business Card',               href: null },
  { icon: 'lock_open',         label: 'Unlock Smart Doors',                  href: 'https://www.instagram.com/reels/Ch4k39ar39t/' },
  { icon: 'palette',           label: 'Open Portfolio',                      href: null },
  { icon: 'share',             label: 'Social Media (IG, FB, WhatsApp)',      href: 'https://www.instagram.com/reels/Ch6Q0eOvWRA/' },
  { icon: 'home_iot_device',   label: 'Smart Home Controls',                 href: null },
  { icon: 'play_circle',       label: 'Launch Apps (YouTube, Spotify)',       href: null },
  { icon: 'wifi',              label: 'Connect to Wi-Fi',                    href: null },
  { icon: 'pets',              label: 'Customizable Pet Tags',               href: null },
];

const faqs = [
  {
    q: 'Where is the NFC reader on my phone?',
    a: "On iPhones, the reader is at the very top edge near the front camera. On Android devices, it's usually at the back of the phone.",
  },
  {
    q: 'Do I need a special app?',
    a: "No apps required! Modern smartphones recognize these tags natively and will show a notification banner when tapped.",
  },
  {
    q: 'Can the NFC chip get damaged?',
    a: "The chips are water-resistant and embedded securely. They don't have batteries and will last for many years of tapping.",
  },
  {
    q: "My tag isn't scanning, what should I do?",
    a: "Ensure your screen is on and unlocked. Remove any thick metallic cases as they might interfere with the signal.",
  },
];

export default function Nfc() {
  return (
    <>
      <AOSInit />
      <Header activePage="nfc" />

      <div className="flex flex-col grow bg-cream mt-14">

        {/* Hero */}
        <div className="relative overflow-hidden bg-light-brown">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,_var(--color-primary)/8%,_transparent_70%)]" />
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-10">
            <div
              className="flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-2xl shadow-xl bg-center bg-no-repeat bg-cover border-4 border-white/40"
              style={{ backgroundImage: 'url("/images/nfc/20260123_211505.gif")' }}
            />
            <div className="flex flex-col gap-4 text-center md:text-left max-w-xl">
              <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Digital Alchemy ✦</span>
              <h1 className="font-rye text-4xl md:text-5xl text-brown drop-shadow leading-tight">
                Unlock Digital Alchemy with <span className="text-primary">NFC</span>
              </h1>
              <p className="font-play text-base text-brown/70 leading-relaxed">
                NFC (Near Field Communication) is a smart little chip that allows you to transfer information with your smartphone over short distances —
                automating tasks with a single tap.
              </p>
            </div>
          </div>
        </div>

        {/* Three Simple Steps */}
        <div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-6">
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
            <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ How It Works ✦</span>
            <div className="h-px flex-1 bg-secondary/10" />
          </div>
          <h2 className="font-rye text-3xl md:text-4xl text-brown drop-shadow" data-aos="fade-up" data-aos-delay="50" data-aos-once="true">
            Three Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: 'smartphone',             title: 'Check Compatibility', delay: '0',   body: 'Most modern smartphones from the last 5 years (iPhone XS+ and Androids) have built-in NFC readers ready to go.' },
              { icon: 'settings_input_antenna', title: 'Enable NFC',          delay: '100', body: "Ensure NFC is toggled 'On' in your device settings. For iPhones, it's always on. For Android, check your pull-down menu or inside Settings." },
              { icon: 'ads_click',              title: 'Tap to Discover',     delay: '200', body: "Gently tap the top or back of your phone's 'magic spot' using our NFC merch to unlock your digital surprise." },
            ].map((step) => (
              <div
                key={step.title}
                data-aos="fade-up" data-aos-delay={step.delay} data-aos-once="true"
                className="flex flex-col gap-4 rounded-2xl border border-brown/10 bg-white/60 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-rye text-lg text-brown">{step.title}</h3>
                  <p className="font-play text-sm text-brown/70 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitless Possibilities */}
        <div className="bg-light-brown">
          <div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-6">
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
              <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Use Cases ✦</span>
              <div className="h-px flex-1 bg-brown/20" />
            </div>
            <h2 className="font-rye text-3xl md:text-4xl text-brown drop-shadow" data-aos="fade-up" data-aos-delay="50" data-aos-once="true">
              Limitless Possibilities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {possibilities.map((item, i) => {
                const Tag = item.href ? 'a' : 'div';
                const extra = item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Tag
                    key={item.label}
                    {...extra}
                    data-aos="fade-up" data-aos-delay={String((i % 3) * 80)} data-aos-once="true"
                    className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/50 border border-brown/10 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {item.href && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-primary/60 text-[10px] font-play uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[14px]">play_circle</span>
                        Demo
                      </div>
                    )}
                    <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">{item.icon}</span>
                    <h3 className="font-play text-sm font-bold text-brown/80 text-center">{item.label}</h3>
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>

        {/* Common Questions */}
        <div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-6">
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
            <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ FAQ ✦</span>
            <div className="h-px flex-1 bg-secondary/10" />
          </div>
          <h2 className="font-rye text-3xl md:text-4xl text-brown drop-shadow" data-aos="fade-up" data-aos-delay="50" data-aos-once="true">
            Common Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                data-aos="fade-up" data-aos-delay={String(i * 80)} data-aos-once="true"
                className="rounded-2xl border border-brown/10 bg-white/60 p-5 flex flex-col gap-1.5"
              >
                <h3 className="font-rye text-lg text-brown">{faq.q}</h3>
                <p className="font-play text-sm text-brown/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-light-brown">
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col items-center text-center gap-5">
            <span className="font-play text-xs tracking-widest uppercase text-brown/40">✦ Go Further ✦</span>
            <h2 className="font-rye text-3xl md:text-4xl text-brown drop-shadow">
              Want to program your own?
            </h2>
            <p className="font-play max-w-xl text-base text-brown/70 leading-relaxed">
              Ready to take full control? Learn how to write your own data to NFC tags and create unique digital experiences for your friends and family.
            </p>
            <a
              className="flex items-center gap-2 font-play font-bold text-sm bg-[#4F321E] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#A3371D] hover:scale-105 transition-all"
              href="/nfc/guide"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Start Configuration Guide
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

