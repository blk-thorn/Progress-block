import { ProgressBlock } from './modules/progress-block/ProgressBlock.js';
import { ProgressBar } from './modules/progress-bar/ProgressBar.js';

export class App {
    constructor() {
        this.progressBlock = new ProgressBlock();
        this.progressBar = new ProgressBar();
    }

    render() {
        this.progressBlock.render();
        setTimeout(() => {
            this.progressBar.init();
        }, 0);
    }
}