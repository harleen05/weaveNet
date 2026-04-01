"use client"

import { useEffect, useRef } from "react"

export default function SpiralAnimation() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let angle = 0

    const animate = () => {
      ctx.fillStyle = "rgba(16,13,40,0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 200; i++) {
        const radius = i * 1.5
        const x = canvas.width / 2 + Math.cos(angle + i * 0.1) * radius
        const y = canvas.height / 2 + Math.sin(angle + i * 0.1) * radius

        ctx.fillStyle = "#7375db"
        ctx.fillRect(x, y, 2, 2)
      }

      angle += 0.02
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={ref} />
}