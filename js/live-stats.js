const hectaresPerYear = 10900000;
const hectaresPerSecond = hectaresPerYear / 365 / 24 / 60 / 60;

const counter = document.getElementById("liveForestLoss");

if (counter) {
    const startTime = Date.now();

    setInterval(() => {
        const secondsElapsed = (Date.now() - startTime) / 1000;
        const hectaresLost = secondsElapsed * hectaresPerSecond;

        counter.textContent = hectaresLost.toFixed(2);
    }, 100);
}
