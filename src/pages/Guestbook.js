import React, { useEffect, useState } from 'react';
import '../css/main.css';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

const STORAGE_KEY = 'guestbookEntries';

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const Guestbook = () => {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Guestbook</h1>
      <p className="text-xl text-rose-800">Say hi and leave a sweet message ♡</p>
    </div>
  );

  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function init() {
      // Prefer Supabase if configured
      if (isSupabaseConfigured()) {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('guestbook_entries')
          .select('*')
          .order('time', { ascending: false })
          .limit(200);
        if (!error && Array.isArray(data)) {
          setEntries(data);
          return;
        }
      }
      // Fallback to local storage
      setEntries(loadEntries().sort((a, b) => b.time - a.time));
    }
    init();
  }, []);

  function normalizeUrl(url) {
    if (!url) return '';
    try {
      // If it's already absolute, return as-is; otherwise prefix with https://
      const u = new URL(url, window.location.origin);
      if (!/^https?:/i.test(u.protocol)) return '';
      // Use href to get the absolute form only when original included protocol
      return /^https?:/i.test(url) ? url : `https://${url}`;
    } catch {
      return '';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedMsg) {
      setError('Please add your name and a message.');
      return;
    }
    if (trimmedMsg.length > 1000) {
      setError('Message is too long (1000 chars max).');
      return;
    }
    const entry = {
      id: Date.now().toString(),
      name: trimmedName,
      website: normalizeUrl(website.trim()),
      message: trimmedMsg,
      time: Date.now(),
    };

    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('guestbook_entries')
          .insert([{ id: entry.id, name: entry.name, website: entry.website, message: entry.message, time: entry.time }])
          .select();
        if (!error) {
          setEntries((prev) => [data?.[0] || entry, ...prev]);
          setName(''); setWebsite(''); setMessage('');
          setSuccess('Thanks for signing!');
          return;
        }
      } catch (_) {}
    }

    // Fallback: local storage
    const next = [entry, ...entries];
    setEntries(next);
    saveEntries(next);
    setName('');
    setWebsite('');
    setMessage('');
    setSuccess('Thanks for signing!');
  }

  function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  }

  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        {/* Sign form */}
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">Sign In</h2>
          </div>
          <form className="p-4 grid gap-4 guestbook-form" onSubmit={handleSubmit}>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block text-rose-900">
                <span className="font-bold">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-rose-900 px-3 py-2 bg-pink-50 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block text-rose-900">
                <span className="font-bold">Website (optional)</span>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full border-2 border-rose-900 px-3 py-2 bg-pink-50 focus:outline-none"
                  placeholder="https://your.site"
                />
              </label>
            </div>
            <label className="block text-rose-900">
              <span className="font-bold">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-2 border-rose-900 px-3 py-2 bg-pink-50 focus:outline-none min-h-[120px]"
                placeholder="Write something cute!"
                maxLength={1000}
                required
              />
            </label>
            {error && <div className="text-red-700 font-bold">{error}</div>}
            {success && <div className="text-green-700 font-bold">{success}</div>}
            <div>
              <button type="submit" className="btn-y2k">Submit</button>
            </div>
          </form>
        </section>

        {/* Entries list */}
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">Messages</h2>
          </div>
          <div className="p-4 grid gap-4">
            {entries.length === 0 && (
              <div className="text-rose-800">Be the first to sign the guestbook!</div>
            )}
            {entries.map((e) => (
              <article key={e.id} className="boxy-window p-3">
                <header className="flex items-center justify-between mb-2">
                  <div className="text-rose-900 font-extrabold">
                    {e.name}
                    {e.website && (
                      <a
                        href={e.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 underline text-rose-700 hover:text-rose-900"
                      >
                        Website ↗
                      </a>
                    )}
                  </div>
                  <time className="text-rose-700 text-sm">{formatDate(e.time)}</time>
                </header>
                <p className="text-rose-800 whitespace-pre-wrap">{e.message}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Guestbook;
