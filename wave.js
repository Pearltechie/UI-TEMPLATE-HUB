// Description: Create a wave animation with bouncing glitter effect using the HTML5 canvas element.
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let waveOffset = 0;
const glitters = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 200; // Set the height of the canvas
}

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 50 * Math.sin((x / canvas.width) * 4 * Math.PI + waveOffset);
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#ff6a00';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function createGlitter() {
    const glitter = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 1,
        opacity: Math.random(),
        speedX: (Math.random() - 1) * 1,
        speedY: (Math.random() - 1) * 1
    };
    glitters.push(glitter);
}

function drawGlitters() {
    glitters.forEach(glitter => {
        ctx.beginPath();
        ctx.arc(glitter.x, glitter.y, glitter.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${glitter.opacity})`;
        ctx.fill();
    });
}

function updateGlitters() {
    glitters.forEach(glitter => {
        glitter.x += glitter.speedX;
        glitter.y += glitter.speedY;

        // Bounce off the edges
        if (glitter.x <= 0 || glitter.x >= canvas.width) glitter.speedX *= -10;
        if (glitter.y <= 0 || glitter.y >= canvas.height) glitter.speedY *= -10;
    });
}

function animateWave() {
    waveOffset += 0.05; // Adjust the speed of the wave
    drawWave();
    updateGlitters();
    drawGlitters();
    if (Math.random() < 0.1) { // Adjust the frequency of glitter creation
        createGlitter();
    }
    requestAnimationFrame(animateWave);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    drawWave();
});

resizeCanvas();
animateWave();
