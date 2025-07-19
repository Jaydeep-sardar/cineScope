import React from "react"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Crown } from "lucide-react"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    movies: [
      { name: "Popular", href: "/?category=popular" },
      { name: "Top Rated", href: "/?category=top_rated" },
      { name: "Now Playing", href: "/?category=now_playing" },
      { name: "Upcoming", href: "/?category=upcoming" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Report Issue", href: "/report" },
      { name: "Feedback", href: "/feedback" },
    ]
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                CineScope
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your premium destination for discovering the latest movies and timeless classics. Experience cinema like never before.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Movies Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Movies</h3>
            <ul className="space-y-2">
              {footerLinks.movies.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {2025} CineScope. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <p className="text-gray-500 text-xs">
                Powered by TMDB
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
