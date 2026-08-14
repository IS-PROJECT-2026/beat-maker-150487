// js/app.js
import { audioCtx, unlockAudio } from './audio/context.js';

let isPlaying = false;
const defaultBpm = 140; 

document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const tempoSlider = document.getElementById('tempo-slider');
    const tempoDisplay = document.getElementById('tempo-display');

    playBtn.addEventListener('click', () => {
        unlockAudio();
        
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? "Stop" : "Play / Pause";
        
        if (isPlaying) {
            console.log("Sequencer started at", defaultBpm, "BPM");
            
        }
    });

    tempoSlider.addEventListener('input', (e) => {
        tempoDisplay.textContent = `${e.target.value} BPM`;
    });
});