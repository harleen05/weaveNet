"use client"

import { DottedBackground } from "@/components/animations/DottedBackground"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <DottedBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#7375db]/20 blur-[140px] rounded-full" />
      </div>
    </div>
  )
}