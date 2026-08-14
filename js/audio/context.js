// js/audio/context.js
const AudioContext = window.AudioContext || window.webkitAudioContext;
export const audioCtx = new AudioContext();

export function unlockAudio() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}