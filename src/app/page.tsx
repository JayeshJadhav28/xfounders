import HeroSection from "@/components/sections/HeroSection"
import InteractiveRocket from "@/components/3d/InteractiveRocket"
import VisionMission from "@/components/sections/VisionMission"
import StatsSection from "@/components/sections/StatsSection"
import CTASection from "@/components/sections/CTASection"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <InteractiveRocket />
      <VisionMission />
      <StatsSection />
      <CTASection />
    </div>
  )
}
