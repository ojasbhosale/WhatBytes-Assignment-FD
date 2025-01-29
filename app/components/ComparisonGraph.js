"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function ComparisonGraph({ percentile }) {
  const chartRef = useRef(null)

  const data = {
    labels: Array.from({ length: 101 }, (_, i) => i),
    datasets: [
      {
        label: "Score Distribution",
        data: Array.from({ length: 101 }, (_, i) => {
          const x = i / 100
          return Math.exp(-(Math.pow(x - 0.7, 2) / 0.05)) * 100
        }),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        pointRadius: 2,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "rgb(99, 102, 241)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          display: false,
        },
      },
    },
  }

  // Add percentile marker
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current

      const drawPercentile = (ctx) => {
        const xScale = chart.scales.x
        const yScale = chart.scales.y
        const x = xScale.getPixelForValue(percentile)

        ctx.save()
        ctx.beginPath()
        ctx.setLineDash([5, 5])
        ctx.strokeStyle = "rgba(99, 102, 241, 0.5)"
        ctx.moveTo(x, yScale.top)
        ctx.lineTo(x, yScale.bottom)
        ctx.stroke()
        ctx.restore()

        // Draw label
        ctx.save()
        ctx.fillStyle = "rgb(107, 114, 128)"
        ctx.font = "12px Inter"
        ctx.textAlign = "center"
        ctx.fillText("your percentile", x, yScale.bottom + 20)
        ctx.restore()
      }

      chart.options.plugins.customPercentile = {
        afterDraw: drawPercentile,
      }

      chart.update()
    }
  }, [percentile])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-2">Comparison Graph</h2>
      <p className="text-gray-600 mb-6">
        You scored {percentile}% percentile which is {percentile > 72 ? "higher" : "lower"} than the average percentile
        72% of all the engineers who took this assessment
      </p>
      <div className="h-64">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </motion.div>
  )
}

