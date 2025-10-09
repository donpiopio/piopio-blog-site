import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/main.css';

const Navigation = () => (
  <div id="navigation" className="boxy-window navigation-pane">
    <div className="boxy-window-title px-3 py-2">
      <h2 className="text-rose-900 font-bold text-2xl">Navigation</h2>
    </div>
    <nav className="flex flex-col nav-list">
      <div className="section-label px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mb-0.5">Personal</div>
  <NavLink to="/" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Home</span></NavLink>
  <NavLink to="/aboutme" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900 ${isActive ? 'active' : ''}`}><span className="nav-link-text">About Me</span></NavLink>
  <NavLink to="/interests" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Interest Board</span></NavLink>
  <NavLink to="/connect" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Connect With Me!</span></NavLink>
      <div className="section-label px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mt-2 mb-0.5">Resume/Creations</div>
  <NavLink to="/resume" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Resume</span></NavLink>
  <NavLink to="/projects" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 border-b-2 border-rose-900 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Projects</span></NavLink>
      <div className="section-label px-3 py-1 bg-rose-200 border-2 border-rose-900 rounded-t font-extrabold text-lg text-rose-900 tracking-wide mt-2 mb-0.5">Fun!</div>
  <a href="#OC Gallery" className="nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200"><span className="nav-link-text">OC Gallery</span></a>
  <NavLink to="/guestbook" className={({isActive}) => `nav-link-row text-rose-900 block text-center px-3 py-1 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-200 ${isActive ? 'active' : ''}`}><span className="nav-link-text">Guestbook</span></NavLink>
    </nav>
  </div>
);

export default Navigation;
