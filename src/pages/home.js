import '../css/pages/Home.css';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import VisitorCounter from '../components/VisitorCounter';
import friendsData from '../data/friends.json';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

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

const UpdatesWidget = () => {
  const [updates, setUpdates] = useState([
    { date: "10/27/25", content: "Working on big plans to add more pages (Voices?/3D Modeling Projects/More interactive pages)." },
    { date: "10/20/25", content: "Added content to facts, projects, and OCs." },
    { date: "10/15/25", content: "Fixed some small bugs on mobile view, so its more responsive to small screen size." },
    { date: "10/12/25", content: "Finally finished working on the base website! V1.0 ready for people to explore ^_^" },
    { date: "10/05/25", content: "DEV Version of website is currently being worked on, soon to release V1.0" }
  ]);

  useEffect(() => {
    const fetchUpdates = async () => {
      if (!isSupabaseConfigured()) return;
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('updates')
          .select('*')
          .order('post_date', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          setUpdates(data.map(u => {
            const dateObj = new Date(u.post_date);
            const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getUTCDate()).padStart(2, '0');
            const yy = String(dateObj.getUTCFullYear()).slice(-2);
            return { date: `${mm}/${dd}/${yy}`, content: u.content };
          }));
        }
      } catch (err) {
        console.error('Failed to fetch updates', err);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <aside className="boxy-window y2k-widget">
      <div className="boxy-window-title p-3">
        <span className="y2k-pill-title">Updates</span>
      </div>
      <div className="widget-body">
        <div className="max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D62828 #F3F4F6' }}>
          <ul className="text-rose-900 text-sm space-y-3">
            {updates.map((update, idx) => (
              <li key={idx}><strong>[{update.date}]</strong> {update.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
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
          <div className="px-4 py-2 text-rose-800 relative" style={{ display: 'flow-root' }}>
            <div className="hover-image-container float-right ml-4 mb-2" style={{ width: '120px', height: '120px' }}>
              <img src={require('../images/hachi/standing_hachi.jpg')} alt="Default Icon" className="default-img-visible" />
              <img src={require('../images/hachi/test_hachi.png')} alt="Hover Icon" className="hover-img-hidden" />
            </div>
            <p className="mb-2">Welcome to PioPio's website! This is where I'll be sharing things I'm interested in, updates from myself, and anything from my OC's to my latest projects.
              <br /><br />This is also where I will post some of my professional work, projects, and resume for anyone interested in reaching out for collaboration or job opportunities. As this site grows the content you can expect will grow as well so please stay tuned for some upcoming updates on the right!
              <br /><br />
              <span className="jump-only-image-container float-left mr-4 mb-2" style={{ 
                width: '120px', 
                height: '120px',
                display: 'inline-block',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              >
                <img src={require('../images/sona/peace_sign_sona.png')} alt="Peace Sign Sona" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              So whoever you are, please look around and learn more about me and what I do! Also feel free to contact me if you have any questions or just want to say hi!
            </p>
          </div>
        </section>


        </div>

        {/* WIDGETS COLUMN (right) */}
        <div className="grid gap-5">
          <UpdatesWidget />
          
          <VisitorCounter />
        </div>
      </div>
    </Layout>
  );
};

export default Home;