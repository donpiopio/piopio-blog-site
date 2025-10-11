import Home from './pages/home';
import AboutMe from './pages/aboutme';
import Interests from './pages/Interests';
import Projects from './pages/Projects';
import Guestbook from './pages/Guestbook';
import MusicPlayer from './pages/MusicPlayer';
import Resume from './pages/Resume';
import Connect from './pages/Connect';
import Buttons from './pages/Buttons';
import OCGallery from './pages/OCGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/oc-gallery" element={<OCGallery />} />
        </Routes>
        <MusicPlayer />
      </Router>
    </div>
  );
}

export default App;
