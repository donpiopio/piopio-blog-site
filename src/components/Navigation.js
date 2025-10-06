import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

const Navigation = () => (
  <div id="navigation" className="boxy-window navigation-pane">
    <div className="boxy-window-title px-3 py-2">
      <h2 className="text-rose-900 font-bold text-xl">Navigation</h2>
    </div>
    <nav className="flex flex-col">
      <div className="px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-base text-rose-900 tracking-wide mb-0.5">Personal</div>
      <Link to="/aboutme" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900">About Me</Link>
      <Link to="/" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900">Home</Link>
      <Link to="/interests" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900">Interest Board</Link>
      <a href="#contact" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200">Contact Me!</a>
      <div className="px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-base text-rose-900 tracking-wide mt-2 mb-0.5">Resume/Creations</div>
      <Link to="/resume" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900">Resume</Link>
      <a href="#projects" className="text-rose-900 block text-center px-3 py-1 hover:bg-rose-500 hover:text-white transition-colors duration-200">Projects</a>
    </nav>
  </div>
);

export default Navigation;
