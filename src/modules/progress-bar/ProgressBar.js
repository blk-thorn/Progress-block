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
        this.tooltip = document.getElementById("tooltip");

        this.circleRadius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.circleRadius;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference.toString();

        setTimeout(() => {
            this.setProgress(parseInt(this.input.value, 10));
        }, 300);

        this.input.addEventListener("input", () => {
            const inputValue = this.input.value;

            if (inputValue.startsWith("0") && inputValue.length > 1) {
                this.input.value = "0";
                this.input.value = inputValue.slice(0, 1);
                this.handleInputChange();
                this.showTooltip("Значение не может начинаться с нуля, кроме 0.");
                return;
            }

            if (parseInt(inputValue, 10) > 100) {
                this.input.value = inputValue.slice(0, -1);
                this.showTooltip();
                return;
            }

            if (inputValue.length > 3) {
                this.input.value = inputValue.slice(0, 3);
                this.showTooltip();
                return;
            }

            this.handleInputChange();
        });

        this.input.addEventListener("blur", () => this.hideTooltip());

        this.input.addEventListener("keydown", (event) => {
            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
            const isDigit = /^\d$/.test(event.key);

            if (event.key === ".") {
                event.preventDefault();
                return;
            }
        
            if (!isDigit && !allowedKeys.includes(event.key)) {
                event.preventDefault();
            }
        });

        this.animateCheckbox.addEventListener("change", () => {
            if (this.animateCheckbox.checked) {
                this.handleInputChange();
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

    handleInputChange() {
        const inputValue = this.input.value;
        const newValue = parseInt(inputValue, 10);

        if (newValue >= 0 && newValue <= 100) {
            this.setProgress(newValue);
            this.hideTooltip();

            if (this.animateCheckbox.checked) {
                this.startAnimation();
            }
        } else {
            this.showTooltip();

            this.stopAnimation();
        }
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

    showTooltip(message = "Можно ввести только числа от 0 до 100.") {
        this.tooltip.textContent = message;
        this.tooltip.style.display = "block";
        this.tooltip.style.position = "absolute";
    }

    hideTooltip() {
        this.tooltip.style.display = "none";
    }
}