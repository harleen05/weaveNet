"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import ScoreCard from "@/components/dashboard/ScoreCard"
import SkillSection from "@/components/dashboard/SkillSection"
import InsightCard from "@/components/dashboard/InsightCard"
import RecommendationCard from "@/components/dashboard/RecommendationCard"
import OrbitalGraph from "@/components/animations/OrbitalGraph"
import AnimatedBackground from "@/components/animations/AnimatedBackground"
import RepoStats from "@/components/dashboard/RepoStats"
import SkillRadar from "@/components/dashboard/SkillRadar"
import LearningTimeline from "@/components/dashboard/LearningTimeline"
import SkillComparison from "@/components/dashboard/SkillComparison"
import DetailedInsights from "@/components/dashboard/DetailedInsights"
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap"
import MarketInsights from "@/components/dashboard/MarketInsights"
import Achievements from "@/components/dashboard/Achievements"
import LearningResources from "@/components/dashboard/LearningResources"
import LanguageChart from "@/components/dashboard/LanguageChart"

interface AnalysisData {
  score: number
  matched: string[]
  adjacent: string[]
  missing: string[]
  explanation: string
  semantic_similarity?: number
  github?: {
    name: string
    top_languages: string[]
    public_repos: number
  }
}

export default function Dashboard() {
  const router = useRouter()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [username, setUsername] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const results = localStorage.getItem('analysisResults')
    const user = localStorage.getItem('githubUsername')
    const role = localStorage.getItem('targetRole')
    
    if (results) {
      try {
        const parsed = JSON.parse(results)
        setData(parsed)
      } catch (e) {
        console.error('Failed to parse results:', e)
      }
    }
    
    if (user) setUsername(user)
    if (role) setTargetRole(role)
    setLoading(false)
  }, [])

  const handleBack = () => {
    router.push('/upload')
  }

  const handleReanalyze = () => {
    localStorage.removeItem('analysisResults')
    router.push('/upload')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#100d28]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#7375db] border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#100d28] text-white">
        <h1 className="text-2xl font-bold mb-4">No Analysis Data Found</h1>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-[#7375db] rounded-xl hover:bg-[#8b8deb] transition-colors"
        >
          Go to Upload
        </button>
      </div>
    )
  }

  const orbitalSkills = [
    ...data.matched.map(skill => ({ name: skill, level: 90, category: "matched" as const })),
    ...data.adjacent.map(skill => ({ name: skill, level: 70, category: "adjacent" as const })),
    ...data.missing.map(skill => ({ name: skill, level: 50, category: "missing" as const }))
  ].slice(0, 12)

  return (
    <div className="min-h-screen bg-[#100d28] relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#100d28]/80 via-transparent to-[#100d28]/90" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex items-center justify-between border-b border-white/10"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
            {username && (
              <p className="text-white/60 text-sm">
                Profile: <span className="text-[#7375db]">@{username}</span> 
                {targetRole && ` • Target: ${targetRole}`}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-white/70" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-white/70" />
          </button>
          <button
            onClick={handleReanalyze}
            className="flex items-center gap-2 px-4 py-2 bg-[#7375db] hover:bg-[#8b8deb] rounded-lg transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Reanalyze
          </button>
        </div>
      </motion.header>

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ScoreCard score={data.score} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Skill Constellation</h2>
            <OrbitalGraph skills={orbitalSkills} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <SkillSection 
            title="Matched Skills" 
            skills={data.matched}
          />
          <SkillSection 
            title="Adjacent Skills" 
            skills={data.adjacent}
          />
          <SkillSection 
            title="Gap Skills" 
            skills={data.missing}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InsightCard text={data.explanation} />
        </motion.div>

        {/* Detailed Insights */}
        <DetailedInsights 
          score={data.score}
          matched={data.matched}
          missing={data.missing}
          targetRole={targetRole}
        />

        {/* Skill Radar & Learning Timeline */}
        <div className="grid lg:grid-cols-3 gap-8">
          <SkillRadar 
            matched={data.matched}
            adjacent={data.adjacent}
            missing={data.missing}
          />
          <LearningTimeline 
            missing={data.missing}
            adjacent={data.adjacent}
          />
          <SkillComparison
            matched={data.matched}
            missing={data.missing}
            targetRole={targetRole}
          />
        </div>

        {/* Repo Stats & Language Charts */}
        {data.github && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            <RepoStats 
              publicRepos={data.github.public_repos}
              topLanguages={data.github.top_languages || []}
              matchedSkills={data.matched}
            />
            <LanguageChart languages={data.github.top_languages || []} />
          </motion.div>
        )}

        {/* Market Insights & Activity Heatmap */}
        <div className="grid lg:grid-cols-2 gap-8">
          <MarketInsights
            matched={data.matched}
            missing={data.missing}
            targetRole={targetRole}
          />
          {data.github && (
            <ActivityHeatmap publicRepos={data.github.public_repos} />
          )}
        </div>

        {/* GitHub Overview - Simplified */}
        {data.github && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <p className="text-3xl font-bold text-[#7375db]">{data.github.public_repos}</p>
                <p className="text-white/60 text-sm mt-1">Public Repos</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <p className="text-3xl font-bold text-green-400">{data.matched.length}</p>
                <p className="text-white/60 text-sm mt-1">Skills Match</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <p className="text-3xl font-bold text-yellow-400">{data.github.top_languages?.length || 0}</p>
                <p className="text-white/60 text-sm mt-1">Languages</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <p className="text-3xl font-bold text-red-400">{data.missing.length}</p>
                <p className="text-white/60 text-sm mt-1">Gaps</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements & Learning Resources */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Achievements 
            score={data.score}
            matched={data.matched.length}
            missing={data.missing.length}
          />
          <LearningResources 
            missing={data.missing}
            adjacent={data.adjacent}
          />
        </div>

        {data.missing.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.missing.slice(0, 4).map((skill, i) => (
                <RecommendationCard 
                  key={skill}
                  text={`Learn ${skill} to improve your profile match`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}