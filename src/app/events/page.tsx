"use client"

import { useState, useEffect } from "react"
import { Calendar, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/events/EventCard"
// Removed EventRegistrationModal and auth; we now use direct Google Form links

// Mock events data - replace with Firebase data
const mockEvents = [
  {
    id: "1",
    title: "PitchX Competition 2025",
    description:
    "Showcase your startup ideas in front of investors, mentors, and industry experts. Compete for prizes, mentorship, and funding opportunities.",
    date: "2025-00-00",
    time: "10:00 AM",
    deadline: "2025-00-00",
    location: "DIET Satara",
    maxParticipants: 30,
    currentRegistrations: 15,
    category: "Competition",
    image: "/pitchx-competition.jpeg",
    formFields: ["name", "email", "phone", "department", "year", "ideaTitle", "ideaDescription"],
    isActive: true,
    featured: true,
    googleFormUrl: "https://forms.gle/bpmzGzwffErLLggH6",
  },
  /*{
    id: "2",
    title: "Pitch Perfect Workshop",
    description:
      "Master the art of pitching your startup idea. Learn presentation skills, storytelling techniques, and how to impress investors.",
    date: "2025-09-22",
    time: "02:00 PM",
    deadline: "2025-09-20",
    location: "Auditorium, DIET Delhi",
    maxParticipants: 100,
    currentRegistrations: 67,
    category: "Workshop",
    image: "/pitch-presentation-workshop.png",
    formFields: ["name", "email", "phone", "idea"],
    isActive: true,
    featured: false,
    googleFormUrl: "https://forms.gle/your-form-id",
  },
  {
    id: "3",
    title: "Entrepreneurship Summit 2025",
    description:
      "Annual summit featuring keynote speakers, panel discussions, and networking opportunities with industry leaders and successful entrepreneurs.",
    date: "2025-10-05",
    time: "10:00 AM",
    deadline: "2025-10-01",
    location: "Main Auditorium",
    maxParticipants: 300,
    currentRegistrations: 156,
    category: "Summit",
    image: "/entrepreneurship-summit.png",
    formFields: ["name", "email", "phone", "organization"],
    isActive: true,
    featured: true,
    googleFormUrl: "https://forms.gle/your-form-id",
  },
  {
    id: "4",
    title: "Digital Marketing for Startups",
    description:
      "Learn essential digital marketing strategies for startups. Cover social media marketing, content creation, and growth hacking techniques.",
    date: "2025-09-28",
    time: "11:00 AM",
    deadline: "2025-09-25",
    location: "Computer Lab 1",
    maxParticipants: 40,
    currentRegistrations: 28,
    category: "Workshop",
    image: "/digital-marketing-workshop.png",
    formFields: ["name", "email", "phone", "experience"],
    isActive: true,
    featured: false,
    googleFormUrl: "https://forms.gle/your-form-id",
  },
*/  
]


const categories = ["All", "Workshop", "Bootcamp", "Summit", "Competition", "Networking"]

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  // Removed modal state and auth

  useEffect(() => {
    let filtered = events

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredEvents(filtered)
  }, [events, selectedCategory, searchQuery])

  // Registration now happens via googleFormUrl on each EventCard

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Upcoming Events</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join our exciting events and workshops designed to accelerate your entrepreneurial journey. Connect,
              learn, and grow with the XFounders community.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-field"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-gray-500" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Events */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
            {featuredEvents.length > 0 ? "All Events" : "Events"}
          </h2>

          {regularEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} featured={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for upcoming events!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal removed; direct to Google Forms via EventCard */}
    </div>
  )
}
