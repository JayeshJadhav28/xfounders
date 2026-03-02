import Link from "next/link"
import Image from "next/image"
import { Rocket, Mail, MapPin, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            {/*<div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading">XFounders</span>
                <p className="text-sm text-gray-400 -mt-1">DIET Satara</p>
              </div>
            </div>*/}
            <Link href="/" className="inline-flex items-center group" aria-label="XFounders Home">
              <Image
                src="/XFounders.png"
                alt="XFounders logo"
                width={160}
                height={160}
                className="h-12 w-auto object-contain drop-shadow-[0_0_0px_rgba(255,140,0,0.8)]"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Building Tomorrow's Entrepreneurs at DIET Satara. Join our startup community and transform your ideas into
              reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/oFbQCxu9M9jTJsJX8" target="_blank" rel="noopener noreferrer">
                <span className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                  Dnyanshree Institute of Engineering & Technology, Satara
                  <br />
                  A/P- Sonwadi-Gajawadi, Sajjangad Road, Satara-415013.
                </span>
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-500" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=xfounders.ecell@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                  xfounders.ecell@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/xfounders-diet"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/xfounders_official"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} XFounders - Entrepreneurship Cell, DIET Satara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
