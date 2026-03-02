"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Users, Trophy, Briefcase, TrendingUp, Award } from "lucide-react"

/* const stats = [
  {
    icon: Calendar,
    number: 50,
    suffix: "+",
    label: "Events Hosted",
    description: "Workshops, bootcamps, and networking sessions",
  },
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Active Members",
    description: "Passionate entrepreneurs and innovators",
  },
  {
    icon: Trophy,
    number: 25,
    suffix: "+",
    label: "Success Stories",
    description: "Startups launched by our community",
  },
  {
    icon: Briefcase,
    number: 15,
    suffix: "+",
    label: "Industry Partners",
    description: "Collaborations with leading companies",
  },
  {
    icon: TrendingUp,
    number: 85,
    suffix: "%",
    label: "Success Rate",
    description: "Members who launched their ventures",
  },
  {
    icon: Award,
    number: 10,
    suffix: "+",
    label: "Awards Won",
    description: "Recognition for excellence in entrepreneurship",
  },
]
*/

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  // const [animatedNumbers, setAnimatedNumbers] = useState<number[]>(new Array(stats.length).fill(0))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animateNumbers()
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateNumbers = () => {
    /* stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.number / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }

        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev]
          newNumbers[index] = Math.floor(current)
          return newNumbers
        })
      }, duration / steps)
    }) */
  }

  // Temporarily disabled
  return null
}
