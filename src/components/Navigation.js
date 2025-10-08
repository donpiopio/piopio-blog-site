import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

const Navigation = () => (
  <div id="navigation" className="boxy-window navigation-pane">
    <div className="boxy-window-title px-3 py-2">
      <h2 className="text-rose-900 font-bold text-2xl">Navigation</h2>
      <h2 className="text-rose-900 font-bold text-2xl">Navigation</h2>
    </div>
    <nav className="flex flex-col">
      <div className="px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mb-0.5">Personal</div>
  <Link to="/" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900"><span className="nav-link-text">Home</span></Link>
  <Link to="/aboutme" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900"><span className="nav-link-text">About Me</span></Link>
  <Link to="/interests" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900"><span className="nav-link-text">Interest Board</span></Link>
  <a href="#contact" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200"><span className="nav-link-text">Contact Me!</span></a>
      <div className="px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mt-2 mb-0.5">Resume/Creations</div>
  <Link to="/resume" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900"><span className="nav-link-text">Resume</span></Link>
  <Link to="/projects" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900"><span className="nav-link-text">Projects</span></Link>
      <div className="px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mt-2 mb-0.5">Fun!</div>
  <a href="#OC Gallery" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200"><span className="nav-link-text">OC Gallery</span></a>
  <Link to="/guestbook" className="text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200"><span className="nav-link-text">Guestbook</span></Link>
    </nav>
  </div>
);

export default Navigation;
