"use client"

import { useEffect, useRef } from "react"

type WavesProps = {
  className?: string
}

export function Waves({ className = "" }: WavesProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + t + i) * 40
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = "rgba(115,117,219,0.2)"
        ctx.stroke()
      }

      t += 0.02
      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return <canvas ref={ref} className={`absolute inset-0 ${className}`} />
}