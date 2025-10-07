import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import interests from '../data/interests.json';
import '../css/main.css';

const DraggableImage = ({ interest, containerSize, onImageClick, zIndex, onDragStart }) => {
  const nodeRef = useRef(null);
  const randomX = Math.random() * (containerSize.width - 150);
  const randomY = Math.random() * (containerSize.height - 150);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    onImageClick(interest);
  };

  const handleStart = () => {
    onDragStart(interest.id);
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      defaultPosition={{ x: randomX, y: randomY }}
      onStart={handleStart}
    >
      <div 
        ref={nodeRef} 
        className="collage-item" 
        style={{ 
          position: 'absolute', 
          width: '150px', 
          height: '150px', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: zIndex
        }}
        onDoubleClick={handleDoubleClick}
      >
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
      <p className="text-xl text-rose-800">A collection of things I find cool.</p>
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClosePane}>
          <div className="boxy-window max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="boxy-window-title p-4">
              <h2 className="text-rose-900 font-bold text-xl">{selectedImage.title}</h2>
            </div>
            <div className="p-4">
              <img src={require(`../${selectedImage.src}`)} alt={selectedImage.alt} className="w-full h-auto max-h-96 object-contain mb-4" />
              <p className="text-rose-800">
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
      )}
    </Layout>
  );
};

export default Interests;
