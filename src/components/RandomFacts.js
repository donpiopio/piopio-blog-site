import React, { useState } from 'react';
import '../css/main.css';

const RandomFacts = () => {
  const facts = [
    "Mixed chiahuahua's are my favorite breed of dog.",
    "I don't really like overly sweet stuff, unless its a fruit flavor.",
    "I have a twin! Only one of us can whistle and the other can snap :3",
    "I am tongue-tied, so I physically can't roll my R's.",
    "I've done some Front-End improvements on existing projects, but this is my first time starting from scratch!",
    "The name PioPio comes from a Peruvian huayno song!",
    "I hate gambling, unless its in the form of cardboard trading cards, then I'm all for opening packs.",
    "I was born in the US but lived in Peru for a few years as a kid and even did some schooling there.",
    "The thing that got me into coding in highschool was that I wanted to fix some broken Minecraft mods.",
    "If I ever say 'Shut Up.' to you irl, what I actually mean is 'Keep Talking'",
    "As a kid I'm pretty sure I binged 6 seasons of Fairy Tail in just a few weeks.",
    "I've been collecting Pokemon cards for so long I think my remaining collection of binders and cards could pay my rent for a good while.",
    "There are exactly 31 facts in this list - please don't try to get them all",
    "My twin brother and I were originally going to be named, Karl and Marx by my Dad, my mom quickly stopped that idea.",
    "My all time favorite pokemon is cyndaquil! It was my first starter Pokemon!",
    "When walking around at home I like to take my socks half off my foot, so I can slide around easier.",
    "I can stop my hiccups instantly through sheer will.",
    "My first job in my career was to fix the pipeline I made as an intern.",
    "Don't spam the generate facts button, I made it harder to find new facts the more you do.",
  ];

  const [currentFact, setCurrentFact] = useState("");

  const generateFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[randomIndex]);
  };

  return (
    <div className="random-facts-box boxy-window p-0">
      <div className="boxy-window-title p-4 w-full">
        <h2 className="text-rose-900 font-bold text-xl">Random Facts</h2>
      </div>
      <div className="p-4 text-rose-800 text-center">
        <div className="fact-display-area">
          <p className="fact-text">
            {currentFact || "Click below to get a random fact about me"}
          </p>
        </div>
        
        <button 
          className="generate-fact-btn"
          onClick={generateFact}
        >
          Generate a fact!
        </button>
      </div>
    </div>
  );
};

export default RandomFacts;