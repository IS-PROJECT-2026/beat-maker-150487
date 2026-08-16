// js/audio/scheduler.js
export class StepScheduler {
    constructor(audioContext, onStepCallback) {
        this.ctx = audioContext;
        this.onStep = onStepCallback;
        this.bpm = 140;
        this.currentStep = 0;
        this.timerId = null;
    }

    setBpm(newBpm) {
        this.bpm = newBpm;
        if (this.timerId) {
            this.stop();
            this.start();
        }
    }

    start() {
        this.currentStep = 0;
        const intervalMs = (60 / this.bpm / 4) * 1000;
        this.onStep(this.currentStep);
        this.currentStep = (this.currentStep + 1) % 16;
        this.timerId = setInterval(() => {
            this.onStep(this.currentStep);
            this.currentStep = (this.currentStep + 1) % 16;
        }, intervalMs);
    }

    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}