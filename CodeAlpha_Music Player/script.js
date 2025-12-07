const musicContainer = document.querySelector('.player-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currTime = document.getElementById('curr-time');
const durTime = document.getElementById('dur-time');
const musicUpload = document.getElementById('music-upload');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
const playlist = document.getElementById('playlist');

// Song titles
let songs = [
    {
        name: 'ukulele',
        displayName: 'Ukulele',
        artist: 'Bensound',
        source: 'music/ukulele.mp3'
    },
    {
        name: 'hey',
        displayName: 'Hey',
        artist: 'Bensound',
        source: 'music/hey.mp3'
    },
    {
        name: 'summer',
        displayName: 'Summer',
        artist: 'Bensound',
        source: 'music/summer.mp3'
    }
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);
renderPlaylist();

// Update song details
function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    audio.src = song.source;
    cover.src = 'images/cover.png';
    updatePlaylistHighlight();
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
        durTime.innerText = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currTime.innerText = `${currentMinutes}:${currentSeconds}`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Playlist Functions
function renderPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = song.displayName;
        if (index === songIndex) {
            li.classList.add('active');
        }
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlist.appendChild(li);
    });
}

function updatePlaylistHighlight() {
    const items = playlist.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress);

// Upload functionality
musicUpload.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        songs = []; // Clear current playlist
        for (const file of files) {
            const objectURL = URL.createObjectURL(file);
            songs.push({
                name: file.name,
                displayName: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                artist: 'Uploaded Music',
                source: objectURL
            });
        }

        songIndex = 0;
        loadSong(songs[songIndex]);
        playSong();
        renderPlaylist();
    }
});

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value;
    if (value == 0) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.add('fa-volume-up');
        volumeIcon.classList.remove('fa-volume-mute');
    }
});
