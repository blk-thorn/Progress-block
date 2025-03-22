export class ProgressBlock {
    render() {
        const section = document.createElement("section");
        section.classList.add("progress-block");

        const heading = document.createElement("h2");
        heading.classList.add("progress-block__heading");
        heading.textContent = "Progress";

        const content = document.createElement("div");
        content.classList.add("progress-block__content");

        const svgOuter = document.createElement("div");
        svgOuter.id = "svg-outer";
        svgOuter.classList.add("progress-block__outer");

        const svgInner = document.createElement("div");
        svgInner.id = "svg-inner";
        svgInner.classList.add("progress-block__inner");

        const display = document.createElement("div");
        display.id = "display";
        display.classList.add("progress-block__display");
        display.textContent = "0%";

        svgInner.appendChild(display);

        svgOuter.appendChild(svgInner);

        const svgBlock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgBlock.id = "svg-block";
        svgBlock.classList.add("progress-block__svg");
        svgBlock.setAttribute("width", "160");
        svgBlock.setAttribute("height", "160");

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.id = "gradient";
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "100%");

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("style", "stop-color:#5A7FA6; stop-opacity:1");

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("style", "stop-color:#4A90E2; stop-opacity:1");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svgBlock.appendChild(defs);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.id = "circle";
        circle.classList.add("progress-block__circle");
        circle.setAttribute("stroke-width", "20");
        circle.setAttribute("cx", "80");
        circle.setAttribute("cy", "80");
        circle.setAttribute("r", "70");
        circle.setAttribute("fill", "transparent");
        circle.setAttribute("stroke-linecap", "round");

        svgBlock.appendChild(circle);

        const control = document.createElement("div");
        control.classList.add("progress-block__control");

        const inputContainer = document.createElement("label");
        inputContainer.classList.add("input__container");

        const input = document.createElement("input");
        input.type = "number";
        input.id = "input";
        input.classList.add("progress-block__input");
        input.value = "0";
        input.min = "0";
        input.max = "100";
        input.setAttribute("autofocus", "");

        const inputText = document.createElement("span");
        inputText.classList.add("toggle-text");
        inputText.textContent = "Value";

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.id = "tooltip";
        tooltip.textContent = "Можно ввести только числа от 0 до 100";
        tooltip.style.display = "none";

        inputContainer.appendChild(tooltip);
        inputContainer.appendChild(input);
        inputContainer.appendChild(inputText);

        const animateSwitch = document.createElement("label");
        animateSwitch.classList.add("progress-block__switch");

        const animateCheckbox = document.createElement("input");
        animateCheckbox.type = "checkbox";
        animateCheckbox.id = "animate-checkbox";
        animateCheckbox.classList.add("progress-block__input");

        const animateSlider = document.createElement("span");
        animateSlider.classList.add("slider");

        const animateText = document.createElement("span");
        animateText.classList.add("toggle-text");
        animateText.textContent = "Animate";

        animateSwitch.appendChild(animateCheckbox);
        animateSwitch.appendChild(animateSlider);
        animateSwitch.appendChild(animateText);

        const hideSwitch = document.createElement("label");
        hideSwitch.classList.add("progress-block__switch");

        const hideCheckbox = document.createElement("input");
        hideCheckbox.type = "checkbox";
        hideCheckbox.id = "hide-checkbox";
        hideCheckbox.classList.add("progress-block__input");

        const hideSlider = document.createElement("span");
        hideSlider.classList.add("slider");

        const hideText = document.createElement("span");
        hideText.classList.add("toggle-text");
        hideText.textContent = "Hide";

        hideSwitch.appendChild(hideCheckbox);
        hideSwitch.appendChild(hideSlider);
        hideSwitch.appendChild(hideText);

        control.appendChild(inputContainer);
        control.appendChild(animateSwitch);
        control.appendChild(hideSwitch);

        content.appendChild(svgOuter);
        content.appendChild(svgBlock);
        content.appendChild(control);

        section.appendChild(heading);
        section.appendChild(content);

        document.body.appendChild(section);
    }
}