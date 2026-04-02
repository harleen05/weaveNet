"use client"

import { motion } from "framer-motion"
import { Zap, BookOpen, Users, Award } from "lucide-react"

interface LearningResourcesProps {
  missing: string[]
  adjacent: string[]
}

export default function LearningResources({ missing, adjacent }: LearningResourcesProps) {
  const resources = [
    {
      title: "Interactive Tutorials",
      description: "Hands-on coding exercises",
      icon: Zap,
      color: "#facc15",
      count: missing.length * 3,
    },
    {
      title: "Documentation",
      description: "Official guides and references",
      icon: BookOpen,
      color: "#4ade80",
      count: missing.length * 2,
    },
    {
      title: "Community Forums",
      description: "Get help from experts",
      icon: Users,
      color: "#7375db",
      count: adjacent.length * 5,
    },
    {
      title: "Certification Paths",
      description: "Industry-recognized credentials",
      icon: Award,
      color: "#fb923c",
      count: Math.ceil(missing.length / 2),
    },
  ]

  const topSkills = [...missing.slice(0, 3), ...adjacent.slice(0, 2)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <BookOpen className="w-5 h-5 text-[#7375db]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Learning Resources</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {resources.map((resource, i) => {
          const Icon = resource.icon
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Icon className="w-4 h-4" style={{ color: resource.color }} />
                </div>
                <span className="text-2xl font-bold text-white">{resource.count}</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1">{resource.title}</h3>
              <p className="text-white/50 text-xs">{resource.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Recommended skills to learn */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-white/70 mb-3">Focus Areas</h3>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-[#7375db]/20 to-[#8b8deb]/20 text-[#7375db] rounded-full text-xs font-medium border border-[#7375db]/30"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-center"
      >
        <button className="px-4 py-2 bg-[#7375db] hover:bg-[#8b8deb] rounded-lg text-white text-sm font-medium transition-colors">
          View All Resources
        </button>
      </motion.div>
    </motion.div>
  )
}
