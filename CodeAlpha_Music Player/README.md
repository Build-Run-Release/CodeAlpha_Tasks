# Modern Music Player

A sleek, responsive web-based music player built with HTML, CSS, and JavaScript.

## Features

*   **Play/Pause/Skip**: Full audio controls.
*   **Progress Bar**: Clickable progress bar to jump to specific times.
*   **Visuals**: Rotating album art animation when playing.
*   **Responsive**: Looks great on desktop and mobile.

## How to Add Music

Since this is a client-side player, you need to add your own audio files manually.

1.  Create a folder named `music` inside the `CodeAlpha_Music Player` directory.
2.  Add your `.mp3` files (e.g., `ukulele.mp3`, `hey.mp3`, `summer.mp3`).
3.  Open `script.js` and update the `songs` array to match your filenames:

```javascript
const songs = [
    {
        name: 'your-file-name', // without extension
        displayName: 'Song Title',
        artist: 'Artist Name'
    },
    // ...
];
```

## How It's Built

*   **HTML5**: Semantic markup for the player structure.
*   **CSS3**: Flexbox for layout, CSS Variables for theming, and Keyframe animations for the rotating disc.
*   **JavaScript**: Validates audio events (`timeupdate`, `ended`) and manages the state (play/pause, index).

## Usage

Open `index.html` in your browser to start the player.
