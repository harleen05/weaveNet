"use client"

import { GlowCard } from "@/components/ui/GlowCard"
import { motion } from "framer-motion"
import Badge from "@/components/ui/Badge"

type SkillSectionProps = {
  title: string
  skills: string[]
}

export default function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <GlowCard className="p-5">
      <h3 className="mb-3 text-lg">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge>{skill}</Badge>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  )
}