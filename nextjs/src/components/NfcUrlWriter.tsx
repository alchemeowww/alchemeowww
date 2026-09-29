'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

type NdefMessage = {
  records: Array<{ recordType: 'url'; data: string }>;
};

type ReadableNdefRecord = {
  recordType: string;
  data: DataView | null;
  encoding?: string;
};

type NdefReadingEvent = Event & {
  message: { records: ReadableNdefRecord[] };
};

interface NdefReader extends EventTarget {
  write: (message: NdefMessage, options?: { overwrite?: boolean; signal?: AbortSignal }) => Promise<void>;
  scan: (options?: { signal?: AbortSignal }) => Promise<void>;
}

type WebNfcWindow = Window & {
  NDEFReader?: new () => NdefReader;
};

type WriterStatus = 'idle' | 'writing' | 'success' | 'error';

const uriPrefixes = [
  '', 'http://www.', 'https://www.', 'http://', 'https://', 'tel:', 'mailto:',
  'ftp://anonymous:anonymous@', 'ftp://ftp.', 'ftps://', 'sftp://', 'smb://',
  'nfs://', 'ftp://', 'dav://', 'news:', 'telnet://', 'imap:', 'rtsp:', 'urn:',
  'pop:', 'sip:', 'sips:', 'tftp:', 'btspp://', 'btl2cap://', 'btgoep://',
  'tcpobex://', 'irdaobex://', 'file://', 'urn:epc:id:', 'urn:epc:tag:',
  'urn:epc:pat:', 'urn:epc:raw:', 'urn:epc:', 'urn:nfc:',
];

function readRecordValue(record: ReadableNdefRecord) {
  if (!record.data) return 'No readable data';

  const bytes = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
  if (record.recordType === 'url') {
    const prefix = uriPrefixes[bytes[0]] ?? '';
    return prefix + new TextDecoder().decode(bytes.subarray(1));
  }
  if (record.recordType === 'text' && bytes.length > 0) {
    const languageLength = bytes[0] & 0x3f;
    const encoding = bytes[0] & 0x80 ? 'utf-16be' : record.encoding ?? 'utf-8';
    return new TextDecoder(encoding).decode(bytes.subarray(1 + languageLength));
  }

  return `Binary data (${record.data.byteLength} bytes)`;
}

export default function NfcUrlWriter() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(false);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<WriterStatus>('idle');
  const [message, setMessage] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [readRecords, setReadRecords] = useState<Array<{ type: string; value: string }>>([]);
  const readController = useRef<AbortController | null>(null);
  const writeController = useRef<AbortController | null>(null);

  useEffect(() => {
    setEnabled(new URLSearchParams(window.location.search).get('nfc') === 'true');
    setSupported(window.isSecureContext && typeof (window as WebNfcWindow).NDEFReader === 'function');
  }, []);

  // if (!enabled || !supported) return null;

  const isWriting = status === 'writing';

  async function handleRead() {
    const Reader = (window as WebNfcWindow).NDEFReader;
    if (!Reader) return;

    const controller = new AbortController();
    readController.current = controller;
    setReadRecords([]);
    setIsReading(true);
    setMessage('Hold the NFC tag near your phone to read its contents.');

    const reader = new Reader();
    reader.addEventListener('reading', (event) => {
      const records = (event as NdefReadingEvent).message.records;
      setReadRecords(records.map((record) => ({ type: record.recordType, value: readRecordValue(record) })));
      setMessage('Tag read successfully.');
      setIsReading(false);
      controller.abort();
    }, { once: true });
    reader.addEventListener('readingerror', () => {
      setMessage('The tag was detected, but its contents could not be read.');
      setStatus('error');
      setIsReading(false);
      controller.abort();
    }, { once: true });

    try {
      await reader.scan({ signal: controller.signal });
    } catch (error) {
      if (!controller.signal.aborted) {
        setMessage(error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'NFC access was denied. Allow NFC access and try again.'
          : 'Could not start NFC reading. Keep the tag near your phone and try again.');
        setStatus('error');
        setIsReading(false);
      }
    }
  }

  function handleStopReading() {
    readController.current?.abort();
    readController.current = null;
    setIsReading(false);
    setMessage('NFC reading stopped.');
  }

  function handleCancelWriting() {
    writeController.current?.abort();
  }

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
    const controller = new AbortController();
    writeController.current = controller;
    setStatus('writing');
    setMessage('Hold the NFC tag near your phone to replace its contents with the URL.');

    try {
      await reader.write(
        { records: [{ recordType: 'url', data: targetUrl.toString() }] },
        { overwrite: true, signal: controller.signal }
      );
      setStatus('success');
      setMessage(`URL written successfully: ${targetUrl.toString()}`);
    } catch (error) {
      if (controller.signal.aborted) {
        setStatus('idle');
        setMessage('Writing cancelled.');
      } else if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setStatus('error');
        setMessage('NFC access was denied. Allow NFC access and try again.');
      } else if (error instanceof DOMException && error.name === 'NotSupportedError') {
        setStatus('error');
        setMessage('The tag could not be read. Check that it supports NFC Forum NDEF.');
      } else {
        setStatus('error');
        setMessage('The write did not complete. Keep the tag near your phone and try again.');
      }
    } finally {
      if (writeController.current === controller) writeController.current = null;
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
            This will replace the tag&apos;s existing contents with the URL you enter. Keep the tag near your Android phone when prompted.
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
          disabled={isWriting || isReading}
          className="min-w-0 flex-1 rounded-lg border border-brown/20 bg-cream/50 px-4 py-3 font-play text-sm text-dark-brown outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isWriting || isReading || !url.trim()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#4F321E] px-6 py-3 font-play text-sm text-cream transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            {isWriting ? 'sync' : 'edit_note'}
          </span>
          {isWriting ? 'Writing URL…' : 'Write URL'}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-3">
        {isWriting && (
          <button
            type="button"
            onClick={handleCancelWriting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brown/20 px-5 py-3 font-play text-sm text-brown transition-colors hover:bg-cream/70"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">close</span>
            Cancel writing
          </button>
        )}
        <button
          type="button"
          onClick={isReading ? handleStopReading : handleRead}
          disabled={isWriting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brown/20 px-5 py-3 font-play text-sm text-brown transition-colors hover:bg-cream/70 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            {isReading ? 'close' : 'sensors'}
          </span>
          {isReading ? 'Stop reading' : 'Read tag'}
        </button>
      </div>

      {readRecords.length > 0 && (
        <div className="mt-5 space-y-3" aria-live="polite">
          <h3 className="font-rye text-lg text-brown">Tag contents</h3>
          {readRecords.map((record, index) => (
            <div key={`${record.type}-${index}`} className="rounded-lg border border-brown/10 bg-cream/50 p-4">
              <p className="font-play text-xs uppercase text-brown/50">{record.type}</p>
              <p className="mt-1 break-all font-play text-sm text-brown">{record.value}</p>
            </div>
          ))}
        </div>
      )}

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