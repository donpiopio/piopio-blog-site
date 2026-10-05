import '../css/pages/Interests.css';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import Draggable from 'react-draggable';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import interests from '../data/interests.json';

const DraggableImage = ({ interest, containerSize, onImageClick, zIndex, onDragStart }) => {
  const nodeRef = useRef(null);
  
  // Controlled position state
  const [pos, setPos] = useState(() => ({
    x: Math.random() * Math.max(0, containerSize.width - 200),
    y: Math.random() * Math.max(0, containerSize.height - 200)
  }));
  
  const [isDragging, setIsDragging] = useState(false);
  
  // Velocity in pixels per tick
  const vel = useRef({
    vx: (Math.random() - 0.5) * 40,
    vy: (Math.random() - 0.5) * 40
  });

  const animDelay = useMemo(() => Math.random() * -10, []);
  const animDuration = useMemo(() => 5 + Math.random() * 4, []);

  useEffect(() => {
    if (isDragging || containerSize.width === 0) return;

    const intervalId = setInterval(() => {
      setPos(prev => {
        let newX = prev.x + vel.current.vx;
        let newY = prev.y + vel.current.vy;
        
        // Occasionally wander randomly
        if (Math.random() < 0.2) {
          vel.current.vx += (Math.random() - 0.5) * 30;
          vel.current.vy += (Math.random() - 0.5) * 30;
          
          // Cap velocity
          vel.current.vx = Math.max(-60, Math.min(60, vel.current.vx));
          vel.current.vy = Math.max(-60, Math.min(60, vel.current.vy));
        }

        const maxW = containerSize.width - 180;
        const maxH = containerSize.height - 180;
        
        // Bounce off walls
        if (newX <= 0) { newX = 0; vel.current.vx *= -1; }
        else if (newX >= maxW) { newX = maxW; vel.current.vx *= -1; }
        
        if (newY <= 0) { newY = 0; vel.current.vy *= -1; }
        else if (newY >= maxH) { newY = maxH; vel.current.vy *= -1; }
        
        return { x: newX, y: newY };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isDragging, containerSize]);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    onImageClick(interest);
  };

  const handleStart = () => {
    setIsDragging(true);
    onDragStart(interest.id);
  };

  const handleDrag = (e, data) => {
    setPos({ x: data.x, y: data.y });
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      position={pos}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div 
        ref={nodeRef} 
        className="collage-item" 
        style={{ 
          position: 'absolute', 
          width: '180px', 
          height: '180px', 
          zIndex: zIndex,
          transition: isDragging ? 'none' : 'transform 1s linear'
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div 
          className="bubble-float" 
          style={{ 
            animationDelay: `${animDelay}s`, 
            animationDuration: `${animDuration}s` 
          }}
        >
          <div className="bubble-container">
            <img 
              draggable="false" 
              src={require(`../${interest.src}`)} 
              alt={interest.alt} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain'
              }} 
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

const Interests = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [zIndexes, setZIndexes] = useState({});
  const [nextZIndex, setNextZIndex] = useState(2);

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const handleImageClick = (interest) => {
    setSelectedImage(interest);
  };

  const handleClosePane = () => {
    setSelectedImage(null);
  };

  const handleDragStart = (imageId) => {
    setZIndexes(prev => ({
      ...prev,
      [imageId]: nextZIndex
    }));
    setNextZIndex(prev => prev + 1);
  };

  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Interest Board</h1>
      <p className="text-xl text-rose-800">These things tickle my brain.</p>
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        <section className="boxy-window relative overflow-auto min-w-0" style={{ gridColumn: '1 / -1' }}>
          <div ref={containerRef} className="p-4" style={{ height: '1000px', position: 'relative' }}>
            <div className="collage-container">
              {containerSize.width > 0 && interests.map(interest => (
                <DraggableImage
                  key={interest.id}
                  interest={interest}
                  containerSize={containerSize}
                  onImageClick={handleImageClick}
                  zIndex={zIndexes[interest.id] || 1}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleClosePane}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handleClosePane}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-rose-100 text-rose-500 hover:text-rose-800 hover:bg-rose-200 border-2 border-rose-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold z-[60] shadow-md transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="interest-popup-modal">
              <div className="interest-popup-content">
                <div className="my-auto w-full flex flex-col items-center">
                  <h2 className="text-rose-900 font-bold text-2xl mb-4 text-center">{selectedImage.title}</h2>
                  <img src={require(`../${selectedImage.src}`)} alt={selectedImage.alt} className="w-full h-auto max-h-48 object-contain mb-4 drop-shadow-md" />
                  <div className="interest-text-container text-center">
                    <p className="text-rose-900 font-semibold">
                      {selectedImage.notes.split('\n').map((line, idx, arr) => (
                        <span key={idx}>
                          {line}
                          {idx < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Interests;
