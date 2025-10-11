import React, { useEffect } from 'react';
import RandomFacts from './RandomFacts';

const Layout = ({ header, nav, children }) => {
  useEffect(() => {
    // Add GoatCounter tracking script
    if (!document.querySelector('script[data-goatcounter]')) {
      const script = document.createElement('script');
      script.setAttribute('data-goatcounter', 'https://piopio.goatcounter.com/count');
      script.src = '//gc.zgo.at/count.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="site-frame">
      <div className="site-grid">
        <header className="boxy-window site-header">
          {header}
        </header>

        {/* Left navigation column */}
        <aside className="site-nav">
          {nav}
          <RandomFacts />
        </aside>

        {/* Right content column */}
        <main className="site-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
