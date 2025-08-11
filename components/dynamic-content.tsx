"use client"

import { useState, useEffect } from "react"

interface Page {
  _id: string
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  views: number
}

interface DynamicContentProps {
  slug?: string
}

export function DynamicContent({ slug }: DynamicContentProps) {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchPageBySlug(slug)
    } else {
      fetchHomePage()
    }
  }, [slug])

  const fetchPageBySlug = async (pageSlug: string) => {
    try {
      const response = await fetch(`/api/pages?slug=${pageSlug}`)
      if (response.ok) {
        const data = await response.json()
        const foundPage = data.pages.find((p: Page) => p.slug === pageSlug && p.published)
        setPage(foundPage || null)
      }
    } catch (error) {
      console.error("Error fetching page:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHomePage = async () => {
    try {
      // Try to find a page with slug 'home' or 'index'
      const response = await fetch("/api/pages")
      if (response.ok) {
        const data = await response.json()
        const homePage = data.pages.find(
          (p: Page) => (p.slug === "home" || p.slug === "index" || p.slug === "hacktricks") && p.published,
        )
        setPage(homePage || null)
      }
    } catch (error) {
      console.error("Error fetching home page:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="text-white">Loading content...</div>
        </div>
      </main>
    )
  }

  if (page) {
    return (
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">{page.title}</h1>
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </main>
    )
  }

  // Fallback to static content if no dynamic page found
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">HackTricks</h1>

        {/* Video/Animation Area */}
        <div className="bg-black rounded-lg p-8 mb-8 flex items-center justify-center min-h-[300px]">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hacktricks-Jgc2BvgpFbZKtGb0gEdXFz5HPczGtx.gif"
            alt="HackTricks Animation"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <p className="text-blue-400 text-sm mb-8">
          HackTricks logos & motion design by{" "}
          <a href="#" className="underline">
            @ppieranacho
          </a>
          .
        </p>

        {/* Installation Instructions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Run HackTricks Locally</h2>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-300 mb-2">bash</div>
            <div className="text-gray-400 mb-1"># Download latest version of hacktricks</div>
            <div className="text-green-400 mb-3">git clone https://github.com/HackTricks-wiki/hacktricks</div>

            <div className="text-gray-400 mb-1"># Select the language you want to use</div>
            <div className="text-yellow-400 mb-1">export LANG="master" # Leave master for english</div>
            <div className="text-gray-400 mb-1"># "af" for Afrikaans</div>
            <div className="text-gray-400 mb-1"># "de" for German</div>
            <div className="text-gray-400 mb-1"># "el" for Greek</div>
            <div className="text-gray-400 mb-1"># "es" for Spanish</div>
            <div className="text-gray-400 mb-1"># "fr" for French</div>
            <div className="text-gray-400 mb-1"># "hi" for Hindi</div>
            <div className="text-gray-400 mb-1"># "it" for Italian</div>
            <div className="text-gray-400 mb-1"># "ja" for Japanese</div>
          </div>
        </div>
      </div>
    </main>
  )
}
