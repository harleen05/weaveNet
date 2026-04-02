import HeroBackground from "./HeroBackground"
import HeroContent from "./HeroContent"

export default function HeroSection() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </div>
  )
}