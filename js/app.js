import { audioCtx, unlockAudio } from './audio/context.js';
import { FXEngine } from './components/fx.js';
import { SynthPresets } from './audio/synth.js';
import { WaveformVisualizer } from './components/visualizer.js';
import { SequencerGrid } from './components/grid.js';
import { StepScheduler } from './audio/scheduler.js';

let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const tempoSlider = document.getElementById('tempo-slider');
    const tempoDisplay = document.getElementById('tempo-display');
    const gridContainer = document.getElementById('sequencer-grid');

    const fxEngine = new FXEngine(audioCtx);
    const synths = new SynthPresets(audioCtx, fxEngine.filter);
    const grid = new SequencerGrid(gridContainer);
    const canvas = document.getElementById('oscilloscope');
    new WaveformVisualizer(audioCtx, fxEngine.filter, canvas);

    const scheduler = new StepScheduler(audioCtx, (step) => {
        const time = audioCtx.currentTime;
        if (grid.state[0][step]) synths.playKick(time);
        if (grid.state[1][step]) synths.playSnare(time);
        if (grid.state[2][step]) synths.playHiHat(time);
        if (grid.state[3][step]) synths.playLead(440, time);
        grid.highlightStep(step);
    });

    playBtn.addEventListener('click', () => {
        unlockAudio();
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? "Stop" : "Play / Pause";
        if (isPlaying) {
            scheduler.start();
        } else {
            scheduler.stop();
            grid.clearHighlights();
        }
    });

    tempoSlider.addEventListener('input', (e) => {
        const bpm = parseInt(e.target.value, 10);
        tempoDisplay.textContent = `${bpm} BPM`;
        scheduler.setBpm(bpm);
    });

    const cutoffKnob = document.getElementById('cutoff-knob');
    const resonanceKnob = document.getElementById('resonance-knob');
    cutoffKnob.addEventListener('input', (e) => fxEngine.setCutoff(parseFloat(e.target.value)));
    resonanceKnob.addEventListener('input', (e) => fxEngine.setResonance(parseFloat(e.target.value)));

    document.getElementById('btn-808').addEventListener('click', () => {
        unlockAudio();
        synths.playKick();
    });

    document.getElementById('btn-lead').addEventListener('click', () => {
        unlockAudio();
        synths.playLead(440);
    });
});