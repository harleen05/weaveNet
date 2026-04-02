"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode, useState } from "react"

type GlowCardProps = {
  children: ReactNode
  className?: string
} & MotionProps

export function GlowCard({ children, className = "", ...motionProps }: GlowCardProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
      className={`relative rounded-2xl bg-white/5 backdrop-blur p-4 overflow-hidden ${className}`}
      {...motionProps}
    >
      {/* 🔥 Glow */}
      <div
        className="absolute pointer-events-none w-[300px] h-[300px] bg-[#7375db]/30 blur-[100px] rounded-full"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}