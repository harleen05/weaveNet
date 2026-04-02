"use client"

import SpiralAnimation from "@/components/ui/spiral-animation"

export default function SpiralLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SpiralAnimation />
      <p className="mt-6 text-white/70">Weaving intelligence...</p>
    </div>
  )
}