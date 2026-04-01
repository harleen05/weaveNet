"use client"

import { motion } from "framer-motion"
import { Award, CheckCircle, Clock, Target } from "lucide-react"

interface AchievementProps {
  score: number
  matched: number
  missing: number
}

export default function Achievements({ score, matched, missing }: AchievementProps) {
  const achievements = [
    {
      id: "first_analysis",
      title: "First Analysis",
      description: "Completed your first profile analysis",
      icon: CheckCircle,
      unlocked: true,
      color: "#4ade80",
    },
    {
      id: "skill_matcher",
      title: "Skill Matcher",
      description: `Matched ${matched} skills with your target role`,
      icon: Target,
      unlocked: matched >= 3,
      color: matched >= 3 ? "#4ade80" : "#374151",
    },
    {
      id: "high_scorer",
      title: "High Scorer",
      description: "Achieved a score above 70%",
      icon: Award,
      unlocked: score >= 70,
      color: score >= 70 ? "#facc15" : "#374151",
    },
    {
      id: "growth_mindset",
      title: "Growth Mindset",
      description: "Identified areas for improvement",
      icon: Clock,
      unlocked: missing > 0,
      color: missing > 0 ? "#7375db" : "#374151",
    },
  ]

  const nextAchievement = achievements.find(a => !a.unlocked)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <Award className="w-5 h-5 text-[#7375db]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Achievements</h2>
          <p className="text-white/50 text-sm">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {achievements.map((achievement, i) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className={`relative p-4 rounded-xl border transition-all ${
                achievement.unlocked 
                  ? "bg-black/30 border-[#7375db]/30 hover:bg-black/40" 
                  : "bg-black/20 border-white/5 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-white/10' : 'bg-white/5'}`}>
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: achievement.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${
                    achievement.unlocked ? "text-white" : "text-white/50"
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs mt-1 ${
                    achievement.unlocked ? "text-white/60" : "text-white/30"
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Next achievement */}
      {nextAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="p-4 bg-[#7375db]/10 rounded-xl border border-[#7375db]/20"
        >
          <p className="text-white/60 text-sm mb-2">Next Achievement</p>
          <div className="flex items-center gap-3">
            <nextAchievement.icon 
              className="w-5 h-5" 
              style={{ color: "#374151" }}
            />
            <div>
              <p className="text-white font-medium text-sm">{nextAchievement.title}</p>
              <p className="text-white/50 text-xs">{nextAchievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
