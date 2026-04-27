"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function ToplistChart({ authors, categories }) {
  const router = useRouter();
  const searchParameters = useSearchParams();

  const [chartToDisplay, setSelectedChart] = useState("authors");

  let itemsInChart;

  if (chartToDisplay === "authors") {
    itemsInChart = authors;
  } else {
    itemsInChart = categories;
  }

  const labels = itemsInChart.map((item) => item.name);
  const amountOfBooks = itemsInChart.map((item) => item.amountOfBooks);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Books",
        data: amountOfBooks,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedElementIndex = elements[0].index;
        const clickedAuthorOrCategory = itemsInChart[clickedElementIndex];

        const currentSearchParams = new URLSearchParams(
          searchParameters.toString(),
        );

        if (chartToDisplay === "authors") {
          currentSearchParams.set("authorId", clickedAuthorOrCategory.id);
          currentSearchParams.set("authorBookPage", "0");

          currentSearchParams.delete("categoryId");
          currentSearchParams.delete("categoryBookPage");
        }

        if (chartToDisplay === "categories") {
          currentSearchParams.set("categoryId", clickedAuthorOrCategory.id);
          currentSearchParams.set("categoryBookPage", "0");

          currentSearchParams.delete("authorId");
          currentSearchParams.delete("authorBookPage");
        }
        router.push(`/dashboard?${currentSearchParams.toString()}`);
      }
    },
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
          text: chartToDisplay === "authors" ? "Authors" : "Categories",
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
  return (
  <div>
      <div className="mb-4 flex gap-2">
        <button type="button" onClick={() => setSelectedChart("authors")}>
          Authors
        </button>

        <button type="button" onClick={() => setSelectedChart("categories")}>
          Categories
        </button>
      </div>

      <Bar data={chartData} options={chartOptions} />

      <p className="mt-3 text-xs text-zinc-500">
        Click a bar to show books for that author or category.
      </p>
    </div>
  );
}
