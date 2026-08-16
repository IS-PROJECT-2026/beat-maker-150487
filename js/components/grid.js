// js/components/grid.js
export class SequencerGrid {
    constructor(containerElement, tracks = ['Kick', 'Snare', 'Hi-Hat', 'Synth']) {
        this.container = containerElement;
        this.tracks = tracks;
        this.steps = 16;
        // 2D Array: tracks x 16 steps
        this.state = Array.from({ length: this.tracks.length }, () => Array(this.steps).fill(false));
        this.render();
    }

    render() {
        this.container.innerHTML = '';

        this.tracks.forEach((trackName, trackIdx) => {
            const row = document.createElement('div');
            row.className = 'track-row';

            const label = document.createElement('span');
            label.className = 'track-label';
            label.textContent = trackName;
            row.appendChild(label);

            const stepsContainer = document.createElement('div');
            stepsContainer.className = 'steps-container';

            for (let stepIdx = 0; stepIdx < this.steps; stepIdx++) {
                const pad = document.createElement('button');
                pad.className = `pad ${stepIdx % 4 === 0 ? 'beat-marker' : ''}`;
                pad.dataset.track = trackIdx;
                pad.dataset.step = stepIdx;

                pad.addEventListener('click', () => {
                    this.state[trackIdx][stepIdx] = !this.state[trackIdx][stepIdx];
                    pad.classList.toggle('active', this.state[trackIdx][stepIdx]);
                });

                stepsContainer.appendChild(pad);
            }

            row.appendChild(stepsContainer);
            this.container.appendChild(row);
        });
    }

    highlightStep(currentStep) {
        const allPads = this.container.querySelectorAll('.pad');
        allPads.forEach(pad => {
            if (parseInt(pad.dataset.step, 10) === currentStep) {
                pad.classList.add('playing');
            } else {
                pad.classList.remove('playing');
            }
        });
    }

    clearHighlights() {
        const allPads = this.container.querySelectorAll('.pad');
        allPads.forEach(pad => pad.classList.remove('playing'));
    }
}