"use client"

import { GlowCard } from "@/components/ui/GlowCard"
import { motion } from "framer-motion"

type InsightCardProps = {
  text: string
}

export default function InsightCard({ text }: InsightCardProps) {
  return (
    <GlowCard className="p-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-white/80 leading-relaxed"
      >
        {text}
      </motion.p>
    </GlowCard>
  )
}