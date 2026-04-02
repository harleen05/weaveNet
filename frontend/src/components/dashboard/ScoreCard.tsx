"use client"

import { GlowCard } from "@/components/ui/GlowCard"
import { useEffect, useState } from "react"

export default function ScoreCard({ score }: { score: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const interval = setInterval(() => {
      start += 1
      if (start >= score) {
        start = score
        clearInterval(interval)
      }
      setDisplay(start)
    }, 20)

    return () => clearInterval(interval)
  }, [score])

  return (
    <GlowCard className="p-6 flex flex-col items-center">
      <h2 className="text-lg text-white/70">Weave Score</h2>
      <p className="text-6xl font-bold text-[#7375db]">{display}%</p>
    </GlowCard>
  )
}