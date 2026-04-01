"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function DottedBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = ref.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 400

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const vertices = []

    for (let i = 0; i < 2000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000)
      )
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({
      color: 0x7375db,
      size: 2,
      opacity: 0.6,
      transparent: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const animate = () => {
      requestAnimationFrame(animate)
      points.rotation.y += 0.0005
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={ref} className="absolute inset-0" />
}