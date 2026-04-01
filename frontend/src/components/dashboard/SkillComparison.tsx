"use client"

import { motion } from "framer-motion"
import { TrendingUp, BarChart3, Activity } from "lucide-react"

interface SkillComparisonProps {
  matched: string[]
  missing: string[]
  targetRole: string
}

export default function SkillComparison({ matched, missing, targetRole }: SkillComparisonProps) {
  // Market demand simulation
  const marketData = [
    { category: "Current", value: matched.length * 10, color: "#4ade80" },
    { category: "Target", value: (matched.length + missing.length) * 10, color: "#7375db" },
    { category: "Gap", value: missing.length * 10, color: "#f87171" },
  ]

  const maxValue = Math.max(...marketData.map(d => d.value))

  const skillCategories = [
    { name: "Core Skills", match: Math.min(100, matched.length * 15), total: 100 },
    { name: "Frameworks", match: Math.min(100, matched.length * 12), total: 100 },
    { name: "Tools", match: Math.min(100, matched.length * 8), total: 100 },
    { name: "Soft Skills", match: 70, total: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <BarChart3 className="w-5 h-5 text-[#7375db]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Competency Analysis</h2>
      </div>

      {/* Comparison bars */}
      <div className="space-y-4 mb-6">
        {marketData.map((item, i) => (
          <div key={item.category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">{item.category}</span>
              <span className="text-white font-medium">{item.value}%</span>
            </div>
            <div className="h-3 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-white/70 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Category Breakdown
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-black/30 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">{cat.name}</span>
                <span className={`text-xs font-medium ${
                  cat.match >= 70 ? "text-green-400" : cat.match >= 40 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {cat.match}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.match}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  className={`h-full rounded-full ${
                    cat.match >= 70 ? "bg-green-400" : cat.match >= 40 ? "bg-yellow-400" : "bg-red-400"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trend indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 p-3 bg-[#7375db]/10 rounded-lg flex items-center gap-3"
      >
        <TrendingUp className="w-5 h-5 text-[#7375db]" />
        <div>
          <p className="text-white text-sm font-medium">Growth Potential</p>
          <p className="text-white/60 text-xs">
            Closing {missing.length} gaps could increase match by {Math.round(missing.length * 8)}%
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
