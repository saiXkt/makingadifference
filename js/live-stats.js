// FAO Global Forest Resources Assessment 2025
// Annual net forest loss: 4.12 million hectares/year (2015–2025)

const hectaresPerYear = 4_120_000;
const hectaresPerSecond =
    hectaresPerYear / (365 * 24 * 60 * 60);

const counter = document.getElementById("liveForestLoss");

const startTime = Date.now();

function updateForestLoss() {
    const secondsElapsed = (Date.now() - startTime) / 1000;
    const hectaresLost = secondsElapsed * hectaresPerSecond;

    counter.textContent = hectaresLost.toFixed(2);
}

updateForestLoss();
setInterval(updateForestLoss, 1000);