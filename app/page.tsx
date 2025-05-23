"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Loader2, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

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

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const articlesPerPage = 6

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dev.to/api/articles?page=${currentPage}&per_page=${articlesPerPage}`)

        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }

        const data = await response.json()
        setArticles(data)

        const totalCount = Number.parseInt(response.headers.get("X-Total-Count") || "100")
        setTotalPages(Math.ceil(totalCount / articlesPerPage))

        setError(null)
      } catch (err) {
        setError("Error fetching articles. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [currentPage])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Prevent hydration mismatch
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
              <Link href="/" className="text-sm font-medium border-b-2 border-black dark:border-white">
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
        <div className="mb-16 items-center">
        <div className="w-full">
   
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-center">THE BLOG</h1>
          <div className="border-t border-gray-500"></div>
  </div>
        </div>

        {/* Recent blog posts - Static */}
        <div className="mb-16">
          <h2 className="text-xl font-medium mb-8">Recent blog posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group">
                <Image
                  src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/blog-post-1600-x-840-px-62b97ad78c643-sej-1280x720.png?height=300&width=600"
                  alt="Office workspace"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
                <div className="mt-4">
                  <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">Sunday, 3 Jan 2023</div>
                  <Link href="#" className="group flex items-center">
                    <h3 className="text-xl font-bold group-hover:underline">UX review presentations</h3>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    How do you make compelling presentations that wow your colleagues and impress your managers?
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs rounded-full">
                      Design
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Research
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Presentation
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTv-HPARG0XGK1Zj_gh6z59HAan9GlrK2zEw&s?height=300&width=600"
                  alt="Climate change visualization"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
                <div className="mt-4">
                  <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">Sunday, 3 Jan 2023</div>
                  <Link href="#" className="group flex items-center">
                    <h3 className="text-xl font-bold group-hover:underline">
                      Climate Endgame: Exploring catastrophic climate change scenarios
                    </h3>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs rounded-full">
                      Climate
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Research
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjool0svz6L-f8T7bYxtMEi8TXM9Dhf_o6sniAhJ0NcKDJUipe3Vp9vuDdNBvOddWadM&usqp=CAU?height=300&width=600"
                  alt="People working on computers"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
                <div className="mt-4">
                  <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">Sunday, 3 Jan 2023</div>
                  <Link href="#" className="group flex items-center">
                    <h3 className="text-xl font-bold group-hover:underline">Migrating to Linear 101</h3>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get
                    started.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs rounded-full">
                      Tools
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Workflow
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnGDk-iri0r6e-OU1nqQ2pbvIVsTiwwplgw&s?height=300&width=600"
                  alt="Developer workspace"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
                <div className="mt-4">
                  <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">Sunday, 3 Jan 2023</div>
                  <Link href="#" className="group flex items-center">
                    <h3 className="text-xl font-bold group-hover:underline">Building your API Stack</h3>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    The rise of API-first companies has been met by a rise in tools for creating, testing, and deploying
                    APIs.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs rounded-full">
                      Tools
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Developer
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative group">
              <Image
                src="https://freeshopps.com/blogs/smartest-applications-for-business/featured-IS0BsikA.jpg?height=900&width=1200"
                alt="Grid system visualization"
                width={1200}
                height={900}
                className="rounded-lg object-cover w-full h-[200px]"
              />
              <div className="mt-4">
                <div className="text-purple-600 dark:text-purple-400 text-sm mb-1">Sunday, 3 Jan 2023</div>
                <div className="flex justify-between items-start">
                  <div>
                    <Link href="#" className="group flex items-center">
                      <h3 className="text-xl font-bold group-hover:underline">
                        Grid system for better Design User Interface
                      </h3>
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      A grid system is a design tool used to arrange content on a webpage. It is a set of vertical and
                      horizontal lines that create a matrix of intersecting points, which can be used to align and
                      organize page elements. Grid systems help to make the layout more visually appealing and easier to
                      navigate.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs rounded-full">
                    Design
                  </Badge>
                  <Badge variant="outline" className="text-xs rounded-full">
                    Interface
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All blog posts - Dynamic from API */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6 pb-8">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageToShow = i + 1
              if (currentPage > 3 && totalPages > 5) {
                pageToShow = currentPage - 2 + i
                if (pageToShow > totalPages) {
                  pageToShow = totalPages - (4 - i)
                }
              }

              return (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${currentPage === pageToShow ? "bg-black text-white dark:bg-white dark:text-black" : ""}`}
                  onClick={() => handlePageClick(pageToShow)}
                  disabled={loading}
                >
                  {pageToShow}
                </Button>
              )
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-gray-600 dark:text-gray-400">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageClick(totalPages)}
                  disabled={loading}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
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
