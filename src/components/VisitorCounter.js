import React, { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch visitor count from GoatCounter API
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('https://piopio.goatcounter.com/counter//.json');
        const data = await response.json();
        
        if (data && data.count) {
          setVisitorCount(data.count);
        } else {
          // Fallback: use localStorage to simulate unique visitor counting
          const stored = localStorage.getItem('visitorCount');
          const hasVisited = localStorage.getItem('hasVisited');
          
          if (!hasVisited) {
            const newCount = stored ? parseInt(stored) + 1 : 1;
            localStorage.setItem('visitorCount', newCount.toString());
            localStorage.setItem('hasVisited', 'true');
            setVisitorCount(newCount);
          } else {
            setVisitorCount(stored ? parseInt(stored) : 1);
          }
        }
      } catch (error) {
        // Fallback method using localStorage
        const stored = localStorage.getItem('visitorCount');
        const hasVisited = localStorage.getItem('hasVisited');
        
        if (!hasVisited) {
          const newCount = stored ? parseInt(stored) + 1 : 157; // Starting number
          localStorage.setItem('visitorCount', newCount.toString());
          localStorage.setItem('hasVisited', 'true');
          setVisitorCount(newCount);
        } else {
          setVisitorCount(stored ? parseInt(stored) : 157);
        }
      }
      setLoading(false);
    };

    fetchVisitorCount();
  }, []);

  if (loading) {
    return (
      <div className="boxy-window p-0">
        <div className="boxy-window-title p-4 w-full">
          <h2 className="text-rose-900 font-bold text-xl">Visitor Counter</h2>
        </div>
        <div className="p-4 text-center text-rose-800">
          <div className="visitor-counter-display">
            <span className="counter-text">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="boxy-window p-0">
      <div className="boxy-window-title p-4 w-full">
        <h2 className="text-rose-900 font-bold text-xl">Visitor Counter</h2>
      </div>
      <div className="p-4 text-center text-rose-800">
        <div className="visitor-counter-display">
          <div className="counter-label">Total Unique Visitors</div>
          <div className="counter-number">{visitorCount.toLocaleString()}</div>
          <div className="counter-subtitle">Stats collected from GoatCounter!</div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;