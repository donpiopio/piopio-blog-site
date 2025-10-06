
import Home from './pages/home';
import AboutMe from './pages/aboutme';
import Interests from './pages/Interests';
import MusicPlayer from './pages/MusicPlayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
        <MusicPlayer />
      </Router>
    </div>
  );
}

export default App;
