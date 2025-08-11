"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LogOut,
  Search,
  Bell,
  Settings,
  ChevronDown,
  LayoutDashboard,
  FileText,
  MenuIcon,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  HelpCircle,
} from "lucide-react"

interface User {
  id: string
  email: string
  username: string
  role: string
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push("/admin/login")
      }
    } catch (error) {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HT</span>
              </div>
              <h1 className="text-xl font-bold text-white">HackTricks</h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search or type command..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-400 bg-slate-600 px-2 py-1 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-white">{user.username}</div>
                <div className="text-xs text-slate-400">{user.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transition-transform duration-200 ease-in-out`}
        >
          <div className="p-6 pt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">MENU</div>
            <nav className="space-y-1">
              <a
                href="/admin"
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                <LayoutDashboard className="h-4 w-4 mr-3" />
                Dashboard
              </a>
              <a
                href="/admin/pages"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4 mr-3" />
                Pages
              </a>
              <a
                href="/admin/menus"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <MenuIcon className="h-4 w-4 mr-3" />
                Menus
              </a>
              <a
                href="/admin/analytics"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Analytics
              </a>
              <a
                href="/admin/users"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3" />
                Users
              </a>
            </nav>

            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">SUPPORT</div>
            <nav className="space-y-1">
              <a
                href="/admin/calendar"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Calendar className="h-4 w-4 mr-3" />
                Calendar
              </a>
              <a
                href="/admin/chat"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Chat
              </a>
              <a
                href="/admin/help"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Help
              </a>
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-slate-900 min-h-screen">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
