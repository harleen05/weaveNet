"use client"

import { motion } from "framer-motion"
import { Briefcase, TrendingUp, DollarSign, Users } from "lucide-react"

interface MarketInsightsProps {
  matched: string[]
  missing: string[]
  targetRole: string
}

export default function MarketInsights({ matched, missing, targetRole }: MarketInsightsProps) {
  const demandScore = matched.length * 10 + 20
  const salaryEstimate = matched.length >= 5 ? "$80k-$120k" : matched.length >= 3 ? "$60k-$90k" : "$40k-$70k"
  const competitionLevel = missing.length > 5 ? "Low" : missing.length > 3 ? "Medium" : "High"
  
  const metrics = [
    {
      icon: Briefcase,
      label: "Job Openings",
      value: "2.5k+",
      trend: "+12%",
      color: "#4ade80",
    },
    {
      icon: DollarSign,
      label: "Avg Salary",
      value: salaryEstimate,
      trend: "+8%",
      color: "#facc15",
    },
    {
      icon: Users,
      label: "Competition",
      value: competitionLevel,
      trend: missing.length > 5 ? "Low" : "High",
      color: missing.length > 5 ? "#4ade80" : "#f87171",
    },
    {
      icon: TrendingUp,
      label: "Growth",
      value: "High",
      trend: "+15%",
      color: "#7375db",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-[#7375db]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Market Insights</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
              <span className={`text-xs font-medium ${metric.trend.includes('+') ? 'text-green-400' : 'text-white/50'}`}>
                {metric.trend}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{metric.value}</p>
            <p className="text-white/50 text-xs">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Demand meter */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Market Demand</span>
          <span className="text-white font-medium">{Math.min(100, demandScore)}%</span>
        </div>
        <div className="h-3 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, demandScore)}%` }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-full rounded-full bg-gradient-to-r from-[#7375db] to-[#4ade80]"
          />
        </div>
        <p className="text-white/40 text-xs mt-2">
          Based on {targetRole} job postings in your region
        </p>
      </div>
    </motion.div>
  )
}
