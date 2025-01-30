"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, User, FileText, Calendar, BarChart, MessageSquare, HelpCircle } from "lucide-react"

// Prioritize the navigation items based on importance
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Query", href: "/query", icon: HelpCircle },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Tickets", href: "/tickets", icon: FileText },
  { name: "Insights", href: "/insights", icon: BarChart },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
]

export function Navbar() {
  const pathname = usePathname()

  // Don't render the navbar on the authentication page
  if (pathname === "/") return null

  return (
    <nav className="p-4 bg-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-3xl font-bold text-primary">FinServe</Link>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <motion.div
                  className={`flex items-center p-2 rounded-lg ${
                    pathname === item.href ? "text-primary" : "text-gray-600 hover:text-primary"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-6 h-6 mr-2" />
                  <span className="text-lg">{item.name}</span>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
