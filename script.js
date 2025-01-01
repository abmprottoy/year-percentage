function calculateYearProgress() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
  
    const elapsedTime = now - startOfYear;
    const totalTime = endOfYear - startOfYear;
  
    return (elapsedTime / totalTime) * 100;
  }
  
  function updateProgressBar() {
    const progress = document.querySelector('.progress-bar');
    const percentageText = document.getElementById('percentage');
  
    const progressPercentage = calculateYearProgress().toFixed(2);
    progress.style.width = `${progressPercentage}%`;
    progress.setAttribute('aria-valuenow', progressPercentage);
    percentageText.textContent = `${progressPercentage}%`;
  
    return progressPercentage;
  }
  
  function drawChart(progressPercentage) {
    const ctx = document.getElementById('yearProgressChart').getContext('2d');
  
    // Microsoft color palette
    const colors = {
      blue: '#0078D4',
      lightBlue: '#00BCF2',
      green: '#107C10',
      orange: '#FF8C00',
      purple: '#5C2D91',
    };
  
    const data = {
      datasets: [
        {
          data: [progressPercentage, 100 - progressPercentage],
          backgroundColor: [colors.blue, colors.lightBlue],
          hoverBackgroundColor: [colors.orange, colors.purple],
        },
      ],
      labels: ['Completed', 'Remaining'],
    };
  
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        cutout: '70%', // Creates a doughnut-style chart
      },
    });
  }
  
  // Initialize
  const progressPercentage = updateProgressBar();
  drawChart(progressPercentage);
  
  // Optional: Update every second (not strictly necessary but keeps data live)
  setInterval(() => {
    const updatedPercentage = updateProgressBar();
    drawChart(updatedPercentage);
  }, 60000); // Update every minute
  