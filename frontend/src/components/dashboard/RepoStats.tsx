"use client"

import { motion } from "framer-motion"
import { GitBranch, Star, Code, Folder } from "lucide-react"

interface RepoStatsProps {
  publicRepos: number
  topLanguages: string[]
  matchedSkills: string[]
}

export default function RepoStats({ publicRepos, topLanguages, matchedSkills }: RepoStatsProps) {
  // Mock repo data - in real app this would come from API
  const repos = [
    { name: "ml-project", stars: 12, language: "Python", type: "Machine Learning" },
    { name: "data-viz", stars: 8, language: "JavaScript", type: "Data Visualization" },
    { name: "api-server", stars: 5, language: "Node.js", type: "Backend" },
    { name: "portfolio", stars: 3, language: "React", type: "Frontend" },
  ]

  const totalStars = repos.reduce((acc, r) => acc + r.stars, 0)
  const codeCoverage = Math.round((matchedSkills.length / 10) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#7375db]/20 rounded-lg">
          <Folder className="w-5 h-5 text-[#7375db]" />
        </div>
        <h2 className="text-lg font-semibold text-white">Repository Insights</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GitBranch className="w-5 h-5 text-[#7375db]" />
            <span className="text-2xl font-bold text-white">{publicRepos}</span>
          </div>
          <p className="text-white/60 text-sm">Public Repos</p>
        </div>

        <div className="bg-black/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{totalStars}</span>
          </div>
          <p className="text-white/60 text-sm">Total Stars</p>
        </div>

        <div className="bg-black/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-white">{codeCoverage}%</span>
          </div>
          <p className="text-white/60 text-sm">Skill Coverage</p>
        </div>

        <div className="bg-black/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-bold text-white">{topLanguages.length}</span>
          </div>
          <p className="text-white/60 text-sm">Languages</p>
        </div>
      </div>

      {/* Top Repos */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white/70 mb-3">Featured Projects</h3>
        {repos.map((repo, i) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#7375db]/20 flex items-center justify-center text-[#7375db] font-medium text-sm">
                {repo.name[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{repo.name}</p>
                <p className="text-white/50 text-xs">{repo.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-xs">{repo.language}</span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3 h-3" />
                <span className="text-xs">{repo.stars}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language Distribution */}
      {topLanguages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/70 mb-3">Language Distribution</h3>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="px-3 py-1 bg-[#7375db]/20 text-[#7375db] rounded-full text-sm font-medium"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
