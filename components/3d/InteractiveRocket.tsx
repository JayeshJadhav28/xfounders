"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Sparkles, Zap, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InteractiveRocket() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [launchPhase, setLaunchPhase] = useState<"idle" | "ignition" | "liftoff" | "flight" | "orbit">("idle")
  const [showLaunchButton, setShowLaunchButton] = useState(true)
  const rocketRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isLaunching) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  // Map current launchPhase to startup-themed background gradients
  const getBackgroundClass = (): string => {
    switch (launchPhase) {
      case "orbit": // unicorn
        return "bg-gradient-to-b from-yellow-500 via-pink-600 to-purple-900"
      case "flight": // mentorship
        return "bg-gradient-to-b from-green-600 via-emerald-800 to-black"
      case "liftoff": // launch
        return "bg-gradient-to-b from-blue-500 via-indigo-700 to-black"
      case "ignition": // funding
        return "bg-gradient-to-b from-orange-500 via-red-600 to-black"
      case "idle":
      default:
        return "bg-gradient-to-b from-black via-gray-900 to-gray-800"
    }
  }

  const handleMouseEnter = () => !isLaunching && setIsHovering(true)
  const handleMouseLeave = () => {
    if (!isLaunching) {
      setIsHovering(false)
      setMousePosition({ x: 0.5, y: 0.5 })
    }
  }

  const startLaunch = async () => {
    if (isLaunching) return

    setIsLaunching(true)
    setShowLaunchButton(false)

    // Launch sequence
    setLaunchPhase("ignition")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLaunchPhase("liftoff")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLaunchPhase("flight")
    await new Promise((resolve) => setTimeout(resolve, 4000))

    setLaunchPhase("orbit")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Reset
    setLaunchPhase("idle")
    setIsLaunching(false)
    setShowLaunchButton(true)
  }

  // Calculate transforms based on phase and mouse
  const getTransforms = () => {
    if (isLaunching) {
      switch (launchPhase) {
        case "ignition":
          return {
            transform: `translateY(0px) scale(1.05)`,
            filter: "brightness(1.2) contrast(1.1)",
          }
        case "liftoff":
          return {
            transform: `translateY(-100px) scale(1.1) rotateZ(0deg)`,
            filter: "brightness(1.3) contrast(1.2)",
          }
        case "flight":
          return {
            transform: `translateY(-400px) translateX(50px) scale(0.8) rotateZ(15deg)`,
            filter: "brightness(1.1)",
          }
        case "orbit":
          return {
            transform: `translateY(-600px) translateX(200px) scale(0.4) rotateZ(45deg)`,
            filter: "brightness(0.8) opacity(0.6)",
          }
      }
    }

    const rotateX = (mousePosition.y - 0.5) * -15
    const rotateY = (mousePosition.x - 0.5) * 15
    const translateX = (mousePosition.x - 0.5) * 20
    const translateY = (mousePosition.y - 0.5) * -15

    return {
      transform: `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        ${isHovering ? "scale(1.1)" : "scale(1)"}
      `,
      filter: "brightness(1)",
    }
  }

  const getFlameIntensity = () => {
    switch (launchPhase) {
      case "ignition":
        return 1.5
      case "liftoff":
        return 2.5
      case "flight":
        return 2.0
      case "orbit":
        return 0.5
      default:
        return 1.0
    }
  }

  // Map technical launch phases to startup-themed messages
  const getPhaseMessage = (): React.ReactNode => {
    switch (launchPhase) {
      case "ignition":
        return "💡 Brainstorming the Next Big Thing..."
      case "liftoff":
        return "💰 Securing Your First Round of Funding..."
      case "flight":
        return "🤝 Connecting with Mentors & Advisors..."
      case "orbit":
        return "🦄 Welcome to Orbit — You’re a Unicorn!"
      case "idle":
        return !isLaunching ? "Ready to Launch Your Startup Journey?" : null
    }
  }

  return (
    <section className="relative w-full h-[600px] bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Dynamic Background based on launch phase */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-[2000ms] ${getBackgroundClass()}`}
      >
        {/* Animated Stars */}
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full transition-all duration-1000 ${
              launchPhase === "flight" || launchPhase === "orbit" ? "animate-twinkle-fast" : "animate-twinkle"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Launch Pad and Ground Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-800 to-gray-700" />

        {/* Launch Pad */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-8">
          <div className="w-full h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-lg shadow-2xl" />
          {/* Support Beams */}
          <div className="absolute -bottom-8 left-4 w-2 h-8 bg-gray-600 transform rotate-12" />
          <div className="absolute -bottom-8 right-4 w-2 h-8 bg-gray-600 transform -rotate-12" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-600" />
        </div>

        {/* Launch Smoke/Steam */}
        {(launchPhase === "ignition" || launchPhase === "liftoff") && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white opacity-30 rounded-full animate-smoke-rise"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  bottom: "0px",
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Rocket Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1200px" }}
      >
        {/* Loading Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
            <div className="text-white text-center">
              <div className="relative mb-6">
                <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
                <div className="absolute inset-0 animate-ping w-12 h-12 border-4 border-orange-300 border-t-transparent rounded-full mx-auto opacity-20" />
              </div>
              <p className="text-xl font-medium bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Preparing Launch Systems...
              </p>
            </div>
          </div>
        )}

        {/* 3D Rocket with Realistic Design */}
        <div
          ref={rocketRef}
          className={`relative transition-all duration-1000 ease-out transform-gpu ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } ${launchPhase === "ignition" ? "animate-rocket-shake" : ""}`}
          style={{
            ...getTransforms(),
            transformStyle: "preserve-3d",
            transitionDuration: launchPhase === "flight" ? "4s" : launchPhase === "orbit" ? "3s" : "1s",
          }}
        >
          {/* Rocket Body - Ultra Realistic 3D Design */}
          <div className="relative rocket-body">
            {/* Main Rocket Structure */}
            <div className="relative w-24 h-64 mx-auto">
              {/* Nose Cone with Details */}
              <div className="relative">
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 z-10"
                  style={{
                    borderLeft: "48px solid transparent",
                    borderRight: "48px solid transparent",
                    borderBottom: "40px solid #ff6b35",
                    filter: "drop-shadow(0 0 15px rgba(255, 107, 53, 0.8))",
                  }}
                />
                {/* Nose tip highlight */}
                <div
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 z-20"
                  style={{
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: "12px solid #ffaa70",
                  }}
                />
              </div>

              {/* Main Body Sections */}
              <div
                className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-44 rounded-lg shadow-2xl"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      #ff6b35 0%, 
                      #ff8c42 25%, 
                      #ffffff 30%, 
                      #ff8c42 35%, 
                      #ff6b35 50%,
                      #e55a2b 75%,
                      #ff6b35 100%
                    )
                  `,
                  boxShadow: `
                    0 0 40px rgba(255, 107, 53, 0.8),
                    inset -8px 0 15px rgba(0, 0, 0, 0.4),
                    inset 8px 0 15px rgba(255, 255, 255, 0.3),
                    inset 0 -10px 20px rgba(0, 0, 0, 0.2)
                  `,
                }}
              >
                {/* Command Module Window */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full border-4 border-gray-300 shadow-inner">
                  <div className="w-full h-full bg-gradient-to-br from-white via-transparent to-blue-300 rounded-full opacity-60" />
                </div>

                {/* USA Flag Decal */}
                <div className="absolute top-20 left-2 w-8 h-5 bg-gradient-to-r from-red-500 via-white to-blue-600 rounded-sm shadow-md opacity-90" />

                {/* XFounders Logo Area */}
                <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="text-xs font-bold text-white opacity-80">XFOUNDERS</div>
                </div>

                {/* Technical Details */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full shadow-inner" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" />

                {/* Side Panels */}
                <div className="absolute top-16 -left-1 w-2 h-20 bg-gradient-to-b from-gray-300 to-gray-600 rounded-l-lg shadow-lg" />
                <div className="absolute top-16 -right-1 w-2 h-20 bg-gradient-to-b from-gray-600 to-gray-300 rounded-r-lg shadow-lg" />
              </div>

              {/* Realistic Side Fins */}
              <div
                className="absolute bottom-4 left-0 w-0 h-0 fin-left"
                style={{
                  borderTop: "20px solid #e55a2b",
                  borderRight: "12px solid transparent",
                  borderBottom: "20px solid #e55a2b",
                  borderLeft: "20px solid #e55a2b",
                  filter: "drop-shadow(-3px 3px 6px rgba(0, 0, 0, 0.4))",
                }}
              />
              <div
                className="absolute bottom-4 right-0 w-0 h-0 fin-right"
                style={{
                  borderTop: "20px solid #e55a2b",
                  borderLeft: "12px solid transparent",
                  borderBottom: "20px solid #e55a2b",
                  borderRight: "20px solid #e55a2b",
                  filter: "drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.4))",
                }}
              />
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 fin-back"
                style={{
                  borderTop: "20px solid #cc4e24",
                  borderLeft: "10px solid transparent",
                  borderBottom: "20px solid #cc4e24",
                  borderRight: "10px solid transparent",
                  filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.4))",
                }}
              />
            </div>

            {/* Enhanced Rocket Exhaust with Multiple Engines */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              {/* Main Engine */}
              <div
                className={`relative w-12 h-24 transition-all duration-300 ${
                  launchPhase === "ignition"
                    ? "animate-flame-intense"
                    : launchPhase === "liftoff" || launchPhase === "flight"
                      ? "animate-flame-max"
                      : "animate-flame"
                }`}
                style={{
                  background: `linear-gradient(to bottom, 
                    #ff6b35 0%, 
                    #ff8c42 20%, 
                    #ffd700 40%, 
                    #ff4500 60%,
                    #ff0000 80%,
                    #8B0000 100%
                  )`,
                  clipPath: "polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)",
                  filter: `blur(1px) drop-shadow(0 0 ${10 * getFlameIntensity()}px #ff6b35)`,
                  transform: `scaleY(${getFlameIntensity()})`,
                }}
              />

              {/* Side Thrusters */}
              <div
                className={`absolute top-4 -left-6 w-6 h-16 transition-all duration-300 ${
                  launchPhase === "liftoff" || launchPhase === "flight"
                    ? "animate-flame-side-intense"
                    : "animate-flame-side"
                }`}
                style={{
                  background: "linear-gradient(to bottom, #ff8c42 0%, #ffd700 50%, #ff4500 100%)",
                  clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
                  animationDelay: "0.1s",
                  transform: `scaleY(${getFlameIntensity() * 0.8})`,
                }}
              />
              <div
                className={`absolute top-4 -right-6 w-6 h-16 transition-all duration-300 ${
                  launchPhase === "liftoff" || launchPhase === "flight"
                    ? "animate-flame-side-intense"
                    : "animate-flame-side"
                }`}
                style={{
                  background: "linear-gradient(to bottom, #ff8c42 0%, #ffd700 50%, #ff4500 100%)",
                  clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)",
                  animationDelay: "0.2s",
                  transform: `scaleY(${getFlameIntensity() * 0.8})`,
                }}
              />

              {/* Exhaust Particles Enhanced */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                {[...Array(launchPhase === "liftoff" ? 20 : 12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full transition-all duration-300 ${
                      launchPhase === "liftoff" || launchPhase === "flight"
                        ? "animate-exhaust-particle-intense bg-orange-300"
                        : "animate-exhaust-particle bg-orange-400"
                    }`}
                    style={{
                      left: `${(Math.random() - 0.5) * 30}px`,
                      width: `${2 + Math.random() * 3}px`,
                      height: `${2 + Math.random() * 3}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.8 + Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Shock Wave Effect */}
              {(launchPhase === "liftoff" || launchPhase === "flight") && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white opacity-20 animate-shockwave" />
              )}
            </div>

            {/* Orbital Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute transition-all duration-1000 ${
                    launchPhase === "flight" || launchPhase === "orbit"
                      ? "animate-orbit-fast"
                      : `animate-orbit-${i % 3}`
                  }`}
                  style={{
                    left: "50%",
                    top: "50%",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {i % 3 === 0 && <Sparkles className="h-5 w-5 text-yellow-400" />}
                  {i % 3 === 1 && <Zap className="h-4 w-4 text-blue-400" />}
                  {i % 3 === 2 && <Star className="h-4 w-4 text-purple-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Launch Button */}
        {showLaunchButton && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
            <Button
              onClick={startLaunch}
              className="text-lg px-8 py-4 shadow-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold border border-orange-500"
              disabled={isLaunching}
            >
              <Play className="mr-2 h-5 w-5" />
              Launch Startup
            </Button>
          </div>
        )}

        {/* Interactive Text */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20">
          <div className={`transition-all duration-500 ${isHovering && !isLaunching ? "scale-110" : "scale-100"}`}>
            <div className="inline-block bg-white px-6 py-4 rounded-xl shadow-lg">
              <p className="text-lg font-bold mb-0 text-gray-900">
                {getPhaseMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Glow Effect */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${
            isHovering && !isLaunching ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 107, 53, 0.4) 0%, 
              rgba(255, 107, 53, 0.2) 30%, 
              transparent 60%)`,
          }}
        />

        {/* Launch Effects Overlay */}
        {launchPhase === "liftoff" && (
          <div className="absolute inset-0 z-0 bg-white opacity-10 animate-flash pointer-events-none" />
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />

      {/* Hidden Audio for Sound Effects */}
      <audio ref={audioRef} preload="auto">
        <source src="/rocket-launch.mp3" type="audio/mpeg" />
      </audio>
    </section>
  )
}
