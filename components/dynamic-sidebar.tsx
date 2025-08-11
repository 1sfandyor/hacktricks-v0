"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface Menu {
  _id: string
  id: string
  label: string
  pages: string[]
  order?: number
}

interface Page {
  _id: string
  id: string
  title: string
  slug: string
  published: boolean
}

export function DynamicSidebar() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [menusResponse, pagesResponse] = await Promise.all([fetch("/api/menu"), fetch("/api/pages")])

      if (menusResponse.ok) {
        const menusData = await menusResponse.json()
        setMenus(menusData.menus)
      }

      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPages(pagesData.pages.filter((page: Page) => page.published))
      }
    } catch (error) {
      console.error("Error fetching sidebar data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPagesByMenuId = (menuId: string) => {
    const menu = menus.find((m) => m.id === menuId)
    if (!menu) return []

    return menu.pages.map((pageId) => pages.find((p) => p.id === pageId)).filter(Boolean) as Page[]
  }

  const getMenuIcon = (menuId: string) => {
    switch (menuId) {
      case "welcome":
        return "👋"
      case "generic":
        return "🔧"
      case "hacking":
        return "💻"
      default:
        return "📁"
    }
  }

  const getMenuColor = (menuId: string) => {
    switch (menuId) {
      case "welcome":
        return "text-purple-400"
      case "generic":
        return "text-orange-400"
      case "hacking":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  if (loading) {
    return (
      <aside className="w-80 bg-gray-900 border-r border-gray-800 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="text-gray-400">Loading navigation...</div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-80 bg-gray-900 border-r border-gray-800 h-screen overflow-y-auto">
      <div className="p-4 space-y-2">
        {menus.map((menu) => {
          const menuPages = getPagesByMenuId(menu.id)

          return (
            <div key={menu.id} className="mb-6">
              <div className={`flex items-center space-x-2 ${getMenuColor(menu.id)} mb-3`}>
                <span className="text-sm">{getMenuIcon(menu.id)}</span>
                <span className="font-semibold text-sm">{menu.label.toUpperCase()}</span>
              </div>
              <div className="ml-4 space-y-2">
                {menuPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between">
                    <a href={`/${page.slug}`} className="text-gray-400 hover:text-gray-300 text-sm">
                      {page.title}
                    </a>
                    <ChevronRight className="w-3 h-3 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Fallback static content if no menus exist */}
        {menus.length === 0 && (
          <>
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-purple-400 mb-3">
                <span className="text-sm">👋</span>
                <span className="font-semibold">WELCOME!</span>
              </div>
              <div className="ml-4 space-y-2">
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  HackTricks
                </a>
                <a href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
                  HackTricks Values & FAQ
                </a>
                <a href="#" className="block text-gray-400 hover:text-gray-300 text-sm">
                  About the author
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
