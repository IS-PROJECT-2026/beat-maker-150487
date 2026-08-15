export class FXEngine {
    constructor(audioContext) {
        this.ctx = audioContext;
        this.filter = this.ctx.createBiquadFilter();
        
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 1000; 
        this.filter.Q.value = 1;            
        
        this.filter.connect(this.ctx.destination);
    }

    setCutoff(value) {
        this.filter.frequency.setTargetAtTime(value, this.ctx.currentTime, 0.1);
    }

    setResonance(value) {
        this.filter.Q.setTargetAtTime(value, this.ctx.currentTime, 0.1);
    }
}