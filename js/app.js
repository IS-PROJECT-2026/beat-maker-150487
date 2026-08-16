// js/app.js
import { audioCtx, unlockAudio } from './audio/context.js';
import { FXEngine } from './components/fx.js';
import { SynthPresets } from './audio/synth.js';
import { WaveformVisualizer } from './components/visualizer.js';

let isPlaying = false;
const defaultBpm = 140; 

document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const tempoSlider = document.getElementById('tempo-slider');
    const tempoDisplay = document.getElementById('tempo-display');
    const fxEngine = new FXEngine(audioCtx);
    const synths = new SynthPresets(audioCtx, fxEngine.filter);

    const canvas = document.getElementById('oscilloscope');
    new WaveformVisualizer(audioCtx, fxEngine.filter, canvas);

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

    // FX Controls
    const cutoffKnob = document.getElementById('cutoff-knob');
    const resonanceKnob = document.getElementById('resonance-knob');

    cutoffKnob.addEventListener('input', (e) => {
        fxEngine.setCutoff(parseFloat(e.target.value));
    });

    resonanceKnob.addEventListener('input', (e) => {
        fxEngine.setResonance(parseFloat(e.target.value));
    });

    // Synth Triggers
    document.getElementById('btn-808').addEventListener('click', () => {
        unlockAudio();
        synths.play808Bass();
    });

    document.getElementById('btn-lead').addEventListener('click', () => {
        unlockAudio();
        synths.playLead(440); // A4 note
    });
});