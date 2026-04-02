"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  tx: number
  ty: number
  vx: number
  vy: number
}

type ParticleTextEffectProps = {
  words?: string[]
  onAnimationComplete?: () => void
}

export function ParticleTextEffect({ words = ["WeaveIQ"], onAnimationComplete }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles: Particle[] = []
    let animationComplete = false

    const createParticles = (text: string) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = "bold 120px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 50)

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
      particles = []

      for (let y = 0; y < data.height; y += 6) {
        for (let x = 0; x < data.width; x += 6) {
          const index = (y * data.width + x) * 4
          if (data.data[index + 3] > 128) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0
            })
          }
        }
      }
    }

    const drawTagline = () => {
      ctx.font = "18px Arial"
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.textAlign = "center"
      ctx.fillText("Weaving intelligence into human potential — beyond resumes.", canvas.width / 2, canvas.height / 2 + 50)
    }

    createParticles(words[0])

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let allSettled = true

      particles.forEach(p => {
        const dx = p.tx - p.x
        const dy = p.ty - p.y

        p.vx += dx * 0.02
        p.vy += dy * 0.02

        p.vx *= 0.92
        p.vy *= 0.92

        p.x += p.vx
        p.y += p.vy

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1) {
          allSettled = false
        }

        ctx.fillStyle = "#7375db"
        ctx.fillRect(p.x, p.y, 2, 2)
      })

      // Trigger completion callback when all particles have settled
      if (allSettled && !animationComplete) {
        animationComplete = true
        setTimeout(() => {
          onAnimationComplete?.()
        }, 800)
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles(words[0])
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      // Note: Canvas event listeners are anonymous functions, so we can't remove them easily
      // This is fine since the component unmounts when canvas is removed
    }
  }, [words, onAnimationComplete])

  return <canvas ref={canvasRef} className="w-full h-full" />
}