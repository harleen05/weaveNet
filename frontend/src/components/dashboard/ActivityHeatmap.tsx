"use client"

import { motion } from "framer-motion"
import { GitCommit, Calendar, Flame } from "lucide-react"

interface ActivityHeatmapProps {
  publicRepos: number
}

export default function ActivityHeatmap({ publicRepos }: ActivityHeatmapProps) {
  // Generate mock activity data
  const weeks = 12
  const days = 7
  const activityLevels = [0, 1, 2, 3, 4]

  const getActivityColor = (level: number) => {
    const colors = [
      "bg-white/5",
      "bg-[#7375db]/20",
      "bg-[#7375db]/40",
      "bg-[#7375db]/60",
      "bg-[#7375db]",
    ]
    return colors[level]
  }

  const totalContributions = publicRepos * 12 + Math.floor(Math.random() * 50)
  const streak = Math.min(publicRepos * 2, 30)
  const activeDays = Math.floor(totalContributions * 0.7)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#7375db]/20 rounded-lg">
            <GitCommit className="w-5 h-5 text-[#7375db]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Activity Overview</h2>
            <p className="text-white/50 text-sm">Based on repository data</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-orange-400">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-medium">{streak} day streak</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-black/30 rounded-xl">
          <p className="text-xl font-bold text-[#7375db]">{totalContributions}</p>
          <p className="text-white/50 text-xs">Total Activity</p>
        </div>
        <div className="text-center p-3 bg-black/30 rounded-xl">
          <p className="text-xl font-bold text-green-400">{activeDays}</p>
          <p className="text-white/50 text-xs">Active Days</p>
        </div>
        <div className="text-center p-3 bg-black/30 rounded-xl">
          <p className="text-xl font-bold text-yellow-400">{publicRepos}</p>
          <p className="text-white/50 text-xs">Repositories</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-white/40" />
          <span className="text-white/40 text-xs">Last 3 months</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {Array.from({ length: days }).map((_, dayIdx) => {
                const activityLevel = Math.floor(Math.random() * 5)
                return (
                  <motion.div
                    key={dayIdx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + weekIdx * 0.02 + dayIdx * 0.01 }}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(activityLevel)}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">Less</span>
        <div className="flex gap-1">
          {activityLevels.map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
            />
          ))}
        </div>
        <span className="text-white/40">More</span>
      </div>
    </motion.div>
  )
}
