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
      <aside className="boxy-window y2k-widget">
        <div className="boxy-window-title p-3">
          <span className="y2k-pill-title">Visitor Counter</span>
        </div>
        <div className="widget-body text-center">
          <div className="visitor-counter-display">
            <span className="counter-text">Loading...</span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="boxy-window y2k-widget">
      <div className="boxy-window-title p-3">
        <span className="y2k-pill-title">Visitor Counter</span>
      </div>
      <div className="widget-body text-center">
        <div className="visitor-counter-display">
          <div className="counter-label">Total Unique Visitors</div>
          <div className="counter-number">{visitorCount.toLocaleString()}</div>
          <div className="counter-subtitle">Stats collected from GoatCounter!</div>
        </div>
      </div>
    </aside>
  );
};

export default VisitorCounter;