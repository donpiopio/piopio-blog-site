import React from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

const socials = [
  { label: 'BlueSky', href: 'https://bsky.app/profile/donpiopio.bsky.social', slug: 'bluesky' },
  { label: 'TikTok', href: 'https://tiktok.com/@don.piopio', slug: 'tiktok' },
  { label: 'GitHub', href: 'https://github.com/donpiopio', slug: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/myron-rios/', slug: 'linkedin' },
];

function SocialIcon({ slug, alt }) {
  const size = 28;
  // I didn't feel like making switch statement for the source i was already using for simple icons to a different one, so this is a special case I got from ClaudeSonnet to render LinkedIn SVG directly.
  if (slug === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#D62828" aria-label={alt} role="img">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
