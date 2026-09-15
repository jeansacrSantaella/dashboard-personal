"use client";

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export interface RadarMetric {
  area: string;
  score: number; // 0 - 100
  target: number;
}

interface Props {
  metrics: RadarMetric[];
}

export function SecurityRadarChart({ metrics }: Props) {
  const data = {
    labels: metrics.map((m) => m.area),
    datasets: [
      {
        label: "Puntuación Actual",
        data: metrics.map((m) => m.score),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
      },
      {
        label: "Objetivo Cumplimiento",
        data: metrics.map((m) => m.target),
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "rgba(16, 185, 129, 0.8)",
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(120, 120, 120, 0.2)" },
        grid: { color: "rgba(120, 120, 120, 0.2)" },
        pointLabels: {
          color: "#888888",
          font: { size: 11, weight: 600 },
        },
        ticks: {
          display: false,
          max: 100,
          min: 0,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Radar data={data} options={options} />
    </div>
  );
}
