function calculateYearProgress() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

  const elapsedTime = now - startOfYear;
  const totalTime = endOfYear - startOfYear;

  const passedPercentage = (elapsedTime / totalTime) * 100;
  return {
    passed: passedPercentage.toFixed(2),
    remaining: (100 - passedPercentage).toFixed(2),
  };
}

function updateProgressBar() {
  const progress = document.querySelector('.progress-bar');
  const percentageText = document.getElementById('percentage');

  const { passed } = calculateYearProgress();
  progress.style.width = `${passed}%`;
  progress.setAttribute('aria-valuenow', passed);
  percentageText.textContent = `${passed}%`;

  return parseFloat(passed);
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  const { passed, remaining } = calculateYearProgress();

  const data = google.visualization.arrayToDataTable([
    ['Category', 'Percentage'],
    ['অতিবাহিত সময়', parseFloat(passed)],
    ['অবশিষ্ট সময়', parseFloat(remaining)],
  ]);

  const options = {
    pieHole: 0.5,
    colors: ['#E0E0E0','#128425' ],
    legend: { position: 'bottom' },
    pieSliceText: 'percentage',
    fontName: 'Noto Serif Bengali',
    pieSliceTextStyle: { color: 'white' },
    animation: {
      startup: true, // Enable animation on load
      duration: 1500, // Duration of the animation in milliseconds
      easing: 'out', // Easing function for smooth effect
    },
  };

  const chart = new google.visualization.PieChart(document.getElementById('donut_single'));
  chart.draw(data, options);
}

// Initialize and update periodically
function initialize() {
  updateProgressBar();
  drawChart();

  // Update every minute
  setInterval(() => {
    updateProgressBar();
    drawChart();
  }, 60000);
}

initialize();
