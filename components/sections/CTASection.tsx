import Link from "next/link"
import { ArrowRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container-custom">
        <div className="text-center text-white">
          {/* Main Heading */}
          {/*<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
            Ready to Start Your Entrepreneurial Journey?
          </h2>*/}

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Join XFounders today and transform your innovative ideas into successful startups. Connect with like-minded
            entrepreneurs and access the resources you need to succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/events">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 group">
                <Calendar className="mr-2 h-5 w-5" />
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/team">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 text-lg rounded-lg transition-all duration-200 transform hover:scale-105">
                <Users className="mr-2 h-5 w-5" />
                Meet the Team
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Regular Events</h3>
              <p className="opacity-90">Workshops, bootcamps, and networking sessions every month</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
              <p className="opacity-90">Get guidance from experienced entrepreneurs and industry experts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Launch Support</h3>
              <p className="opacity-90">Resources and support to help you launch your startup successfully</p>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  )
}
