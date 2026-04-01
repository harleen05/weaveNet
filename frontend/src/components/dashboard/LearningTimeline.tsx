"use client"

import { motion } from "framer-motion"
import { Clock, Target, Zap, BookOpen } from "lucide-react"

interface LearningTimelineProps {
  missing: string[]
  adjacent: string[]
}

export default function LearningTimeline({ missing, adjacent }: LearningTimelineProps) {
  // Priority order: Adjacent first (quick wins), then critical gaps
  const quickWins = adjacent.slice(0, 2)
  const shortTerm = missing.filter(m => !adjacent.includes(m)).slice(0, 2)
  const mediumTerm = missing.slice(2, 4)
  const longTerm = missing.slice(4, 6)

  const phases = [
    {
      phase: "Quick Wins",
      duration: "2-3 Weeks",
      icon: Zap,
      color: "#4ade80",
      skills: quickWins,
      description: "Leverage existing knowledge",
    },
    {
      phase: "Foundation",
      duration: "1-2 Months",
      icon: BookOpen,
      color: "#facc15",
      skills: shortTerm,
      description: "Build core competencies",
    },
    {
      phase: "Specialization",
      duration: "2-3 Months",
      icon: Target,
      color: "#fb923c",
      skills: mediumTerm,
      description: "Deepen expertise",
    },
    {
      phase: "Mastery",
      duration: "3-6 Months",
      icon: Clock,
      color: "#f87171",
      skills: longTerm,
      description: "Advanced proficiency",
    },
  ].filter(p => p.skills.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <Clock className="w-5 h-5 text-[#7375db]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Learning Roadmap</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-yellow-400 to-red-400" />

        <div className="space-y-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="relative pl-14"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 w-4 h-4 rounded-full border-2 border-white/20"
                style={{ backgroundColor: phase.color }}
              />

              {/* Content */}
              <div className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <phase.icon className="w-4 h-4" style={{ color: phase.color }} />
                    <h3 className="text-white font-semibold text-sm">{phase.phase}</h3>
                  </div>
                  <span className="text-xs text-white/50">{phase.duration}</span>
                </div>
                <p className="text-white/60 text-xs mb-3">{phase.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md text-xs font-medium"
                      style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total time estimate */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-white/10 text-center"
      >
        <p className="text-white/60 text-sm">
          Estimated journey to <span className="text-[#7375db] font-semibold">80% match</span>
        </p>
        <p className="text-2xl font-bold text-white mt-1">
          {phases.length > 2 ? "3-6 Months" : "1-3 Months"}
        </p>
      </motion.div>
    </motion.div>
  )
}
