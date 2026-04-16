"use client"

import { bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TopAuthorChart({ authors }) {
    const authorData = {
        labels: authors.map(author => author.name),
        datasets: [{
            label: "Number of Books",
            data: authors.map(author => author.amountOfBooks),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        }]
    };
}