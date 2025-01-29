"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { ArrowRight } from "lucide-react"

export default function UpdateModal({ initialData, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rank: initialData.rank,
      percentile: initialData.percentile,
      correctAnswers: initialData.correctAnswers,
    },
  })

  const onSubmit = (data) => {
    onUpdate({
      rank: Number.parseInt(data.rank),
      percentile: Number.parseInt(data.percentile),
      correctAnswers: Number.parseInt(data.correctAnswers),
    })
  }

  // Remove number input spinners
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      input[type=number]::-webkit-inner-spin-button, 
      input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
      input[type=number] { -moz-appearance: textfield; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Update scores</h2>
            <div className="relative w-8 h-8">
              <Image src="/images/html5.png" alt="HTML5 Logo" width={32} height={32} className="object-contain" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <label className="font-medium">Update your Rank</label>
              </div>
              <input
                type="number"
                {...register("rank", {
                  required: "Rank is required",
                  min: { value: 1, message: "Rank must be positive" },
                })}
                className={`w-full p-2 border rounded-md outline-none transition-colors ${
                  errors.rank ? "border-red-500" : "focus:border-blue-500"
                }`}
              />
              {errors.rank && <p className="mt-1 text-sm text-red-500">{errors.rank.message}</p>}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <label className="font-medium">Update your Percentile</label>
              </div>
              <input
                type="number"
                {...register("percentile", {
                  required: "Percentile is required",
                  min: { value: 0, message: "Percentile must be between 0 and 100" },
                  max: { value: 100, message: "Percentile must be between 0 and 100" },
                })}
                className={`w-full p-2 border rounded-md outline-none transition-colors ${
                  errors.percentile ? "border-red-500" : "focus:border-blue-500"
                }`}
              />
              {errors.percentile && <p className="mt-1 text-sm text-red-500">{errors.percentile.message}</p>}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                  3
                </span>
                <label className="font-medium">Update your Current Score (out of 15)</label>
              </div>
              <input
                type="number"
                {...register("correctAnswers", {
                  required: "Score is required",
                  min: { value: 0, message: "Score must be between 0 and 15" },
                  max: { value: 15, message: "Score must be between 0 and 15" },
                })}
                className={`w-full p-2 border rounded-md outline-none transition-colors ${
                  errors.correctAnswers ? "border-red-500" : "focus:border-blue-500"
                }`}
              />
              {errors.correctAnswers && <p className="mt-1 text-sm text-red-500">{errors.correctAnswers.message}</p>}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 transition-all ${
                  isValid ? "hover:bg-blue-700 hover:gap-3" : "opacity-50 cursor-not-allowed"
                }`}
              >
                save
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

