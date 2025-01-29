"use client"
import { motion } from "framer-motion"

const barVariants = {
  hidden: { width: 0 },
  visible: (percentage) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  }),
}

export default function SyllabusAnalysis({ data = [] }) {
  // Add default empty array
  // Add guard clause for undefined or null data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Syllabus Wise Analysis</h2>
        <p className="text-gray-500">No syllabus data available</p>
      </div>
    )
  }

  const getColorClass = (percentage) => {
    if (percentage >= 80) return "bg-blue-500"
    if (percentage >= 60) return "bg-orange-500"
    if (percentage >= 40) return "bg-red-500"
    return "bg-green-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-6">Syllabus Wise Analysis</h2>
      <div className="space-y-6">
        {data.map((item, index) => (
          <motion.div
            key={index} // Changed to index since item.topic might be undefined
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-700">{item.topic || "Unknown Topic"}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-sm font-medium"
                style={{ color: item.percentage >= 80 ? "#3B82F6" : "#374151" }}
              >
                {item.percentage || 0}%
              </motion.span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                variants={barVariants}
                initial="hidden"
                animate="visible"
                custom={item.percentage || 0}
                className={`h-full rounded-full ${getColorClass(item.percentage || 0)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

