
import React, { useState } from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import VisitorCounter from '../components/VisitorCounter';
import friendsData from '../data/friends.json';

<script data-goatcounter="https://piopio.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>

const FriendsGrid = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const friendsPerPage = 4; // 2x2 grid
  const totalPages = Math.ceil(friendsData.length / friendsPerPage);

  const getCurrentFriends = () => {
    const startIndex = currentPage * friendsPerPage;
    const endIndex = startIndex + friendsPerPage;
    return friendsData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="boxy-window mt-4">
      <div className="boxy-window-title p-3 flex justify-between items-center">
        <h2 className="text-rose-900 font-bold text-lg">My Friends</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevPage} 
            className="arrow-btn"
            disabled={totalPages <= 1}
          >
            ◀
          </button>
          <span className="text-rose-700 text-sm">{currentPage + 1}/{totalPages}</span>
          <button 
            onClick={nextPage} 
            className="arrow-btn"
            disabled={totalPages <= 1}
          >
            ▶
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="friends-2x2-grid">
          {getCurrentFriends().map((friend, index) => (
            <div key={index} className="friend-item">
              <a href={friend.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={friend.image.startsWith('http') ? friend.image : require(`../${friend.image}`)}
                  alt={`Pixel art of ${friend.name}`}
                  className="friend-grid-image"
                />
              </a>
              <a 
                href={friend.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="friend-grid-name"
              >
                {friend.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">PioPio's Website!</h1>
      <p className="text-xl text-rose-800">Everything I do should be here i think.</p>
    </div>
  );

  const nav = (
    <div>
      <Navigation />
      <FriendsGrid />
    </div>
  );

  return (
    <Layout header={header} nav={nav}>
      {/* CONTENT GRID: main + widgets */}
      <div className="site-content-grid">
        <div className="grid gap-5">
        {/* INTRO BLOCK */}
        <section id="welcome" className="boxy-window relative overflow-hidden">
          <div className="boxy-window-title p-4">
            <h2 className="text-rose-900 font-bold text-xl">Quick Intro</h2>
          </div>
          <div className="p-4 text-rose-800 flex items-center">
            <div className="flex-1">
              <p className="mb-4">Welcome to PioPio's website! This is where I'll be sharing things I'm interested in, updates from myself, and anything from my OC's to my latest projects.
                <br /><br />This is also where I will post some of my professional work, projects, and resume for anyone interested in reaching out for collaboration or job opportunities.
                <br /><br />So whoever you are, please look around and feel free to contact me if you have any questions or just want to say hi!
              </p>
            </div>
            <div className="hover-image-container ml-6" style={{ width: '120px', height: '120px' }}>
              <img src={require('../images/hachi/standing_hachi.jpg')} alt="Default Icon" className="default-img-visible" />
              <img src={require('../images/hachi/test_hachi.png')} alt="Hover Icon" className="hover-img-hidden" />
            </div>
          </div>
        </section>


        </div>

        {/* WIDGETS COLUMN (right) */}
        <div className="grid gap-5">
          <aside className="boxy-window y2k-widget">
            <div className="boxy-window-title p-3">
              <span className="y2k-pill-title">Updates</span>
            </div>
            <div className="widget-body">
              <ul className="text-rose-900 text-sm space-y-3">
                <li><strong>[10/05/25]</strong> DEV Version of website is currently being worked on, soon to release v1.0</li>
              </ul>
            </div>
          </aside>
          
          <VisitorCounter />
        </div>
      </div>
    </Layout>
  );
};

export default Home;