"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { TiptapEditor } from "@/components/tiptap-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Page {
  _id: string
  id: string
  title: string
  slug: string
  content: string
  menuId?: string
  published: boolean
  order?: number
}

interface Menu {
  _id: string
  id: string
  label: string
  pages: string[]
}

interface EditPageProps {
  params: {
    id: string
  }
}

export default function EditPage({ params }: EditPageProps) {
  const [page, setPage] = useState<Page | null>(null)
  const [menus, setMenus] = useState<Menu[]>([])
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [selectedMenuId, setSelectedMenuId] = useState<string>("none")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [pageResponse, menusResponse] = await Promise.all([fetch(`/api/pages/${params.id}`), fetch("/api/menu")])

      if (pageResponse.ok) {
        const pageData = await pageResponse.json()
        const pageInfo = pageData.page
        setPage(pageInfo)
        setTitle(pageInfo.title)
        setSlug(pageInfo.slug)
        setContent(pageInfo.content)
        setPublished(pageInfo.published)
        setSelectedMenuId(pageInfo.menuId || "none")
      }

      if (menusResponse.ok) {
        const menusData = await menusResponse.json()
        setMenus(menusData.menus)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load page data")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (page && (!slug || slug === generateSlug(page.title))) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const updateData = {
        title,
        slug,
        content,
        published,
        menuId: selectedMenuId === "none" ? undefined : selectedMenuId,
      }

      const response = await fetch(`/api/pages/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        // Update menu associations if changed
        if (page?.menuId !== selectedMenuId) {
          // Remove from old menu
          if (page?.menuId) {
            await fetch(`/api/menu/${page.menuId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                pages: menus.find((m) => m.id === page.menuId)?.pages.filter((p) => p !== params.id) || [],
              }),
            })
          }

          // Add to new menu
          if (selectedMenuId !== "none") {
            const targetMenu = menus.find((m) => m.id === selectedMenuId)
            if (targetMenu) {
              await fetch(`/api/menu/${selectedMenuId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  pages: [...targetMenu.pages, params.id],
                }),
              })
            }
          }
        }

        router.push("/admin/pages")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update page")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading page...</div>
      </AdminLayout>
    )
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-white">Page not found</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Page</h1>
          <p className="text-gray-400 mt-2">Update page content and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="bg-red-900/20 border-red-800">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Page Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter page title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-white">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="page-url-slug"
                />
                <div className="text-sm text-gray-400">URL: /{slug}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="menu" className="text-white">
                  Menu
                </Label>
                <Select value={selectedMenuId} onValueChange={setSelectedMenuId}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select a menu (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="none">No menu</SelectItem>
                    {menus.map((menu) => (
                      <SelectItem key={menu.id} value={menu.id} className="text-white">
                        {menu.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="published" checked={published} onCheckedChange={setPublished} />
                <Label htmlFor="published" className="text-white">
                  Published
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor content={content} onChange={setContent} placeholder="Write your page content here..." />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-black" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
