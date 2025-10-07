import React from 'react';

const Layout = ({ header, nav, children }) => {
  return (
    <div className="site-frame">
      <div className="site-grid">
        <header className="boxy-window site-header">
          {header}
        </header>

        {/* Connector bar between header and the two columns */}
        <div className="connector-bar" aria-hidden="true">
          <span className="connector-line connector-nav" />
          <span className="connector-dot connector-nav-dot" />
          <span className="connector-line connector-main" />
          <span className="connector-dot connector-main-dot" />
        </div>

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
