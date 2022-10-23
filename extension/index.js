import { Chart, registerables } from "./lib/dist/chart.js";

let queryOptions = { active: true, lastFocusedWindow: true };
chrome.tabs.query(queryOptions).then(([tab]) => {
    if (tab) {
        chrome.runtime.sendMessage({
            message: 'request_percent_data',
            tabId: tab.id,
        }, (response) => {
            updateUI(response.data)
        });
    }
});

function updateUI(percent_data) {
    document.getElementById("data").innerText = JSON.stringify(percent_data);
}

let category = "calories";
const labels = [
  "Total " + category,
  category,
  // category is taken from python dict returned from calculate_percent()
];

function createChart(id, percent, color, category) {
  let canvas = document.getElementById(id);
  const labels = [category, ""];
  const data = {
    labels: labels,
    datasets: [
      {
        label: category,
        backgroundColor: [color, "rgb(192, 192, 192)"],
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        cutout: "65%",
        data: [percent * 100, 100 - percent * 100],
        // percent is percent from python dict returned from calculate_percent()
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: category,
        },
      },
    },
  };
  return new Chart(canvas, config);
}

Chart.register(...registerables);

const calorieChart = createChart("calorieChart", 0.5, "rgb(255, 99, 132)", "Calories");
const proteinChart = createChart("proteinChart", 0.5, "rgb(255, 99, 132)", "Protein");
const carbChart = createChart("carbChart", 0.5, "rgb(255, 99, 132)", "Carbs");
const fatChart = createChart("fatChart", 0.5, "rgb(255, 99, 132)", "Fat");
