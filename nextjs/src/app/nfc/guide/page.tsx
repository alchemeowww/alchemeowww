import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AOSInit from '../../../components/AOSInit';

const steps = [
  {
    number: '1',
    icon: 'auto_fix_normal',
    title: 'Erase the Tag',
    body: (
      <>
        Open NFC Tools, go to the <strong className="text-brown">Other</strong> tab, and select{' '}
        <strong className="text-brown">Erase Tag</strong>. Tap the tag to your phone sensor to ensure it&apos;s fresh and ready.
      </>
    ),
  },
  {
    number: '2',
    icon: 'add_circle',
    title: 'Add a Record',
    body: (
      <>
        Tap the <strong className="text-brown">Write</strong> tab, then <strong className="text-brown">Add a record</strong>. Choose
        &apos;URL&apos; to link a website, or &apos;Social Network&apos; for your profiles. Enter your information and click OK.
      </>
    ),
  },
  {
    number: '3',
    icon: 'sensors',
    title: 'Write to Tag',
    body: (
      <>
        Press the <strong className="text-brown">Write</strong> button and place the NFC tag to your phone.
        Hold it until you see the &apos;Write Complete!&apos; success checkmark.
      </>
    ),
  },
];

export default function NfcGuide() {
  return (
    <>
      <AOSInit />
      <Header activePage="nfc" />

      <div className="flex flex-col grow bg-cream mt-24">

        {/* Page header */}
        <div className="relative overflow-hidden bg-light-brown">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,_var(--color-primary)/8%,_transparent_70%)]" />
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col gap-4">
            <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ NFC Guide ✦</span>
            <h1 className="font-rye text-4xl md:text-5xl text-brown drop-shadow leading-tight">
              Write Your Own NFC Tag
            </h1>
            <p className="font-play text-base text-brown/70 leading-relaxed max-w-xl">
              Personalize your physical art with digital treasures. Follow this step-by-step guide to program your tags.
            </p>
          </div>
        </div>

        <div className="lg:container lg:mx-auto px-8 py-14 flex flex-col gap-12">

          {/* Recommended App Banner */}
          <div
            data-aos="fade-up" data-aos-once="true"
            className="flex flex-col md:flex-row items-center gap-6 rounded-2xl border border-brown/10 bg-white/60 p-6 shadow-sm"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl">download</span>
            </div>
            <div className="flex flex-col gap-1 text-center md:text-left">
              <h3 className="font-rye text-xl text-brown">Recommended App: NFC Tools</h3>
              <p className="font-play text-sm text-brown/70 leading-relaxed">
                For the best experience, use the <strong className="text-brown">NFC Tools</strong> app — available on{' '}
                <a href="https://apps.apple.com/sg/app/nfc-tools/id1252962749" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2">iOS</a>{' '}
                and{' '}
                <a href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2">Android</a>.
                It offers a user-friendly interface for all types of NFC records.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-once="true">
              <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ Steps ✦</span>
              <div className="h-px flex-1 bg-secondary/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  data-aos="fade-up" data-aos-delay={String(i * 100)} data-aos-once="true"
                  className="flex flex-col gap-4 rounded-2xl border border-brown/10 bg-white/60 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#4F321E] text-white rounded-xl flex items-center justify-center font-rye text-base shadow-sm">
                      {step.number}
                    </div>
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">{step.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-rye text-lg text-brown">{step.title}</h3>
                  <p className="font-play text-sm text-brown/70 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Still Stuck CTA */}
          <div className="bg-light-brown rounded-2xl p-10 flex flex-col items-center text-center gap-4" data-aos="fade-up" data-aos-once="true">
            <span className="font-play text-xs tracking-widest uppercase text-brown/40">✦ Need Help? ✦</span>
            <h2 className="font-rye text-3xl text-brown drop-shadow">Still Stuck?</h2>
            <p className="font-play text-base text-brown/70 max-w-md leading-relaxed">
              Feel free to reach out for more info, inquiries, or just to say hi! I&apos;m always excited to connect with you all.
            </p>
            <a
              className="flex items-center gap-2 font-play font-bold text-sm bg-[#4F321E] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#A3371D] hover:scale-105 transition-all"
              href="https://ig.me/m/alchemeowww"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram" />
              Send a Message
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

