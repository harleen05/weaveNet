"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SpiralLoader from "@/components/animations/SpiralLoader"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 2600)

    return () => clearTimeout(timer)
  }, [router])

  return <SpiralLoader />
}