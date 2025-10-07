import React from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';

const AboutMe = () => {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">About Me</h1>
      <p className="text-xl text-rose-800">A little more about the person behind PioPio!</p>
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        <section id="aboutme-content" className="boxy-window aboutme-content-box p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4 w-full">
            <h2 className="text-rose-900 font-bold text-xl">Who Am I?</h2>
          </div>
          <div className="p-4 text-rose-800 w-full max-w-2xl mx-auto">
            <p className="mb-6 text-lg">Hi! I'm PioPio, a creative coder, artist, and music lover. I enjoy making websites, drawing original characters, and sharing my favorite tunes. This box is for a big blob of text about myself, my interests, and my journey. You can add as much as you want here!</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <img src={require('../images/hachi/nerd_hachi.png')} alt="Nerd Hachi" className="w-40 h-40 object-cover border-2 border-rose-900 shadow-md" />
              <img src={require('../images/hachi/moving_hachi.jpg')} alt="Moving Hachi" className="w-40 h-40 object-cover border-2 border-rose-900 shadow-md" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutMe;
