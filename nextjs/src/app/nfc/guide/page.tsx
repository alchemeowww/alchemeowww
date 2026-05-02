import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AOSInit from '../../../components/AOSInit';

export default function NfcGuide() {
  return (
    <>
      <AOSInit />
      <Header activePage="nfc" />

      <main className="px-4 md:px-20 lg:px-40 flex justify-center py-5 mt-[95px] grow">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

          {/* Title */}
          <div className="text-center py-10">
            <h1 className="font-rye text-4xl md:text-5xl lg:text-6xl text-accent-dark dark:text-background-light mb-4">
              Write Your Own NFC Tag
            </h1>
            <p className="text-lg md:text-xl text-accent-dark/70 dark:text-background-light/70 max-w-2xl mx-auto">
              Personalize your physical art with digital treasures. Follow this step-by-step guide to program your tags.
            </p>
          </div>

          {/* Recommended App Banner */}
          <div className="bg-primary/10 border-2 border-primary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-16 shadow-sm">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-4xl">download</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-rye text-primary text-xl font-bold mb-1">Recommended App: NFC Tools</h3>
              <p className="text-accent-dark/80 dark:text-background-light/80 text-sm md:text-base leading-relaxed">
                For the best experience, we recommend using the <strong className="text-primary">NFC Tools</strong> app
                (available on{' '}
                <a href="https://apps.apple.com/sg/app/nfc-tools/id1252962749" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline">iOS</a>{' '}
                and{' '}
                <a href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline">Android</a>
                ). It offers a user-friendly interface for various types of records.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">auto_fix_normal</span>
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-rye text-xl shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-xl mb-3 font-rye">Erase the Tag</h3>
              <p className="text-sm text-accent-dark/70 dark:text-background-light/70 leading-relaxed">
                Open NFC Tools, go to <span className="font-bold">Other</span> tab, and select{' '}
                <span className="font-bold">Erase Tag</span>. Tap the tag to your phone sensor to ensure it&apos;s fresh and ready.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">add_circle</span>
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-rye text-xl shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-xl mb-3 font-rye">Add a Record</h3>
              <p className="text-sm text-accent-dark/70 dark:text-background-light/70 leading-relaxed">
                Tap <span className="font-bold">Write</span> tab, then <span className="font-bold">Add a record</span>. Choose
                &apos;URL&apos; to link a website, or &apos;Social Network&apos; for your profiles. Enter your information and click OK. You
                may choose other options as needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">sensors</span>
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-rye text-xl shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-xl mb-3 font-rye">Write to Tag</h3>
              <p className="text-sm text-accent-dark/70 dark:text-background-light/70 leading-relaxed">
                Press the <span className="font-bold">Write</span> button and place the NFC tag to your phone.
                Hold it until you see the &apos;Write Complete!&apos; success checkmark.
              </p>
            </div>
          </div>

          {/* Still Stuck CTA */}
          <div className="bg-white/30 rounded-2xl p-8 mb-20 text-center flex flex-col items-center">
            <h2 className="text-2xl mb-4 font-rye">Still Stuck?</h2>
            <p className="mb-6 opacity-80">
              Feel free to reach out for more info, inquiries, or just to say hi! I&apos;m always excited to connect with you all.
            </p>
            <a
              className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#8F3F1A] text-white text-lg font-bold shadow-lg hover:scale-105 hover:bg-[#4F321E] transition-all"
              href="https://ig.me/m/alchemeowww"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send a Message
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
