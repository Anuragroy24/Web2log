"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Loader2, Moon, Sun } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface Article {
  id: number
  title: string
  description: string
  readable_publish_date: string
  tag_list: string[]
  tags?: string[]
  user: {
    name: string
  }
  social_image: string
  url: string
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dev.to/api/articles?per_page=6")

        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }

        const data = await response.json()
        setArticles(data)
        setError(null)
      } catch (err) {
        setError("Error fetching projects. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
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
              <Link href="/projects" className="text-sm font-medium border-b-2 border-black dark:border-white">
                Projects
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
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
  
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center">PROJECTS</h1>
          <div className="border-t border-gray-500"></div>
  </div>
        </div>

        {/* List Project Heading */}
        <div className="mb-8">
          <h2 className="text-xl font-medium">List Project</h2>
        </div>

        {/* Projects */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <div className="space-y-12 mb-16">
            {/* First row - 2 projects side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(0, 2).map((article) => (
                <div key={article.id} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={article.social_image || "/placeholder.svg?height=300&width=500"}
                      alt={article.title}
                      width={500}
                      height={300}
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <Link href={article.url} target="_blank" className="group flex items-center">
                      <h3 className="text-xl font-bold group-hover:underline">{article.title}</h3>
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{article.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(article.tag_list || article.tags || []).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row - Full width project */}
            {articles.length > 2 && (
              <div className="w-full">
                <div className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={articles[2].social_image || "/placeholder.svg?height=400&width=1000"}
                      alt={articles[2].title}
                      width={1000}
                      height={400}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <Link href={articles[2].url} target="_blank" className="group flex items-center">
                      <h3 className="text-xl font-bold group-hover:underline">{articles[2].title}</h3>
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{articles[2].description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(articles[2].tag_list || articles[2].tags || []).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Third row - 2 projects side by side */}
            {articles.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.slice(3, 5).map((article) => (
                  <div key={article.id} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={article.social_image || "/placeholder.svg?height=300&width=500"}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <Link href={article.url} target="_blank" className="group flex items-center">
                        <h3 className="text-xl font-bold group-hover:underline">{article.title}</h3>
                        <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(article.tag_list || article.tags || []).slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
