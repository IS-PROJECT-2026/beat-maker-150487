export class SynthPresets {
    constructor(audioContext, destination) {
        this.ctx = audioContext;
        this.destination = destination; 
    }

    play808Bass() {
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(50, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5); 

        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.connect(gain);
        gain.connect(this.destination);

        osc.start(time);
        osc.stop(time + 0.5);
    }

    playLead(frequency = 440) {
        const time = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth'; 
        osc.frequency.setValueAtTime(frequency, time);

        gain.gain.setValueAtTime(0.3, time);
        gain.gain.linearRampToValueAtTime(0, time + 0.3);

        osc.connect(gain);
        gain.connect(this.destination);

        osc.start(time);
        osc.stop(time + 0.3);
    }
}