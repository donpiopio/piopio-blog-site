import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Navigation from '../components/Navigation';
import interests from '../data/interests.json';
import '../css/main.css';

const DraggableImage = ({ interest, containerSize, onImageClick }) => {
  const nodeRef = useRef(null);
  const randomX = Math.random() * (containerSize.width - 150);
  const randomY = Math.random() * (containerSize.height - 150);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    onImageClick(interest);
  };

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={{ x: randomX, y: randomY }}>
      <div 
        ref={nodeRef} 
        className="collage-item" 
        style={{ position: 'absolute', width: '150px', height: '150px', cursor: 'pointer' }}
        onDoubleClick={handleDoubleClick}
      >
        <img draggable="false" src={require(`../${interest.src}`)} alt={interest.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </Draggable>
  );
};

const Interests = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="p-4 sm:p-8">
      <header className="boxy-window p-6 mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Interest Board</h1>
        <p className="text-xl text-rose-800">A collection of things I find cool.</p>
      </header>
      <main className="home-flex-container w-full max-w-[90rem] mx-auto">
        <Navigation />
        <div className="boxy-window flex-grow-[3] home-middle-box relative overflow-auto min-w-0 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl">
          <div ref={containerRef} className="p-4" style={{ height: '1000px', position: 'relative' }}>
            <div className="collage-container">
              {containerSize.width > 0 && interests.map(interest => (
                <DraggableImage key={interest.id} interest={interest} containerSize={containerSize} onImageClick={handleImageClick} />
              ))}
            </div>
          </div>
        </div>
        {selectedImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClosePane}>
            <div className="boxy-window max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="boxy-window-title p-4">
                <h2 className="text-rose-900 font-bold text-xl">{selectedImage.title}</h2>
              </div>
              <div className="p-4">
                <img src={require(`../${selectedImage.src}`)} alt={selectedImage.alt} className="w-full h-auto max-h-96 object-contain mb-4" />
                <p className="text-rose-800">{selectedImage.notes}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Interests;
