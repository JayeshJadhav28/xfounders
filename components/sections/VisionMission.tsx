"use client"

import { useState, useEffect, useRef } from "react"
import { Target, Lightbulb, Users, Rocket, CalendarDays, GraduationCap } from "lucide-react"

const cards = [
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To be the leading entrepreneurship hub that transforms innovative ideas into successful startups, creating a thriving ecosystem of young entrepreneurs at DIET Satara.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Lightbulb,
    title: "Our Mission",
    description:
      "Nurturing the startup mindset among DIET students through mentorship, workshops, networking events, and providing resources to turn entrepreneurial dreams into reality.",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Community Focus",
    description:
      "Building a supportive community where aspiring entrepreneurs can collaborate, learn from each other, and access the guidance needed to succeed in their ventures.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Rocket,
    title: "Innovation Drive",
    description:
      "Fostering a culture of innovation and creativity, encouraging students to think beyond conventional boundaries and develop solutions for real-world problems.",
    color: "from-purple-500 to-pink-500",
  },
]

const items = [
  {
    title: "Regular Events",
    desc: "Workshops, bootcamps, and networking sessions every month",
    Icon: CalendarDays,
  },
  {
    title: "Mentorship",
    desc: "Get guidance from experienced entrepreneurs and industry experts",
    Icon: GraduationCap,
  },
  {
    title: "Launch Support",
    desc: "Resources and support to help you launch your startup successfully",
    Icon: Rocket,
  },
]

export default function VisionMission() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
            Our Vision & Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving entrepreneurial excellence and innovation at DIET Satara through community, mentorship, and
            transformative experiences.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                className={`card p-8 group hover:scale-105 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
                />
              </div>
            )
          })}
        </div>

         {/* What We Provide */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
           {items.map(({ title, desc, Icon }) => (
             <div key={title} className="text-center">
               <Icon className="h-10 w-10 text-orange-500 mx-auto mb-3" />
               <div className="text-2xl font-bold text-gray-900">{title}</div>
               <div className="text-gray-600 mt-1">{desc}</div>
             </div>
           ))}
         </div>

        {/* Bottom CTA */}
       {/* <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-700 font-medium">Ready to be part of our journey?</span>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </div>
        </div>*/}
      </div>
    </section>
  )
}
