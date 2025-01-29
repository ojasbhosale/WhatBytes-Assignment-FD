'use client'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

export default function QuestionAnalysis({ correct = 0, total = 15 }) {
  // Ensure we have valid numbers and handle edge cases
  const safeCorrect = Number(correct) || 0
  const safeTotal = Number(total) || 15
  const percentage = Math.min(100, Math.max(0, (safeCorrect / safeTotal) * 100))

  // SVG circle properties
  const size = 192 // Size of the SVG (48 * 4)
  const center = size / 2
  const radius = 88
  const strokeWidth = 16
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Question Analysis</h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-blue-600 font-medium"
        >
          {safeCorrect}/{safeTotal}
        </motion.div>
      </div>
      
      <p className="text-gray-600 mb-8">
        You scored {safeCorrect} {safeCorrect === 1 ? 'question' : 'questions'} correct out of {safeTotal}.
        {safeCorrect < safeTotal && " However it still needs some improvements"}
      </p>

      <div className="relative w-48 h-48 mx-auto">
        {/* Background circle */}
        <svg 
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated progress circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#4F46E5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        
        {/* Center content */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            <Target className="w-12 h-12 text-red-500 mb-1" />
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="text-lg font-bold text-gray-900"
            >
              
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}