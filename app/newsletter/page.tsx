"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Loader2, Moon, Sun } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
import { Badge } from "../../components/ui/badge"
// import { Switch } from "@/components/ui/switch"
import { Button } from "../../components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function NewsletterPage() {
  const [mounted, setMounted] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dev.to/api/articles?per_page=3")

        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }

        const data = await response.json()
        setArticles(data)
        setError(null)
      } catch (err) {
        setError("Error fetching articles. Please try again later.")
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
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
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link href="/newsletter" className="text-sm font-medium border-b-2 border-black dark:border-white">
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

        {/* Newsletter Section */}
        <div className="text-center mb-20 py-16">
          <div className="mb-4">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">Newsletters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Stories and interviews</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to learn about new product features, the latest in technology, solutions, and updates.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
              Subscribe
            </Button>
          </form>

          {subscribed && (
            <div className="text-green-600 dark:text-green-400 text-sm mb-4">
              Thank you for subscribing to our newsletter!
            </div>
          )}

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            We care about your data in our{" "}
            <Link href="#" className="underline">
              privacy policy
            </Link>
          </p>
        </div>

        {/* All blog posts */}
        <div className="mb-16">
          <h2 className="text-xl font-medium mb-8">All blog posts</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">Loading articles...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="relative group">
                  <Image
                    src={article.social_image || "/placeholder.svg?height=200&width=400"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-[200px]"
                  />
                  <div className="mt-4">
                    <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">
                      {article.readable_publish_date}
                    </div>
                    <Link href={article.url} target="_blank" className="group flex items-center">
                      <h3 className="text-lg font-bold group-hover:underline">{article.title}</h3>
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{article.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(article.tag_list || article.tags || []).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs rounded-full">
                          {tag}
                        </Badge>
                      ))}
                      {article.user?.name && (
                        <Badge variant="outline" className="text-xs rounded-full ml-auto">
                          By {article.user.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
