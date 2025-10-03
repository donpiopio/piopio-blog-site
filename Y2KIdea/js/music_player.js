// --- YouTube API Loading ---
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const tracks = [
    { title: "Yokai Disco", artist: "Telan Devik", videoId: "xgOeKgGKuP0", imageSrc: "./images/songs/yokai_disco.jpg" }, 
    { title: "Machine Love (Instrumental)", artist: "JamieP", videoId: "eXtOI1tMnnE", imageSrc: "./images/songs/machine_love.jpg" },
    { title: "Sanasational (Instrumental)", artist: "T\"zalt", videoId: "GpIWpV09O40", imageSrc: "./images/songs/sans.jpeg" },
    { title: "DesktopBuddy", artist: "NANORAY", videoId: "6b_c_99GGcw", imageSrc: "./images/songs/desktopbuddy.jpeg" },
    { title: "GIGASOFT INDUSTRIES", artist: "HOTEL PARALLAX", videoId: "o4jkYTJAUS8", imageSrc: "./images/songs/gigasoft.jpg" },
    { title: "my room is upside down", artist: "Deathbrain", videoId: "Oq1UZDDnhrY", imageSrc: "./images/songs/upsidedown.jpg" },
];

// Calculate a random index based on the number of tracks
let currentTrackIndex = Math.floor(Math.random() * tracks.length);
let player;
let playerReady = false;
let progressBarInterval;

const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progressSlider = document.getElementById('progress-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const trackArt = document.getElementById('track-art');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
}

function updateProgressBar() {
    if (playerReady && player.getPlayerState() === YT.PlayerState.PLAYING) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        progressSlider.value = (currentTime / duration) * 100;
        currentTimeDisplay.textContent = formatTime(currentTime);
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player-container', {
        height: '0',
        width: '0',
        videoId: tracks[currentTrackIndex].videoId,
        playerVars: {
            'controls': 0,
            'disablekb': 1,
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1,
            'autoplay': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    player.setVolume(volumeSlider.value * 100);
    loadTrack(currentTrackIndex);
    setTimeout(() => {
        const duration = player.getDuration();
        durationDisplay.textContent = formatTime(duration);
    }, 500);
}

function onPlayerStateChange(event) {
    if (progressBarInterval) {
        clearInterval(progressBarInterval);
    }
    if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
    }
    if (event.data === YT.PlayerState.PLAYING) {
        playPauseBtn.innerHTML = '&#9208;';
        progressBarInterval = setInterval(updateProgressBar, 1000);
        const duration = player.getDuration();
        durationDisplay.textContent = formatTime(duration);
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.CUED) {
        playPauseBtn.innerHTML = '&#9654;';
    }
}

function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackArt.src = track.imageSrc;
    currentTimeDisplay.textContent = '0:00';
    progressSlider.value = 0;
    if (playerReady) {
        if (progressBarInterval) {
            clearInterval(progressBarInterval);
        }
        player.cueVideoById(track.videoId);
        setTimeout(() => {
            const duration = player.getDuration();
            durationDisplay.textContent = formatTime(duration);
        }, 500); 
    }
}

function playPause() {
    if (!playerReady) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (playerReady) {
        player.playVideo();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (playerReady) {
        player.playVideo();
    }
}

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

volumeSlider.addEventListener('input', () => {
    if (playerReady) {
        player.setVolume(volumeSlider.value * 100); 
    }
});

progressSlider.addEventListener('input', () => {
    if (!playerReady) return;
    const duration = player.getDuration();
    const newTime = (progressSlider.value / 100) * duration;
    player.seekTo(newTime, true);
    currentTimeDisplay.textContent = formatTime(newTime);
});

loadTrack(currentTrackIndex);

window.addEventListener('load', () => {
    const playerHeight = document.getElementById('music-player').offsetHeight;
    document.body.style.paddingBottom = `${playerHeight + 32}px`; 
});
