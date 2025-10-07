import React from 'react';

const Layout = ({ header, nav, children }) => {
  return (
    <div className="site-frame">
      <div className="site-grid">
        <header className="boxy-window site-header">
          {header}
        </header>

        {/* Left navigation column */}
        <aside className="site-nav">
          {nav}
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
