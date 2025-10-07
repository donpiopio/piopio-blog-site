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
          <div className="p-4 text-rose-800 w-full mx-auto" style={{ maxWidth: '900px' }}>
            {/* Upper-left hover image that swaps on hover */}
            <div className="aboutme-corner">
              <img src={require('../images/sona/Base with closed mouth and open eyes.png')} alt="Default avatar" className="default-img-visible" />
              <img src={require('../images/sona/Base with open mouth and eyes.png')} alt="Hover avatar" className="hover-img-hidden" />
            </div>
            <p className="text-lg">
              Hi, I'm PioPio (or Myron if you met me in person)! I made this website because I wanted a central place for people and friends to both learn about me and to see some of the work I've created!
              <br /><br />Aside from my work in Computer Science as a Machine Learning Engineer, I also have lots of hobbies and projects revolving around some of my creative outlets, which include stuff like 3D modeling, Voice Acting, and my own original characters for DnD.
              <br /><br />I also have some smaller fact style stuff about me below if you wanna read more!
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutMe;
