import React from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';

const AboutMe = () => {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">About Me</h1>
      <p className="text-xl text-rose-800">Who I am and some facts about me!</p>
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
              Hi, I'm PioPio (or Myron if you met me in person)! I made this website because I wanted a central place for people and friends to both learn about me and to see some of the work I've created (and also to see if I could make one from scratch)
              <br /><br />I used to work as a Machine Learning Engineer at Google Shopping so I did a lot of work with big data pipelines as well as worked on LLM models as they started growing, which involved fine tuning, data collection, and lots of other stuff you can read about!
              <br /><br />Aside from my work in CS/ML though, I also have lots of hobbies and projects revolving around some of my creative outlets, which include stuff like 3D modeling, Voice Acting, and my own oc's (mainly for role playing games with friends but others too)!
              <br /><br />I also have some smaller fact style stuff about me below if you wanna read more!
            </p>
          </div>
        </section>
        
        {/* Media Interests section */}
        <section id="media-interests" className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4 w-full">
            <h2 className="text-rose-900 font-bold text-xl">Media Interests</h2>
          </div>
          <div className="p-4 text-rose-800">
            <p className="text-sm mb-4 italic">
              If you wanna know more specifics, go to my interests page which I'll update more often! This will give you a general idea of some of the mediastuffs I like! 
            </p>
            
            <div className="media-interests-table">
              <div className="media-row">
                <div className="media-category">Games</div>
                <div className="media-content">
                  Super Mario Sunshine, <span className="highlight">Kingdom Hearts Series</span>, Danganronpa series, Dragon Ball Budokai Tenkaichi, Mario Party 4, Sonic Unleashed, Black Ops Zombies, Citizen Sleeper, 
                  Hi Fi Rush, Valorant, Pokemon Series, Super Danganronpa Another 2 (Fan game), Cyberpunk 2077, Undertale/Deltarune, friend slop genre as a whole
                </div>
              </div>
              
              <div className="media-row">
                <div className="media-category">Shows</div>
                <div className="media-content">
                  Smiling Friends, Haunted Manor, The Owl House, The Amazing Digital Circus
                </div>
              </div>

              <div className="media-row">
                <div className="media-category">Music</div>
                <div className="media-content">
                  DECO*27, FLAVOR FOLEY, JaimeP, <span className="highlight">alot of vocal synth music lately tbh</span>, Keanu Bicol, Bad Bunny, Duki, <span className="highlight">Tainy</span>, StrxwBerryMilk
                </div>
              </div>
              
              <div className="media-row">
                <div className="media-category">Animanga</div>
                <div className="media-content">
                  DragonBall, Chainsaw Man, Dandadan, Delicious in Dungeon, Mob Psycho, Ranma 1/2, Bug Ego, The Disastrous Life of Saiki K, Blue Lock
                </div>
              </div>
              
              <div className="media-row">
                <div className="media-category">Anything that's not in those buckets</div>
                <div className="media-content">
                  <span className="highlight">Dungeons and Daddies</span>, Peach Riot, Dear Daniel, FNAF lore, 
                  Petscop, Sanrio, Kotobukiya
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutMe;
