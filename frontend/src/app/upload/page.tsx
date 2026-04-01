"use client"

import UploadForm from "@/components/upload/UploadForm"
import WaveBackground from "@/components/animations/WaveBackground"
import { motion } from "framer-motion"

export default function UploadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <WaveBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#100d28]/80 via-transparent to-[#100d28]/90" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7375db]/40 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={{ 
              y: [null, -20, 20],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            Profile Analysis
          </h1>
          <p className="text-white/60 text-lg">
            Enter your details to get a comprehensive skill assessment
          </p>
        </motion.div>

        {/* Upload Form */}
        <UploadForm />
      </motion.div>
    </div>
  )
}