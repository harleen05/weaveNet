"use client"

import { motion } from "framer-motion"

interface SkillRadarProps {
  matched: string[]
  adjacent: string[]
  missing: string[]
}

export default function SkillRadar({ matched, adjacent, missing }: SkillRadarProps) {
  const skills = [
    ...matched.slice(0, 3).map(s => ({ name: s, level: 90, type: "matched" })),
    ...adjacent.slice(0, 2).map(s => ({ name: s, level: 60, type: "adjacent" })),
    ...missing.slice(0, 3).map(s => ({ name: s, level: 30, type: "missing" })),
  ]

  const maxSkills = 6
  const radius = 80
  const centerX = 100
  const centerY = 100

  const getPoint = (index: number, level: number) => {
    const angle = (index * 2 * Math.PI) / maxSkills - Math.PI / 2
    const r = (level / 100) * radius
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    }
  }

  const points = skills.map((skill, i) => getPoint(i, skill.level))
  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Skill Radar</h2>
      
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background circles */}
          {[20, 40, 60, 80].map((r, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="rgba(115, 117, 219, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {Array.from({ length: maxSkills }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / maxSkills - Math.PI / 2
            const x = centerX + radius * Math.cos(angle)
            const y = centerY + radius * Math.sin(angle)
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(115, 117, 219, 0.3)"
                strokeWidth="1"
              />
            )
          })}

          {/* Data polygon */}
          <motion.path
            d={pathData}
            fill="rgba(115, 117, 219, 0.3)"
            stroke="#7375db"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={skills[i].type === "matched" ? "#4ade80" : skills[i].type === "adjacent" ? "#facc15" : "#f87171"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}

          {/* Labels */}
          {skills.map((skill, i) => {
            const angle = (i * 2 * Math.PI) / maxSkills - Math.PI / 2
            const x = centerX + (radius + 20) * Math.cos(angle)
            const y = centerY + (radius + 20) * Math.sin(angle)
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
                fontWeight="500"
              >
                {skill.name.length > 8 ? skill.name.slice(0, 6) + "..." : skill.name}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-white/60">Strong</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-xs text-white/60">Developing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-xs text-white/60">Gap</span>
        </div>
      </div>
    </motion.div>
  )
}
