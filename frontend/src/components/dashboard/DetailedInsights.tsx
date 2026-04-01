"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, Target, Clock } from "lucide-react"

interface DetailedInsightsProps {
  score: number
  matched: string[]
  missing: string[]
  targetRole: string
}

export default function DetailedInsights({ score, matched, missing, targetRole }: DetailedInsightsProps) {
  const getLevel = (score: number) => {
    if (score >= 80) return { label: "Expert", color: "#4ade80", icon: Award }
    if (score >= 60) return { label: "Proficient", color: "#facc15", icon: TrendingUp }
    if (score >= 40) return { label: "Intermediate", color: "#fb923c", icon: Target }
    return { label: "Beginner", color: "#f87171", icon: Clock }
  }

  const level = getLevel(score)
  const LevelIcon = level.icon

  const insights = [
    {
      title: "Profile Strength",
      value: `${score}%`,
      subtitle: level.label,
      color: level.color,
      description: score >= 60 
        ? "Strong foundation for the role" 
        : "Significant growth opportunity",
    },
    {
      title: "Skill Coverage",
      value: `${matched.length}`,
      subtitle: "Verified Skills",
      color: "#4ade80",
      description: `Matching ${Math.round((matched.length / (matched.length + missing.length)) * 100)}% of requirements`,
    },
    {
      title: "Growth Areas",
      value: `${missing.length}`,
      subtitle: "Skills to Acquire",
      color: "#f87171",
      description: `Estimated ${missing.length > 5 ? "6+ months" : "3-6 months"} to close gaps`,
    },
    {
      title: "Role Fit",
      value: score >= 70 ? "High" : score >= 50 ? "Medium" : "Low",
      subtitle: "Compatibility",
      color: score >= 70 ? "#4ade80" : score >= 50 ? "#facc15" : "#f87171",
      description: score >= 70 
        ? "Excellent match for the role" 
        : score >= 50 
          ? "Good potential with development" 
          : "Consider alternative roles",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <LevelIcon className="w-5 h-5 text-[#7375db]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Detailed Insights</h2>
          <p className="text-white/50 text-sm">{targetRole} Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-white/60 text-xs">{insight.title}</span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: insight.color }}
              />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-white">{insight.value}</span>
              <span className="text-xs text-white/50">{insight.subtitle}</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">{insight.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Journey to Expert</span>
          <span className="text-white font-medium">{score}%</span>
        </div>
        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-full rounded-full bg-gradient-to-r from-[#7375db] to-[#8b8deb]"
          />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-2">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Proficient</span>
          <span>Expert</span>
        </div>
      </div>
    </motion.div>
  )
}
