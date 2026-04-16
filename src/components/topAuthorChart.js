"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function TopAuthorChart({ authors }) {
  const authorData = {
    labels: authors.map((author) => author.name),
    datasets: [
      {
        label: "Number of Books",
        data: authors.map((author) => author.amountOfBooks),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Books",
        },
      },
      x: {
        title: {
          display: true,
          text: "Authors",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return <Bar data={authorData} options={chartOptions} />;
}
