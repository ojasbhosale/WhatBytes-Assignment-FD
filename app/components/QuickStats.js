"use client"
import { motion } from "framer-motion"
import { Trophy, FileText, CheckCircle } from "lucide-react"

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

export default function QuickStats({ stats }) {
  const statItems = [
    {
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      value: stats.rank,
      label: "YOUR RANK",
    },
    {
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      value: `${stats.percentile}%`,
      label: "PERCENTILE",
    },
    {
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      value: `${stats.correctAnswers}/${stats.totalQuestions}`,
      label: "CORRECT ANSWERS",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <h2 className="text-xl font-semibold mb-6">Quick Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="flex items-center gap-4"
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-2xl font-bold"
              >
                {item.value}
              </motion.div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

