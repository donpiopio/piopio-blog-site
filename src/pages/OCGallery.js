import React, { useState } from 'react';
import '../css/main.css';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import ocsData from '../data/ocs.json';

const OCGallery = () => {
  const [selectedOC, setSelectedOC] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const selectOC = (oc) => {
    setSelectedOC(oc);
  };

  const goBackToGrid = () => {
    setSelectedOC(null);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Helper function to render text with line breaks
  const renderTextWithBreaks = (text) => {
    if (!text) return '';
    // Handle line breaks in JSON
    return text.split(/\\n/).map((line, idx, arr) => (
      <span key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </span>
    ));
  };

  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">OC Gallery</h1>
      <p className="text-xl text-rose-800">Meet my little freaks</p>
    </div>
  );

  // If an OC is selected, show their detailed page
  if (selectedOC) {
    return (
      <Layout header={header} nav={<Navigation />}>
        <div className="site-content-grid">
          {/* Back button and character header */}
          <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
            <div className="boxy-window-title p-4 w-full flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button onClick={goBackToGrid} className="back-btn">← Back to Gallery</button>
                <h2 className="text-rose-900 font-bold text-xl">{selectedOC.name}</h2>
              </div>
            </div>
            
            <div className="p-6 text-rose-800">
              <div className="oc-detail-layout">
                {/* Left Column: Main Image + Trivia */}
                <div className="oc-left-column">
                  <div className="oc-main-image">
                    <img 
                      src={require(`../${selectedOC.mainImage}`)} 
                      alt={selectedOC.name}
                      className="character-main-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNoYXJhY3RlciBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  {/* Trivia/Fun Facts Section */}
                  <div className="oc-trivia-section">
                    <h3 className="trivia-title">Fun Facts</h3>
                    <div className="trivia-content">
                      {selectedOC.funFacts && selectedOC.funFacts.map((fact, index) => (
                        <div key={index} className="trivia-item">
                          <span className="trivia-value">{renderTextWithBreaks(fact)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Column: Info Panel + Overview */}
                <div className="oc-right-column">
                  <div className="oc-stats-box">
                    <h3 className="stats-title">Character Info</h3>
                    <div className="oc-stats">
                      <div className="stat-row">
                        <span className="stat-label">Name:</span>
                        <span className="stat-value">{selectedOC.name}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Species:</span>
                        <span className="stat-value">{selectedOC.species}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Age:</span>
                        <span className="stat-value">{selectedOC.age}</span>
                      </div>

                    </div>
                  </div>
                  
                  <div className="oc-overview-section">
                    <h3 className="overview-title">Overview</h3>
                    <div className="overview-content">
                      <p className="character-bio">{renderTextWithBreaks(selectedOC.backstory)}</p>
                      {selectedOC.details && selectedOC.details !== '.' && (
                        <p className="character-details">{renderTextWithBreaks(selectedOC.details)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          {selectedOC.images && selectedOC.images.length > 0 && (
            <section className="boxy-window p-0" style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
              <div className="boxy-window-title p-4 w-full">
                <h2 className="text-rose-900 font-bold text-xl">Gallery</h2>
              </div>
              
              <div className="p-4">
                <p className="text-rose-700 text-sm mb-4 italic">
                  Any items from the gallery featuring {selectedOC.name}, regardless of world setting will be included.
                </p>
                
                <div className="oc-image-gallery">
                  {selectedOC.images.map((image, index) => (
                    <div key={image.id || index} className="gallery-item">
                      <div className="gallery-image-wrapper" onClick={() => openModal(image)}>
                        <img 
                          src={require(`../${image.src}`)}
                          alt={image.alt}
                          className="gallery-thumbnail"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      </div>
                      <div className="gallery-item-info">
                        <h4 className="gallery-item-title">{image.alt}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Image Modal */}
        {modalImage && (
          <div className="image-modal-overlay" onClick={closeModal}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeModal}>×</button>
              <div className="modal-image-container">
                <img 
                  src={require(`../${modalImage.src}`)}
                  alt={modalImage.alt}
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="modal-description">
                <h3 className="modal-title">{modalImage.alt}</h3>
                <p className="modal-text">{renderTextWithBreaks(modalImage.description)}</p>
              </div>
            </div>
          </div>
        )}
      </Layout>
    );
  }

  // Default grid view
  return (
    <Layout header={header} nav={<Navigation />}>
      <div className="site-content-grid">
        <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
          <div className="boxy-window-title p-4 w-full">
            <h2 className="text-rose-900 font-bold text-xl">My Characters</h2>
          </div>
          
          <div className="p-6">
            <p className="text-rose-700 text-sm mb-6 italic">
              There's not many but I love them all
            </p>
            
            <div className="character-grid">
              {ocsData.map((oc) => (
                <div 
                  key={oc.id} 
                  className="character-card"
                  onClick={() => selectOC(oc)}
                >
                  <div className="character-image-container">
                    <img 
                      src={require(`../${oc.mainImage}`)} 
                      alt={oc.name}
                      className="character-grid-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                  <h3 className="character-name">{oc.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OCGallery;