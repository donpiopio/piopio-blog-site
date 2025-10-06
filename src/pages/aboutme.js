import React from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';

const AboutMe = () => (
  <div className="p-4 sm:p-8">
    {/* ABOUT ME HEADER */}
    <header className="boxy-window p-6 mb-8 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">About Me</h1>
      <p className="text-xl text-rose-800">A little more about the person behind PioPio!</p>
    </header>
    {/* TWO-COLUMN LAYOUT: NAVIGATION + MAIN CONTENT */}
  <main className="aboutme-flex-container w-full max-w-[90rem] mx-auto">
      {/* LEFT COLUMN: NAVIGATION BOX (identical to home) */}
      <Navigation />
  {/* RIGHT 2/3 COLUMN: ABOUT ME CONTENT BOX */}
  <div id="aboutme-content" className="boxy-window aboutme-content-box flex flex-col items-center justify-center p-6 min-w-0">
        <div className="boxy-window-title p-4 w-full">
          <h2 className="text-rose-900 font-bold text-xl">Who Am I?</h2>
        </div>
        <div className="p-4 text-rose-800 w-full max-w-2xl mx-auto">
          <p className="mb-6 text-lg">Hi! I'm PioPio, a creative coder, artist, and music lover. I enjoy making websites, drawing original characters, and sharing my favorite tunes. This box is for a big blob of text about myself, my interests, and my journey. You can add as much as you want here!</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <img src={require('../images/hachi/nerd_hachi.png')} alt="Nerd Hachi" className="w-40 h-40 object-cover border-2 border-rose-900 shadow-md" />
            <img src={require('../images/hachi/moving_hachi.jpg')} alt="Moving Hachi" className="w-40 h-40 object-cover border-2 border-rose-900 shadow-md" />
            {/* Add more images or content here! */}
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AboutMe;
