"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillNode {
  name: string
  level: number
  category: "matched" | "adjacent" | "missing"
  x?: number
  y?: number
}

interface OrbitalGraphProps {
  skills: SkillNode[]
}

export default function OrbitalGraph({ skills }: OrbitalGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || skills.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const centerX = width / 2
      const centerY = height / 2
      const maxRadius = Math.min(width, height) / 2 - 50

      ctx.fillStyle = "rgba(16, 13, 40, 0.15)"
      ctx.fillRect(0, 0, width, height)

      // SLOWED DOWN: 0.0003 instead of 0.001
      timeRef.current += 0.0003

      // Advanced orbital rings with gradients
      const ringCount = 4
      for (let i = 0; i < ringCount; i++) {
        const radius = maxRadius * (0.25 + i * 0.22)
        
        const gradient = ctx.createRadialGradient(centerX, centerY, Math.max(0, radius - 10), centerX, centerY, radius + 10)
        gradient.addColorStop(0, "rgba(115, 117, 219, 0)")
        gradient.addColorStop(0.5, `rgba(115, 117, 219, ${0.08 + i * 0.02})`)
        gradient.addColorStop(1, "rgba(115, 117, 219, 0)")
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(115, 117, 219, ${0.15 - i * 0.03})`
        ctx.lineWidth = 1
        ctx.setLineDash([5, 10])
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Advanced center node with pulse
      const pulseSize = 15 + Math.sin(timeRef.current * 2) * 3
      
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize + 20)
      centerGlow.addColorStop(0, "rgba(115, 117, 219, 0.4)")
      centerGlow.addColorStop(0.5, "rgba(115, 117, 219, 0.1)")
      centerGlow.addColorStop(1, "rgba(115, 117, 219, 0)")
      ctx.fillStyle = centerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize + 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = "#7375db"
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(centerX - 3, centerY - 3, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()

      // SLOWER rotation: 0.0003 multiplier
      const angleStep = (Math.PI * 2) / Math.max(skills.length, 6)
      const reversedSkills = [...skills].reverse()
      
      reversedSkills.forEach((skill, index) => {
        const actualIndex = skills.length - 1 - index
        const baseAngle = actualIndex * angleStep + timeRef.current * (actualIndex % 2 === 0 ? 0.3 : -0.2)
        const radius = maxRadius * (0.35 + (skill.level / 100) * 0.55)
        
        const x = centerX + Math.cos(baseAngle) * radius
        const y = centerY + Math.sin(baseAngle) * radius

        const color = skill.category === "matched" 
          ? [74, 222, 128] 
          : skill.category === "adjacent"
          ? [250, 204, 21]
          : [248, 113, 113]

        // Gradient connection line
        const lineGradient = ctx.createLinearGradient(centerX, centerY, x, y)
        lineGradient.addColorStop(0, `rgba(${color.join(",")}, 0.1)`)
        lineGradient.addColorStop(0.5, `rgba(${color.join(",")}, 0.4)`)
        lineGradient.addColorStop(1, `rgba(${color.join(",")}, 0.6)`)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = lineGradient
        ctx.lineWidth = skill.category === "matched" ? 2 : 1
        ctx.stroke()

        // Node glow
        const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, 25)
        nodeGlow.addColorStop(0, `rgba(${color.join(",")}, 0.3)`)
        nodeGlow.addColorStop(0.5, `rgba(${color.join(",")}, 0.1)`)
        nodeGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = nodeGlow
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, Math.PI * 2)
        ctx.fill()

        // Node with shadow
        const nodeSize = skill.category === "matched" ? 10 : 7
        
        ctx.shadowColor = `rgba(${color.join(",")}, 0.5)`
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${color.join(",")})`
        ctx.fill()
        ctx.shadowBlur = 0

        // Inner highlight
        ctx.beginPath()
        ctx.arc(x - 2, y - 2, nodeSize / 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
        ctx.fill()

        // Label with background
        const labelOffset = 35
        const labelX = x + Math.cos(baseAngle) * labelOffset
        const labelY = y + Math.sin(baseAngle) * labelOffset
        
        ctx.font = "bold 11px system-ui"
        const textMetrics = ctx.measureText(skill.name)
        const padding = 6
        
        ctx.fillStyle = "rgba(16, 13, 40, 0.8)"
        ctx.beginPath()
        ctx.roundRect(
          labelX - textMetrics.width / 2 - padding,
          labelY - 8 - padding / 2,
          textMetrics.width + padding * 2,
          16 + padding,
          4
        )
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(skill.name, labelX, labelY)

        // Store for hover
        skill.x = x
        skill.y = y
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const maxRadius = Math.min(rect.width, rect.height) / 2 - 50

      const hovered = skills.find(skill => {
        const angleStep = (Math.PI * 2) / Math.max(skills.length, 6)
        const index = skills.indexOf(skill)
        const baseAngle = index * angleStep + timeRef.current * (index % 2 === 0 ? 0.3 : -0.2)
        const radius = maxRadius * (0.35 + (skill.level / 100) * 0.55)
        const sx = centerX + Math.cos(baseAngle) * radius
        const sy = centerY + Math.sin(baseAngle) * radius
        
        const dist = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2)
        return dist < 20
      })

      setHoveredSkill(hovered || null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [skills])

  if (skills.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-white/50">
        No skills data available
      </div>
    )
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-[400px] cursor-crosshair" />
      
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 z-20"
            style={{ left: mousePos.x + 20, top: mousePos.y - 40 }}
          >
            <p className="text-white font-semibold">{hoveredSkill.name}</p>
            <p className="text-white/60 text-sm">
              {hoveredSkill.category === "matched" 
                ? "✓ Verified skill" : hoveredSkill.category === "adjacent"
                ? "~ Related skill" : "○ Gap to fill"
              }
            </p>
            <div className="mt-1 w-full bg-white/20 h-1 rounded-full">
              <div 
                className={`h-full rounded-full ${
                  hoveredSkill.category === "matched" ? "bg-green-400" : 
                  hoveredSkill.category === "adjacent" ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ width: `${hoveredSkill.level}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-8 mt-6">
        {[
          { cat: "matched", color: "green", label: "Matched" },
          { cat: "adjacent", color: "yellow", label: "Adjacent" },
          { cat: "missing", color: "red", label: "Gaps" }
        ].map(({ cat, color, label }) => (
          <div key={cat} className="flex items-center gap-2 group cursor-pointer">
            <div className={`w-4 h-4 rounded-full bg-${color}-400 shadow-lg shadow-${color}-400/30 group-hover:scale-110 transition-transform`} />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {label} ({skills.filter(s => s.category === cat).length})
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute top-4 left-4 text-xs text-white/40">
        <p>Orbital Period: ~30s</p>
        <p>Nodes: {skills.length}</p>
      </motion.div>
    </div>
  )
}