
import React, { useState, useEffect } from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';
import friendsData from '../data/friends.json';

const Home = () => (
  <div className="p-4 sm:p-8">
    {/* WELCOME BAR */}
    <header className="boxy-window p-6 mb-8 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">PioPio's Website!</h1>
      <p className="text-xl text-rose-800">Everything I do should be here i think.</p>
    </header>
    {/* THREE-COLUMN LAYOUT */}
  <main className="home-flex-container w-full max-w-[90rem] mx-auto">
      {/* LEFT COLUMN: NAVIGATION BOX */}
      <Navigation />
      {/* MIDDLE COLUMN: INTRO BOX */}
  <div id="welcome" className="boxy-window flex-grow-[3] home-middle-box relative overflow-hidden min-w-0 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl">
        <div className="boxy-window-title p-4">
          <h2 className="text-rose-900 font-bold text-xl">Quick Intro</h2>
        </div>
        <div className="p-4 text-rose-800 flex items-center">
          <div className="flex-1">
            <p className="mb-4">Welcome to PioPio's website! This site is my personal little corner, where I'll be sharing things I'm interested in, updates for myself, and anything from my OC art to my latest projects. Please look around!</p>
          </div>
          <div className="hover-image-container ml-6" style={{ width: '120px', height: '120px' }}>
            <img src={require('../images/hachi/standing_hachi.jpg')} alt="Default Icon" className="default-img-visible" />
            <img src={require('../images/hachi/test_hachi.png')} alt="Hover Icon" className="hover-img-hidden" />
          </div>
        </div>
      </div>
      {/* RIGHT COLUMN: FRIENDS BOX */}
  <div id="friends" className="boxy-window home-friends-box min-w-0 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="boxy-window-title p-4">
          <h2 className="text-rose-900 font-bold text-xl">My Friends</h2>
        </div>
        <div className="p-4 grid grid-cols-3 grid-rows-2 gap-4 justify-items-center friends-grid">
          {friendsData.map((friend, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <a href={friend.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <img 
                  src={friend.image.startsWith('http') ? friend.image : require(`../${friend.image}`)} 
                  alt={`Pixel art of ${friend.name}`} 
                  className="friend-image w-full max-w-[80px] mx-auto aspect-square object-cover shadow-lg border-2 border-rose-700 transition-transform duration-200 hover:scale-110" 
                />
              </a>
              <a href={friend.url} target="_blank" rel="noopener noreferrer" className="mt-2 text-rose-900 font-semibold hover:underline friend-text" style={{ fontSize: '0.85em' }}>
                {friend.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
    {/* MUSIC PLAYER - Not included, as React needs a separate component for this */}
  </div>
);

export default Home;