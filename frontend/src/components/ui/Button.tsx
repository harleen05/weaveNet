"use client"

import { ReactNode } from "react"
import { motion, HTMLMotionProps } from "framer-motion"

type ButtonProps = HTMLMotionProps<"button"> & {
  className?: string
  children: ReactNode
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-[#7375db] rounded-xl text-white font-semibold shadow-lg shadow-[#7375db]/30 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}