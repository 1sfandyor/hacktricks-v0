"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

interface Page {
  _id: string
  id: string
  title: string
  slug: string
  published: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export default function PagesManagement() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/pages")
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages)
      }
    } catch (error) {
      console.error("Error fetching pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return

    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPages(pages.filter((page) => page.id !== id))
      }
    } catch (error) {
      console.error("Error deleting page:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading pages...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Page Management</h1>
            <p className="text-gray-400 mt-2">Manage your website pages and content</p>
          </div>
          <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-black">
            <a href="/admin/pages/new">
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </a>
          </Button>
        </div>

        <div className="grid gap-4">
          {pages.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400">No pages found. Create your first page to get started.</div>
                <Button asChild className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-black">
                  <a href="/admin/pages/new">Create First Page</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            pages.map((page) => (
              <Card key={page.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{page.title}</CardTitle>
                      <div className="text-sm text-gray-400 mt-1">/{page.slug}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "Published" : "Draft"}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <Eye className="h-4 w-4 mr-1" />
                        {page.views}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Updated: {new Date(page.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/pages/${page.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deletePage(page.id)} className="text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
