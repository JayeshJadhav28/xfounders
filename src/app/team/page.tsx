"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TeamMemberCard from "@/components/team/TeamMemberCard"

// Mock team data - replace with actual team information
const teamMembers = [
  {
    id: "1",
    name: "Tanvir Mujawar",
    role: "Lead",
    team: "Core Team",
    department: "Computer Science & Engineering",
    photo: "/Tanvir.png",
    linkedinUrl: "https://www.linkedin.com/in/tanvir-mujawar-7573012aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "tanvirmujawar7793@gmail.com",
    bio: "Leads the team, sets vision, and ensures smooth execution.",
  },
  {
    id: "2",
    name: "Sumit Meher",
    role: "Co-Lead",
    team: "Core Team",
    department: "",
    photo: "/Sumit.png",
    linkedinUrl: "https://www.linkedin.com/in/sumit-meher-34a8222aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    email: "mehersumit06@gmail.com",
    bio: "Supports leadership, connects teams, and keeps plans on track.",
  },
  {
    id: "3",
    name: "Jayesh Jadhav",
    role: "Tech Lead",
    team: "Technical Team",
    department: "Computer Science & Engineering",
    photo: "/Jayesh_Jadhav.png",
    linkedinUrl: "https://www.linkedin.com/in/jayesh-jadhav-connect/",
    email: "jayeshjadhav6480@gmail.com",
    bio: "The backbone of all technical setups and systems.",
  },
  {
    id: "4",
    name: "Savidhan Pathade",
    role: "Marketing Head",
    team: "Marketing Team",
    department: "Computer Science Engineering",
    photo: "/Sanvidhan.jpg",
    linkedinUrl: "",
    email: "Savidhanpathade007@gmail.com",
    bio: "Creates marketing plans to promote events.",
  },
  {
    id: "5",
    name: "Disha Mahadik",
    role: "Execution Head",
    team: "Event Management Team",
    department: "Mechanical Engineering",
    photo: "/Disha.png",
    linkedinUrl: "https://www.linkedin.com/in/disha-mahadik-905b74318?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B1qPCrtJfQlaXBf64DbAirg%3D%3D",
    email: "dishaaaa2903@gmail.com",
    bio: "Executes event plans with attention to detail.",
  },
  {
    id: "6",
    name: "Nikhil Chavan",
    role: "Finance Head",
    team: "Core Team",
    department: "Electronics & Communication",
    photo: "/Nikhil.png",
    linkedinUrl: "https://www.linkedin.com/in/nikhil-chavan-b12118343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "nikhilchavan5566@gmail.com",
    bio: "Handles budgets, expenses, and financial planning.",
  },
  // Add more team members to reach 21 total
  {
    id: "7",
    name: "Riya Jadhav",
    role: "Content Head",
    team: "Marketing Team",
    department: "Computer Science Engineering",
    photo: "/Riya.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/riya-jadhav2006?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "jadhavrriya@gmail.com",
    bio: "Writes engaging content for promotions.",
  },
  {
    id: "8",
    name: "Gautam Aghav",
    role: "Design Head",
    team: "Marketing Team",
    department: "Information Technology",
    photo: "/Gautam.png",
    linkedinUrl: "https://www.linkedin.com/in/gautam-aghav-44a8092aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "aghavgautam96@gmail.com",
    bio: "Designs graphics and visuals for branding.",
  },
  {
    id: "9",
    name: "Pratik Ghodke",
    role: "Sponsorship Head",
    team: "Outreach Team",
    department: "Mechanical Engineering",
    photo: "/Pratik.jpg",
    linkedinUrl: "https://www.linkedin.com/in/pratik-ghodke-a7988b262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "pratikghodke526@gmail.com",
    bio: "Secures sponsors and partnerships.",
  },
  {
    id: "10",
    name: "Siddharth Sutar",
    role: "Operations Head",
    team: "Core Team",
    department: "Civil Engineering",
    photo: "/siddhart.jpeg",
    linkedinUrl: "",
    email: "siddharthsutar2208@gmail.com",
    bio: "Manages logistics, schedules, and event operations.",
  },
  // Continue with more members...
  {
    id: "11",
    name: "Omkar Sondage",
    role: "Research Head",
    team: "Research Team",
    department: "Electrical Engineering",
    photo: "/Omkar.png",
    linkedinUrl: "https://www.linkedin.com/in/omkar-sondage-71340a306?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BgJ4Nm58wROSPuj1XY40GWA%3D%3D",
    email: "omkarsondage@gmail.com",
    bio: "Analyzes data for better event decisions.",
  },
  {
    id: "12",
    name: "Om Tingare",
    role: "Campus Relations Head",
    team: "Outreach Team",
    department: "Electronics & Communication",
    photo: "/Om.png",
    linkedinUrl: "https://www.linkedin.com/in/om-tingare-431a86379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    email: "omtingare04@gmail.com",
    bio: "Builds connections within the campus community.",
  },
  {
    id: "13",
    name: "Yashashree Chavan",
    role: "Event Head",
    team: "Event Management Team",
    department: "Computer Science Engineering",
    photo: "/Yashashree.png",
    linkedinUrl: "https://www.linkedin.com/in/yashashree-chavan-79613a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "yashashreechavan81@gmail.com",
    bio: "Plans and oversees events from start to finish.",
  },
  {
    id: "14",
    name: "Shruti Shelar",
    role: "Speaker Manager",
    team: "Outreach Team",
    department: "Information Technology",
    photo: "/Shruti.png",
    linkedinUrl: "https://www.linkedin.com/in/shruti-shelar-a4781a2b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "shelarshruti543@gmail.com",
    bio: "Coordinates and manages event speakers.",
  },
  {
    id: "15",
    name: "Aditya Devkate",
    role: "Task Head",
    team: "Research Team",
    department: "Mechanical Engineering",
    photo: "Aditya.png",
    linkedinUrl: "https://www.linkedin.com/in/aditya-devkate-2134212b6?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bpp%2BnEshGSVKLyN16j%2BjBxA%3D%3D",
    email: "adityad1729@gmail.com",
    bio: "Ensures tasks are completed and documented.",
  },
  {
    id: "16",
    name: "Sampada Ghorpade",
    role: "Hospitality Head",
    team: "Event Management Team",
    department: "Civil Engineering",
    photo: "/Sampada.jpg",
    linkedinUrl: "https://www.linkedin.com/in/sampada-ghorpade-50789a2a9?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bh5jtO0RZQZWCpous%2F0eG0g%3D%3D",
    email: "sampadaghorpade0905@gmail.com",
    bio: "Ensures guests and participants feel welcome.",
  },
  {
    id: "17",
    name: "Nishant Pisal",
    role: "Innovation Head",
    team: "Technical Team",
    department: "Electrical Engineering",
    photo: "/Nishant.jpg",
    linkedinUrl: "https://www.linkedin.com/in/nishant-pisal-2237a9287?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BYiNQPtN2ThmKpmAnotDvJQ%3D%3D",
    email: "Pisalnishant54@gmail.com",
    bio: "Introduces creative and innovative ideas.",
  },
  {
    id: "18",
    name: "Yash Wadkar",
    role: "Survey Head",
    team: "Research Team",
    department: "Electronics & Communication",
    photo: "/Yash.png",
    linkedinUrl: "https://www.linkedin.com/in/yash-wadkar-0147542a9?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbCTlrfAfQlma5yoM8lIvNA%3D%3D",
    email: "wadkary392@gmail.com",
    bio: "Collects feedback through surveys.",
  },
  {
    id: "19",
    name: "Karan Gaikwad",
    role: "Project Head",
    team: "Technical Team",
    department: "Computer Science Engineering",
    photo: "/Karan.png",
    linkedinUrl: "https://www.linkedin.com/in/karan-gaikwad-86a52432a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "karanggaikwad07@gmail.com",
    bio: "Manages technical projects and deadlines.",
  },
  {
    id: "20",
    name: "Suyash Shinde",
    role: "Social Media Head",
    team: "Marketing Team",
    department: "Information Technology",
    photo: "/Suyash.png",
    linkedinUrl: "https://www.linkedin.com/in/suyash-shinde-4a2628302?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BnNm36SiNThK0ZdN67RY5ZQ%3D%3D",
    email: "suyashshinde000777@gmail.com",
    bio: "Manages social media and online presence.",
  },
  {
    id: "21",
    name: "Sofiya Mujawar",
    role: "Volunteer Head",
    team: "Event Management Team",
    department: "Mechanical Engineering",
    photo: "/Sofiya.png",
    linkedinUrl: "https://www.linkedin.com/in/sofiya-mujawar-24bb152ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "sofiyamujawar827@gmail.com",
    bio: "Leads, trains, and manages volunteer teams.",
  },
]

