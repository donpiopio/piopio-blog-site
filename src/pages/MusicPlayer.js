
import React, { useRef, useState, useEffect } from 'react';
import '../css/main.css';
import tracks from '../data/tracks.json';

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * tracks.length));
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player-container', {
        height: '0',
        width: '0',
        videoId: tracks[currentTrack].videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          autoplay: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };
    // eslint-disable-next-line
  }, []);

  // Update track when currentTrack changes
  useEffect(() => {
    if (playerReady && playerRef.current) {
      playerRef.current.cueVideoById(tracks[currentTrack].videoId);
      // Don't reset isPlaying here to allow for continuous play
      // setIsPlaying(false); 
      setCurrentTime(0);
      setTimeout(() => {
        setDuration(playerRef.current.getDuration());
        if (isPlaying || !autoplayBlocked) {
          playerRef.current.playVideo();
        }
      }, 500);
    }
    // eslint-disable-next-line
  }, [currentTrack, playerReady]);

  // Player event handlers
  function onPlayerReady(event) {
    setPlayerReady(true);
    playerRef.current.setVolume(volume * 100);
    setDuration(playerRef.current.getDuration());
    // Try autoplay on load
    const playPromise = playerRef.current.playVideo();
    // Detect autoplay block
    setTimeout(() => {
      const state = playerRef.current.getPlayerState();
      if (state !== window.YT.PlayerState.PLAYING) {
        setAutoplayBlocked(true);
      }
    }, 500);
  }

  function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.ENDED) {
      handleNext();
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setDuration(playerRef.current.getDuration());
      setAutoplayBlocked(false); // Autoplay is working
    } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.CUED) {
      setIsPlaying(false);
    }
  }

  // Progress bar update
  useEffect(() => {
    let interval = null;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current.getCurrentTime());
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handlers
  const handlePlayPause = () => {
    if (!playerReady) return;
    const state = playerRef.current.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      setAutoplayBlocked(false); // User initiated play
    }
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    // If the song is more than 3 seconds in, restart it. Otherwise, go to the previous track.
    if (currentTime > 3) {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
    } else {
      setCurrentTrack(prev => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    if (playerRef.current) playerRef.current.setVolume(e.target.value * 100);
  };

  const handleProgress = (e) => {
    if (!playerReady) return;
    const newTime = (e.target.value / 100) * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    // Ensure playback continues after seeking
    if (playerRef.current.getPlayerState() !== window.YT.PlayerState.PLAYING) {
      playerRef.current.playVideo();
    }
  };

  // Format time helper
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 p-4 border-t-2 border-rose-900 shadow-2xl bg-pink-300 music-player">
      <div id="youtube-player-container" style={{ display: 'none' }}></div>
      {autoplayBlocked && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <button
            className="px-8 py-4 rounded-lg bg-pink-400 text-rose-900 text-2xl font-bold shadow-lg border-2 border-rose-900 hover:bg-pink-300 transition"
            onClick={handlePlayPause}
          >
            Click to Play Music
          </button>
        </div>
      )}
      <div className="boxy-window flex flex-col p-3 w-full max-w-6xl mx-auto">
        <div className="w-full flex items-center space-x-2 text-rose-900 mb-3">
          <span className="text-sm w-8 text-left">{formatTime(currentTime)}</span>
          <div className="w-full relative flex items-center h-4 music-progress-container">
            <div className="music-progress-track">
              <div 
                className="music-progress-fill" 
                style={{width: `${duration ? (currentTime / duration) * 100 : 0}%`}}
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              step="0.1"
              className="w-full absolute top-0 left-0 music-progress-bar"
              onChange={handleProgress}
            />
          </div>
          <span className="text-sm w-8 text-right">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-between w-full relative">
          <div className="flex items-center space-x-3 flex-shrink min-w-0 max-w-[40%]">
            <img src={require(`../${tracks[currentTrack].imageSrc}`)} alt="Track Art" className="w-10 h-10 object-cover border-2 border-rose-900 shadow-md" />
            <div className="text-rose-900 overflow-hidden">
              <div className="text-lg font-bold truncate">{tracks[currentTrack].title}</div>
              <div className="text-sm truncate">{tracks[currentTrack].artist}</div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              className="text-rose-900 hover:text-rose-700 transition-colors duration-150 text-3xl"
              aria-label="Previous Track"
              onClick={handlePrev}
            >&lt;&lt;</button>
            <button
              className="text-rose-900 hover:text-rose-700 transition-colors duration-150 text-3xl"
              aria-label="Play/Pause"
              onClick={handlePlayPause}
            >{isPlaying ? '⏸' : '▶'}</button>
            <button
              className="text-rose-900 hover:text-rose-700 transition-colors duration-150 text-3xl"
              aria-label="Next Track"
              onClick={handleNext}
            >&gt;&gt;</button>
          </div>
          <div className="flex items-center space-x-2 text-rose-900 hidden sm:flex">
            <span className="text-xl">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              className="w-20 cursor-pointer accent-rose-700"
              onChange={handleVolume}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
