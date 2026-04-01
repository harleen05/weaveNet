"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import ParticleText from "@/components/animations/ParticleText"

export default function HeroContent() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  const handleButtonClick = () => {
    console.log('Button clicked - navigating to upload')
    router.push("/upload")
  }

  const handleAnimationComplete = () => {
    setShowContent(true)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Canvas with particle animation */}
      <ParticleText text="WeaveIQ" onAnimationComplete={handleAnimationComplete} />
      
      {/* Responsive HTML content overlay */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Tagline */}
          <p className="text-lg text-white/70 max-w-xl text-center mt-48 mb-6 pointer-events-auto">
            Weaving intelligence into human potential — beyond resumes.
          </p>
          
          {/* HTML Button - fully responsive */}
          <button
            onClick={handleButtonClick}
            className="px-8 py-3 bg-[#7375db] hover:bg-[#8b8deb] rounded-xl font-semibold shadow-lg shadow-[#7375db]/30 transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
          >
            Analyze Profile
          </button>
        </div>
      )}
    </div>
  )
}