'use client';

import { useEffect, useState, type FormEvent } from 'react';

type NdefMessage = {
  records: Array<{ recordType: 'url'; data: string }>;
};

type NdefReader = {
  write: (message: NdefMessage, options?: { overwrite?: boolean }) => Promise<void>;
};

type WebNfcWindow = Window & {
  NDEFReader?: new () => NdefReader;
};

type WriterStatus = 'idle' | 'erasing' | 'writing' | 'success' | 'error';

export default function NfcUrlWriter() {
  const [supported, setSupported] = useState(false);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<WriterStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSupported(window.isSecureContext && typeof (window as WebNfcWindow).NDEFReader === 'function');
  }, []);

  if (!supported) return null;

  const isWriting = status === 'erasing' || status === 'writing';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const Reader = (window as WebNfcWindow).NDEFReader;
    if (!Reader) return;

    let targetUrl: URL;
    try {
      targetUrl = new URL(url.trim());
      if (targetUrl.protocol !== 'https:' && targetUrl.protocol !== 'http:') {
        throw new Error('Only HTTP and HTTPS links can be written to the tag.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Enter a valid web address.');
      return;
    }

    const reader = new Reader();
    setStatus('erasing');
    setMessage('Hold the NFC tag near your phone to erase its current data.');

    try {
      await reader.write({ records: [] }, { overwrite: true });
      setStatus('writing');
      setMessage('Tag erased. Tap and hold it again to write the URL.');

      await reader.write(
        { records: [{ recordType: 'url', data: targetUrl.toString() }] },
        { overwrite: true }
      );
      setStatus('success');
      setMessage(`URL written successfully: ${targetUrl.toString()}`);
    } catch (error) {
      setStatus('error');
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setMessage('NFC access was denied. Allow NFC access and try again.');
      } else if (error instanceof DOMException && error.name === 'NotSupportedError') {
        setMessage('The tag could not be read. Check that it supports NFC Forum NDEF.');
      } else {
        setMessage('The write did not complete. Keep the tag near your phone and try again.');
      }
    }
  }

  return (
      <section className="rounded-2xl border border-brown/10 bg-white/60 p-6 shadow-sm md:p-8" data-aos="fade-up" data-aos-once="true">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">
            contactless
          </span>
        </div>
        <div>
          <h2 className="font-rye text-xl text-brown">Write a URL to your NFC tag</h2>
          <p className="mt-2 font-play text-sm leading-relaxed text-brown/70">
            This will erase the tag first, then write only the URL you enter. Keep the tag near your Android phone and tap it again when prompted.
          </p>
        </div>
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="nfc-url">Website URL</label>
        <input
          id="nfc-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          disabled={isWriting}
          className="min-w-0 flex-1 rounded-lg border border-brown/20 bg-cream/50 px-4 py-3 font-play text-sm text-dark-brown outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isWriting || !url.trim()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#4F321E] px-6 py-3 font-play text-sm text-cream transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            {isWriting ? 'sync' : 'edit_note'}
          </span>
          {status === 'erasing' ? 'Erasing tag…' : status === 'writing' ? 'Writing URL…' : 'Erase and write'}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 font-play text-sm ${status === 'error' ? 'text-red-700' : status === 'success' ? 'text-green-800' : 'text-brown/70'}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </section>
  );
}