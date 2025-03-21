export class ProgressBar {
    constructor() {
        this.rotationAngle = -90;
        this.isAnimating = false;
        this.animationFrameId = null;
    }

    init() {
        this.circle = document.getElementById("circle");
        this.input = document.getElementById("input");
        this.progressDisplay = document.getElementById("display");
        this.animateCheckbox = document.getElementById("animate-checkbox");
        this.hideCheckbox = document.getElementById("hide-checkbox");
        this.svgBlock = document.getElementById("svg-block");
        this.svgOuter = document.getElementById("svg-outer");
        this.svgInner = document.getElementById("svg-inner");

        this.circleRadius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.circleRadius;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference.toString();

        setTimeout(() => {
            this.setProgress(parseInt(this.input.value, 10));
        }, 300);

        this.input.addEventListener("input", () => {
            const newValue = parseInt(this.input.value, 10);
            if (newValue >= 0 && newValue <= 100) {
                this.setProgress(newValue);
            }
        });

        this.animateCheckbox.addEventListener("change", () => {
            if (this.animateCheckbox.checked) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        });

        this.hideCheckbox.addEventListener("change", () => {
            if (this.hideCheckbox.checked) {
                this.hideElements();
            } else {
                this.showElements();
            }
        });
    }

    setProgress(percent) {
        const offset = this.circumference - (percent / 100) * this.circumference;
        this.progressDisplay.textContent = `${percent}%`;
        this.circle.style.strokeDashoffset = offset.toString();
    }

    startAnimation() {
        this.isAnimating = true;
        this.rotateCircle();
    }

    stopAnimation() {
        this.isAnimating = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        const startAngle = this.rotationAngle;
        const endAngle = -90;
        const duration = 1000;
        const startTime = performance.now();

        const resetAngle = (timestamp) => {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            this.rotationAngle = startAngle + (endAngle - startAngle) * progress;
            this.circle.style.transform = `rotate(${this.rotationAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(resetAngle);
            }
        };

        requestAnimationFrame(resetAngle);
    }

    rotateCircle() {
        this.rotationAngle += 1;
        if (this.rotationAngle >= 270) {
            this.rotationAngle = -90;
        }
        this.circle.style.transform = `rotate(${this.rotationAngle}deg)`;

        if (this.isAnimating) {
            this.animationFrameId = requestAnimationFrame(() => this.rotateCircle());
        }
    }

    hideElements() {
        this.svgBlock.style.opacity = "0";
        this.svgOuter.style.opacity = "0";
        this.svgInner.style.opacity = "0";
    }

    showElements() {
        this.svgBlock.style.opacity = "1";
        this.svgOuter.style.opacity = "1";
        this.svgInner.style.opacity = "1";
    }
}