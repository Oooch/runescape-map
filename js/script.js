const mapImage = document.querySelector("#form-box-image");

let zoomLevel = 1;
let zoomStep = 0.5;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;
let dragging = false;

mapImage.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

mapImage.addEventListener('mousedown', (e) => {
    dragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
});

mapImage.addEventListener('mouseup', () => {
    dragging = false;
});

mapImage.addEventListener('mousemove', (e) => {
    if (dragging) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;
        xOffset += deltaX;
        yOffset += deltaY;
        initialX = e.clientX;
        initialY = e.clientY;
        setTransform(xOffset, yOffset);
    }
});

mapImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        ZoomIn();
    } else {
        ZoomOut();
    }
    setTransform(xOffset, yOffset);
});

function setTransform(x, y) {
    mapImage.style.transform = `translate(${x}px, ${y}px) scale(${zoomLevel})`;
}

function ZoomIn() {
    zoomLevel *= 1 + zoomStep;
    setTransform(xOffset, yOffset);            
}

function ZoomOut() {
    zoomLevel /= 1 + zoomStep;
    setTransform(xOffset, yOffset);
}