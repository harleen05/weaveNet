"use client"

import { GlowCard } from "@/components/ui/GlowCard"
import { motion } from "framer-motion"

type RecommendationCardProps = {
  text: string
}

export default function RecommendationCard({ text }: RecommendationCardProps) {
  return (
    <GlowCard className="p-4">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-white/70"
      >
        {text}
      </motion.p>
    </GlowCard>
  )
}