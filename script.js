const questions = [
    "What is your favorite hobby and why?",
    "Can you describe your ideal vacation?",
    "What is the best book you have ever read?",
    "If you could have dinner with any historical figure, who would it be and why?",
    "What is your favorite movie and what do you like about it?",
    "How do you usually spend your weekends?",
    "What is one skill you would like to learn and why?",
    "Can you tell me about a memorable experience you had recently?",
    "What do you enjoy most about your job or studies?",
    "What is your favorite type of music and why?"
];

const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const questionContainer = document.getElementById('question-container');
let angle = 0;
let spinning = false;

function drawWheel() {
    const numSegments = questions.length;
    const segmentAngle = 2 * Math.PI / numSegments;

    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, i * segmentAngle, (i + 1) * segmentAngle);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? '#FFDDC1' : '#FFABAB';
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((i + 0.5) * segmentAngle);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(questions[i], 240, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    const spinAngle = Math.random() * 10 + 10;
    const spinTime = 3000;
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < spinTime) {
            angle += spinAngle * (1 - elapsedTime / spinTime);
            angle %= 2 * Math.PI;
            ctx.clearRect(0, 0, wheel.width, wheel.height);
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(angle);
            ctx.translate(-250, -250);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const selectedSegment = Math.floor((angle / (2 * Math.PI)) * questions.length);
            questionContainer.textContent = questions[selectedSegment];
        }
    }

    animate();
}

drawWheel();
