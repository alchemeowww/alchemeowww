import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AOSInit from '../../components/AOSInit';

export default function Nfc() {
  return (
    <>
      <AOSInit />
      <Header activePage="nfc" />

      {/* Hero Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-5 mt-[95px]">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="@container">
            <div className="flex flex-col gap-6 px-4 py-10 md:flex-row items-center md:items-start">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-lg border-4 border-white dark:border-accent-dark/50 max-w-[320px]"
                style={{ backgroundImage: 'url("/images/nfc/20260123_211505.gif")' }}
              />
              <div className="flex flex-col gap-6 @[864px]:justify-center">
                <div className="flex flex-col gap-4 text-left">
                  <h1 className="text-accent-dark dark:text-background-light text-4xl font-rye leading-tight @[480px]:text-5xl">
                    Unlock Digital Alchemy with <span className="text-primary">NFC</span>
                  </h1>
                  <h2 className="text-accent-dark/80 dark:text-background-light/80 text-base font-normal leading-relaxed">
                    NFC (Near Field Communication) tag is smart little chip that allows you to transfer information with your smartphone over a short distances.
                    It allows you to perform automate task when you scan it using you smartphone.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Simple Steps */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-accent-dark dark:text-background-light text-3xl font-rye px-4 pb-3 pt-10 text-center md:text-left">
            Three Simple Steps
          </h2>
        </div>
      </div>
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-col gap-10 px-4 py-5 @container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-0">
              <div data-aos="fade-down" data-aos-once="true"
                className="flex flex-1 gap-5 rounded-xl border border-primary/20 bg-white/50 dark:bg-accent-dark/20 p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">smartphone</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-accent-dark dark:text-background-light text-xl font-bold font-rye">Check Compatibility</h2>
                  <p className="text-accent-dark/70 dark:text-background-light/70 text-sm leading-normal">
                    Most modern smartphones from the last 5 years (iPhone XS+ and Androids) have built-in NFC readers ready to go.
                  </p>
                </div>
              </div>
              <div data-aos="fade-down" data-aos-delay="100" data-aos-once="true"
                className="flex flex-1 gap-5 rounded-xl border border-primary/20 bg-white/50 dark:bg-accent-dark/20 p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">settings_input_antenna</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-accent-dark dark:text-background-light text-xl font-bold font-rye">Enable NFC</h2>
                  <p className="text-accent-dark/70 dark:text-background-light/70 text-sm leading-normal">
                    Ensure NFC is toggled &apos;On&apos; in your device settings. For iPhones, it&apos;s always on. For Android, check your pull down menu or inside the Settings.
                  </p>
                </div>
              </div>
              <div data-aos="fade-down" data-aos-delay="200" data-aos-once="true"
                className="flex flex-1 gap-5 rounded-xl border border-primary/20 bg-white/50 dark:bg-accent-dark/20 p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">ads_click</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-accent-dark dark:text-background-light text-xl font-bold font-rye">Tap to Discover</h2>
                  <p className="text-accent-dark/70 dark:text-background-light/70 text-sm leading-normal">
                    Gently tap the top or back of your phone&apos;s &apos;magic spot&apos; by using our NFC merch to unlock your digital surprise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limitless Possibilities */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10 bg-secondary/5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-accent-dark dark:text-background-light text-3xl font-rye px-4 pb-10 pt-5 text-center md:text-left">
            Limitless Possibilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">language</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Launch a Website</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">contact_page</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Digital Business Card</h3>
            </div>
            <a href="https://www.instagram.com/reels/Ch4k39ar39t/" target="_blank" rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <div className="demo-indicator animate-soft-pulse" title="Watch Demo">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>play_circle</span>
              </div>
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">lock_open</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Unlock Smart Doors</h3>
            </a>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">palette</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Open Portfolio</h3>
            </div>
            <a href="https://www.instagram.com/reels/Ch6Q0eOvWRA/" target="_blank" rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <div className="demo-indicator animate-soft-pulse" title="Watch Demo">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>play_circle</span>
              </div>
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">share</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Social Media (IG, FB, WhatsApp)</h3>
            </a>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">home_iot_device</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Smart Home Controls</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">play_circle</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Launch Apps (YouTube, Spotify)</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">wifi</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Connect to Wi-Fi</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/30 dark:bg-accent-dark/30 hover:shadow-md transition-all border border-primary/5">
              <span className="material-symbols-outlined text-[#8F3F1A] text-3xl">pets</span>
              <h3 className="text-accent-dark dark:text-background-light text-sm md:text-base font-bold text-center">Customizable Pet Tags</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Common Questions */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-accent-dark dark:text-background-light text-3xl font-rye px-4 pb-6 pt-5">Common Questions</h2>
          <div className="flex flex-col gap-3 px-4">
            <div data-aos="fade-down" data-aos-once="true"
              className="rounded-xl border border-primary/10 bg-white/30 dark:bg-accent-dark/10 p-5">
              <h3 className="font-bold text-lg text-primary mb-2">Where is the NFC reader on my phone?</h3>
              <p className="text-sm text-accent-dark/80 dark:text-background-light/80">
                On iPhones, the reader is at the very top edge near the front camera. On Android devices, it&apos;s usually at the back of the phone.
              </p>
            </div>
            <div data-aos="fade-down" data-aos-delay="100" data-aos-once="true"
              className="rounded-xl border border-primary/10 bg-white/30 dark:bg-accent-dark/10 p-5">
              <h3 className="font-bold text-lg text-primary mb-2">Do I need a special app?</h3>
              <p className="text-sm text-accent-dark/80 dark:text-background-light/80">
                No apps required! Modern smartphones recognize these tags natively and will show a notification banner when tapped.
              </p>
            </div>
            <div data-aos="fade-down" data-aos-delay="200" data-aos-once="true"
              className="rounded-xl border border-primary/10 bg-white/30 dark:bg-accent-dark/10 p-5">
              <h3 className="font-bold text-lg text-primary mb-2">Can the NFC chip get damaged?</h3>
              <p className="text-sm text-accent-dark/80 dark:text-background-light/80">
                The chips are water-resistant and embedded securely. They don&apos;t have batteries and will last for many years of tapping.
              </p>
            </div>
            <div data-aos="fade-down" data-aos-delay="300" data-aos-once="true"
              className="rounded-xl border border-primary/10 bg-white/30 dark:bg-accent-dark/10 p-5">
              <h3 className="font-bold text-lg text-primary mb-2">My tag isn&apos;t scanning, what should I do?</h3>
              <p className="text-sm text-accent-dark/80 dark:text-background-light/80">
                Ensure your screen is on and unlocked. Remove any thick metallic cases as they might interfere with the signal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-20 bg-secondary/5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="relative overflow-hidden rounded-2xl bg-[#8F3F1A]/5 border border-[#8F3F1A]/20 p-8 md:p-12 flex flex-col items-center text-center gap-6">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-9xl">edit_note</span>
            </div>
            <h2 className="text-accent-dark dark:text-background-light text-3xl md:text-4xl font-rye">
              Want to program your own?
            </h2>
            <p className="max-w-xl text-accent-dark/80 dark:text-background-light/80 text-base md:text-lg leading-relaxed">
              Ready to take full control? Learn how to write your own data to NFC tags and create unique digital experiences for your friends and family.
            </p>
            <a
              className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#8F3F1A] text-white text-lg font-bold shadow-lg hover:scale-105 hover:bg-[#4F321E] transition-all"
              href="/nfc/guide"
            >
              Start Configuration Guide
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