const teams = [
  "All",
  "Core Team",
  "Event Management Team",
  "Marketing Team",
  "Technical Team",
  "Outreach Team",
  "Research Team",
]

export default function TeamPage() {
  const [filteredMembers, setFilteredMembers] = useState(teamMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    let filtered = teamMembers

    // Filter by team
    if (selectedTeam !== "All") {
      filtered = filtered.filter((member: any) => member.team === selectedTeam)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((member: any) => {
        const team = member.team || ""
        return (
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          team.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
    }

    setFilteredMembers(filtered)
  }, [searchQuery, selectedTeam])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container-custom">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Meet Our Team</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              The passionate individuals driving entrepreneurship and innovation at DIET Delhi. Get to know the leaders
              behind XFounders.
            </p>
          </div>
        </div>
      </section> */}

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-field"
              />
            </div>

            {/* Team Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-gray-500" />
              {teams.map((team) => (
                <Button
                  key={team}
                  variant={selectedTeam === team ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTeam(team)}
                  className={`text-xs ${selectedTeam === team ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                >
                  {team}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      {/* <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">Want to Join Our Team?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for passionate individuals who want to make a difference in the entrepreneurship
              ecosystem. Join us in building the future!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">Apply Now</Button>
              <Button variant="outline" className="text-lg px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}