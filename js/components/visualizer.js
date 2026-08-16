// js/components/visualizer.js
export class WaveformVisualizer {
    constructor(audioContext, sourceNode, canvasElement) {
        this.ctx = audioContext;
        this.canvas = canvasElement;
        this.canvasCtx = this.canvas.getContext('2d');
        
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
        sourceNode.connect(this.analyser);
        
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        
        this.draw = this.draw.bind(this);
        this.draw();
    }

    draw() {
        requestAnimationFrame(this.draw);
        this.analyser.getByteTimeDomainData(this.dataArray);

        this.canvasCtx.fillStyle = '#0a0a0c';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = '#ff5e00';
        this.canvasCtx.beginPath();

        const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = (v * this.canvas.height) / 2;

            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.canvasCtx.stroke();
    }
}