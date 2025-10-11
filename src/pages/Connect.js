import React from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import '../css/main.css';

const socials = [
  { label: 'BlueSky', href: 'https://bluesky.com/donpiopio', slug: 'bluesky' },
  { label: 'TikTok', href: 'https://tiktok.com/@don.piopio', slug: 'tiktok' },
  { label: 'GitHub', href: 'https://github.com/donpiopio', slug: 'github' },
];

function SocialIcon({ slug, alt }) {
  const size = 28;
  if (slug === 'email') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#D62828" aria-label={alt} role="img">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
      </svg>
    );
  }
  // Use Simple Icons CDN; color set to theme rose (#D62828)
  const src = `https://cdn.simpleicons.org/${slug}/D62828`;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={`${alt} logo`}
      style={{ display: 'block' }}
      loading="lazy"
    />
  );
}

export default function Connect() {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Connect with Me</h1>
      <p className="text-xl text-rose-800">Peek at my other socials!</p>
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">Socials</h2>
          </div>
          <div className="p-4 grid gap-3 sm:grid-cols-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 border-2 border-rose-900 bg-pink-100 hover:bg-pink-200 transition-colors boxy-window">
                <span className="font-extrabold text-rose-900">{s.label}</span>
                <SocialIcon slug={s.slug} alt={s.label} />
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
