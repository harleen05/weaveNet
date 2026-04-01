"use client"

import ScoreCard from "@/components/dashboard/ScoreCard"
import SkillSection from "@/components/dashboard/SkillSection"
import InsightCard from "@/components/dashboard/InsightCard"
import RecommendationCard from "@/components/dashboard/RecommendationCard"
import OrbitalGraph from "@/components/animations/OrbitalGraph"
import { motion } from "framer-motion"

export default function Dashboard() {

  const data = {
    score: 82,
    skills: ["Node.js", "MongoDB", "Express"],
    adjacent: ["GraphQL", "Docker Basics"],
    missing: ["Docker", "Kubernetes"],
    explanation:
      "Strong backend expertise with Node.js and Express. With minor DevOps exposure, candidate can transition quickly.",
    recommendations: [
      "Learn Docker → +10% match",
      "Explore Kubernetes basics → +8%",
      "Practice system design → +6%"
    ]
  }

  return (
    <div className="min-h-screen p-10 space-y-10">

      {/* 🔥 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        WeaveIQ Analysis
      </motion.h1>

      {/* 🔥 Score */}
      <ScoreCard score={data.score} />

      {/* 🔥 Skills */}
      <div className="grid md:grid-cols-3 gap-6">
        <SkillSection title="Skill Threads" skills={data.skills} />
        <SkillSection title="Adjacent Skills" skills={data.adjacent} />
        <SkillSection title="Missing Links" skills={data.missing} />
      </div>

      {/* 🔥 Insight */}
      <InsightCard text={data.explanation} />

      {/* 🔥 Orbital Graph */}
      <OrbitalGraph />

      {/* 🔥 Recommendations */}
      <div className="space-y-3">
        {data.recommendations.map((rec, i) => (
          <RecommendationCard key={i} text={rec} />
        ))}
      </div>

    </div>
  )
}