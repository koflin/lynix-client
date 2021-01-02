function randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }
  
  // Charts page
  
  export const chartBarStackedData = {
    
    data: {
      labels: ["Boot 300", "Boot 210", "Boot 100", "Boot 10", "Segel Boot 75", "Segel Boot 50"],
      datasets: [
        {
            label: "not assined",
            backgroundColor: '#fb6340',
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ]
          },
        {
          label: "not started",
          backgroundColor: '#00A0D2',
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ]
        },
        
        {
          label: "in progress",
          backgroundColor: '#144b96',
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ]
        },
        {
          label: "finished this month",
          backgroundColor: '#2dce89',
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ]
        }
      ]
    }
  };
  
  