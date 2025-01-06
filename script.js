// Converts English numerals to Bengali numerals
function convertToBengaliNumerals(number) {
  const englishToBengaliMap = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  };
  return number.toString().split('').map(digit => englishToBengaliMap[digit] || digit).join('');
}

// Updates the year dynamically in Bengali numerals
function updateYear() {
  const yearElements = document.querySelectorAll('.current-year');

  const currentYear = new Date().getFullYear();
  const yearInBengali = convertToBengaliNumerals(currentYear);

  // Update all elements with the class 'current-year'
  yearElements.forEach((element) => {
    element.textContent = yearInBengali;
  });
}

// Calculates year progress as passed and remaining percentages
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

// Updates the progress percentage display
function updateProgress() {
  const percentageElements = document.querySelectorAll('.percentage-value');

  // Calculate year progress
  const { passed } = calculateYearProgress();
  const passedInBengali = convertToBengaliNumerals(passed);

  // Update all elements with the new percentage
  percentageElements.forEach((element) => {
    element.textContent = `${passedInBengali}%`;
  });
}

// Draws the Google Chart for year progress
function drawChart() {
  const { passed, remaining } = calculateYearProgress();

  const data = google.visualization.arrayToDataTable([
    ['Category', 'Percentage'],
    ['অতিবাহিত সময়', parseFloat(passed)],
    ['অবশিষ্ট সময়', parseFloat(remaining)],
  ]);

  const options = {
    pieHole: 0.5,
    colors: ['#E0E0E0', '#128425'], // Custom colors
    legend: { position: 'bottom' },
    pieSliceText: 'percentage',
    fontName: 'Noto Serif Bengali',
    pieSliceTextStyle: { color: 'white' },
    animation: { startup: true, duration: 1000, easing: 'out' }, // Add animation
  };

  const chart = new google.visualization.PieChart(document.getElementById('donut_single'));
  chart.draw(data, options);
}

// Initialize and periodically update progress
function initialize() {
  updateYear();
  updateProgress();
  drawChart();

  // Update every minute
  setInterval(() => {
    updateProgress();
    drawChart();
  }, 60000);
}

// Load Google Charts and initialize app
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(initialize);
