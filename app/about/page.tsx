"use client"

import Link from "next/link"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
// import { Switch } from "@/components/ui/switch"
// import { Switch } from "@radix-ui/react-switch"
// import { Switch } from "@/components/ui/switch"
// Update the import path below to the correct location of your Switch component:
// Simple Switch component for theme toggling
type SwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}
function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? "bg-black" : "bg-gray-300"
      } relative`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  )
}
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a1a] text-black dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link href="/" className="text-lg font-medium">
            Anurag
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link href="/about" className="text-sm font-medium border-b-2 border-black dark:border-white">
                About
              </Link>
              <Link
                href="/newsletter"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Newsletter
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4 dark:text-white text-gray-600" />
            </div>
          </div>
        </header>

        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-12"></div>

        {/* Hero */}
        <div className="mb-16">
         <div className="w-full">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center">ANURAG</h1>
           <div className="border-t border-gray-500"></div>
  </div>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <Image
              src="https://github.com/user-attachments/assets/090f9b49-a8f7-4ab3-9e1a-3770f45727c0?height=600&width=600&text=Profile"
              alt="Profile"
              width={600}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Hello, I'm Anurag</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I'm a passionate developer and designer with over 1 years of experience creating digital products and
              experiences. I specialize in frontend development, UI/UX design, and building accessible web applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Previously I worked as a Software Engineering Intern at Astrocare (Dr. Pashu), where I played a pivotal role in taking the product from 0 to 1 by leading frontend development and UI/UX design. I built a high-performance React application with seamless cross-device functionality, integrated Agora for video consultations, and developed a dynamic Q&A section with full CRUD capabilities.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              When I'm not coding, you can find me hiking, reading, or experimenting with new technologies. I also enjoy
              writing about web development, design patterns, and productivity on my blog.
            </p>

            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="grid grid-cols-2 gap-2 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>JavaScript / TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>React / Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>HTML / CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>UI/UX Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>Node.js</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                <span>Tailwind CSS</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Feel free to reach out to me at{" "}
              <a href="mailto:email@example.com" className="underline">
                21cs3005@rgipt.ac.in
              </a>{" "}
              or connect with me on social media.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 pt-6 pb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">© 2023</div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Email
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                RSS feed
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Add to Feedly
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
