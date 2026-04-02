"use client"

import { ParticleTextEffect } from "@/components/ui/particle-text-effect"

export default function ParticleText({ text = "WeaveIQ", onAnimationComplete }: { text?: string; onAnimationComplete?: () => void }) {
  return (
    <div className="scale-110">
      <ParticleTextEffect words={[text]} onAnimationComplete={onAnimationComplete} />
    </div>
  )
}