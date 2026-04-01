"use client"

import { motion } from "framer-motion"

interface LanguageChartProps {
  languages: string[]
}

export default function LanguageChart({ languages }: LanguageChartProps) {
  // Language colors mapping
  const languageColors: Record<string, string> = {
    "Python": "#3776ab",
    "JavaScript": "#f7df1e",
    "TypeScript": "#3178c6",
    "Java": "#007396",
    "Go": "#00add8",
    "Rust": "#dea584",
    "C++": "#00599c",
    "C": "#a8b9cc",
    "Ruby": "#cc342d",
    "Swift": "#ff3b30",
    "Kotlin": "#7f52ff",
    "PHP": "#777bb4",
    "R": "#276dc3",
    "Julia": "#9558b2",
    "Scala": "#dc322f",
    "Shell": "#89e051",
    "HTML": "#e34c26",
    "CSS": "#264de4",
    "Vue": "#4fc08d",
    "React": "#61dafb",
  }

  // Mock percentages for visualization
  const getPercentage = (index: number) => {
    const base = 40 - index * 8
    return Math.max(15, base)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-6">Language Breakdown</h2>

      <div className="space-y-4">
        {languages.slice(0, 6).map((lang, i) => {
          const percentage = getPercentage(i)
          const color = languageColors[lang] || "#7375db"

          return (
            <div key={lang} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{lang}</span>
                <span className="text-white/60 text-sm">{percentage}%</span>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats summary */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#7375db]">{languages.length}</p>
          <p className="text-white/50 text-xs">Languages</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">{languages[0] || "N/A"}</p>
          <p className="text-white/50 text-xs">Primary</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">{languages.length > 3 ? "High" : "Medium"}</p>
          <p className="text-white/50 text-xs">Diversity</p>
        </div>
      </div>
    </motion.div>
  )
}
