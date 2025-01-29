"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MenuProvider } from "./context/MenuContext"
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import UpdateModal from "./components/UpdateModal"
import QuickStats from "./components/QuickStats"
import ComparisonGraph from "./components/ComparisonGraph"
import SyllabusAnalysis from "./components/SyllabusAnalysis"
import QuestionAnalysis from "./components/QuestionAnalysis"

// Initial state object
const initialStats = {
  rank: 4,
  percentile: 90,
  correctAnswers: 12,
  totalQuestions: 15,
  syllabusData: [
    { topic: "HTML Tools, Forms, History", percentage: 80 },
    { topic: "Tags & References in HTML", percentage: 60 },
    { topic: "Tables & References in HTML", percentage: 24 },
    { topic: "Tables & CSS Basics", percentage: 96 },
  ],
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false)
  const [stats, setStats] = useState(initialStats)

  const handleUpdate = (newStats) => {
    try {
      setStats((prev) => ({
        ...prev,
        ...newStats,
        // Ensure syllabusData remains unchanged if not provided in newStats
        syllabusData: newStats.syllabusData || prev.syllabusData,
      }))
      setShowModal(false)
    } catch (error) {
      console.error("Error updating stats:", error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <MenuProvider>
      <Topbar />
      <Sidebar />
      <div className="min-h-screen pt-16 md:pl-64">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Left Content */}
              <div className="flex-1">
                {/* HTML Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src="/images/html5.png"
                          alt="HTML5 Logo"
                          width={48}
                          height={48}
                          className="object-contain"
                          priority
                        />
                      </div>
                      <div>
                        <h1 className="text-xl md:text-2xl font-bold">Hyper Text Markup Language</h1>
                        <p className="text-sm md:text-base text-gray-600">
                          Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors md:w-auto"
                    >
                      Update
                    </button>
                  </div>
                </motion.div>

                <QuickStats stats={stats} />
                <ComparisonGraph percentile={stats.percentile} />
              </div>

              {/* Right Content */}
              <div className="lg:w-[400px] mt-6 lg:mt-0">
                <SyllabusAnalysis data={stats.syllabusData} />
                <div className="mt-6">
                  <QuestionAnalysis correct={stats.correctAnswers} total={stats.totalQuestions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <UpdateModal initialData={stats} onClose={() => setShowModal(false)} onUpdate={handleUpdate} />}
    </MenuProvider>
  )
}

