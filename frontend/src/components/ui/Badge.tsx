import { ReactNode } from "react"

type BadgeProps = {
  children: ReactNode
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="px-2 py-1 text-xs bg-white/10 rounded-lg text-white/80">
      {children}
    </span>
  )
}