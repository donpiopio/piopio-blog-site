import React, { useState } from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import '../css/main.css';

// Your button that others can copy
const myButton = {
  html: `<a href="https://your-site.com"><img src="https://your-site.com/button.gif" alt="PioPio's Website" /></a>`,
  image: '/button.gif', // You'll need to create this 88x31 button image
  alt: "PioPio's Website"
};

// Other people's buttons (you can add more here)
const friendButtons = [
  {
    name: "Friend's Site",
    html: `<a href="https://example1.com"><img src="https://example1.com/button.gif" alt="Friend's Site" /></a>`,
    image: '/placeholder-button1.gif',
    alt: "Friend's Site"
  },
  {
    name: "Cool Blog",
    html: `<a href="https://example2.com"><img src="https://example2.com/button.gif" alt="Cool Blog" /></a>`,
    image: '/placeholder-button2.gif', 
    alt: "Cool Blog"
  }
];

export default function Buttons() {
  const [copiedButton, setCopiedButton] = useState(null);

  const copyToClipboard = (html, buttonName) => {
    navigator.clipboard.writeText(html).then(() => {
      setCopiedButton(buttonName);
      setTimeout(() => setCopiedButton(null), 2000);
    });
  };

  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Buttons</h1>
      <p className="text-xl text-rose-800">Cute 88x31 web buttons ♡</p>
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        {/* My Button Section */}
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">My Button</h2>
          </div>
          <div className="p-4">
            <p className="text-rose-800 mb-4">Copy this HTML to link to my site from yours!</p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="boxy-window p-3 bg-pink-50">
                <img 
                  src={myButton.image} 
                  alt={myButton.alt}
                  className="pixelated"
                  style={{ width: '88px', height: '31px', imageRendering: 'pixelated' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none', width: '88px', height: '31px', backgroundColor: '#ffb7cf', border: '1px solid #D62828', textAlign: 'center', lineHeight: '29px', fontSize: '10px', color: '#D62828' }}>
                  88x31 Button
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 border-2 border-rose-900 p-2 rounded font-mono text-sm overflow-x-auto">
                  <code>{myButton.html}</code>
                </div>
                <button 
                  onClick={() => copyToClipboard(myButton.html, 'my-button')}
                  className="btn-y2k mt-2"
                >
                  {copiedButton === 'my-button' ? 'Copied!' : 'Copy HTML'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Friends' Buttons Section */}
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">Friends & Cool Sites</h2>
          </div>
          <div className="p-4">
            <p className="text-rose-800 mb-4">Check out these awesome sites!</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {friendButtons.map((button, index) => (
                <div key={index} className="boxy-window p-3 bg-pink-50 text-center">
                  <div className="mb-2">
                    <img 
                      src={button.image}
                      alt={button.alt}
                      className="pixelated mx-auto cursor-pointer hover:scale-105 transition-transform"
                      style={{ width: '88px', height: '31px', imageRendering: 'pixelated' }}
                      onClick={() => {
                        const link = button.html.match(/href="([^"]+)"/)?.[1];
                        if (link) window.open(link, '_blank');
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div style={{ display: 'none', width: '88px', height: '31px', backgroundColor: '#ffb7cf', border: '1px solid #D62828', textAlign: 'center', lineHeight: '29px', fontSize: '10px', color: '#D62828', margin: '0 auto' }}>
                      {button.name}
                    </div>
                  </div>
                  <div className="text-rose-900 font-bold text-sm mb-2">{button.name}</div>
                  <button 
                    onClick={() => copyToClipboard(button.html, button.name)}
                    className="text-xs px-2 py-1 bg-rose-200 hover:bg-rose-300 border border-rose-900 transition-colors"
                  >
                    {copiedButton === button.name ? 'Copied!' : 'Copy HTML'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">About Web Buttons</h2>
          </div>
          <div className="p-4 text-rose-800">
            <p className="mb-2">Web buttons are a nostalgic way to link between personal sites! The standard size is 88x31 pixels.</p>
            <p className="mb-2">To add my button to your site, just copy the HTML above and paste it wherever you want it to appear.</p>
            <p>Want to exchange buttons? <a href="/connect" className="text-rose-600 hover:text-rose-900 underline">Get in touch!</a></p>
          </div>
        </section>
      </div>
    </Layout>
  );
}