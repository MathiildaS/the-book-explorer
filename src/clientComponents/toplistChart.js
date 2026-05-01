/**
 * @file Creates the chart component displaying top authors or categories.
 * @module clientComponents/toplistChart.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

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

/**
 * Creates the chart component displaying top authors or categories.
 * Toggles between displaying top authors and categories based on user selection and allows users to click on bars in the chart to filter books by the selected author or category.
 * 
 * @param {object} authors|categories - props containing the data of the top authors and categories to be displayed in the chart.
 * @returns {JSX.Element} An interactive bar chart component.
 */
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
        backgroundColor: "#C8A97E",
        hoverBackgroundColor: "#A0522D",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    onHover: (event, elements) => {
      const target = event.native?.target;
      if (!target) return;

      target.style.cursor = elements.length ? "pointer" : "default";
    },
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
    layout: {
      padding: {
        bottom: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "#7C5C3E",
        },
        title: {
          display: true,
          text: "Number of Books",
          font: { size: 13, weight: "500" },
          color: "#7C5C3E",
        },
        ticks: {
          font: { size: 12 },
          color: "#6B4F3A",
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "#7C5C3E",
        },
        title: {
          display: true,
          text: chartToDisplay === "authors" ? "Authors" : "Categories",
          font: { size: 13, weight: "500" },
          color: "#7C5C3E",
          padding: { top: 12 },
        },
        ticks: {
          font: { size: 10 },
          color: "#374151",
          maxRotation: 35,
          minRotation: 35,
          autoSkip: false,
        },
      },
    },
    plugins: {
      tooltip: {
        padding: 10,
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
    <div className="rounded-2xl" style={{ background: "transparent" }}>
      <h2 className="mb-4">
        Top 10 {chartToDisplay === "authors" ? "Authors" : "Categories"}
      </h2>

      <div className="mb-6 inline-flex gap-1 rounded-full bg-[var(--surface)] p-1">
        {["authors", "categories"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelectedChart(option)}
            className={`px-5 py-2 rounded-full text-sm transition ${
              chartToDisplay === option
                ? "bg-[var(--accent-dark)] text-[var(--background)]"
                : "text-[var(--accent-dark)] hover:text-[var(--hover)]"
            }`}
          >
            {option === "authors" ? "Authors" : "Categories"}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        Click on a bar in the chart to display books from an author or within a
        category.
      </p>

      <div style={{ height: 450 }}>
        <Bar
          data={chartData}
          options={{ ...chartOptions, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
