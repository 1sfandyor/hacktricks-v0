"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVertical, X } from "lucide-react"

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

interface EditMenuProps {
  params: {
    id: string
  }
}

export default function EditMenu({ params }: EditMenuProps) {
  const [menu, setMenu] = useState<Menu | null>(null)
  const [pages, setPages] = useState<Page[]>([])
  const [label, setLabel] = useState("")
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [menuResponse, pagesResponse] = await Promise.all([fetch(`/api/menu/${params.id}`), fetch("/api/pages")])

      if (menuResponse.ok) {
        const menuData = await menuResponse.json()
        const menuInfo = menuData.menu
        setMenu(menuInfo)
        setLabel(menuInfo.label)
        setSelectedPages(menuInfo.pages || [])
      }

      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPages(pagesData.pages.filter((page: Page) => page.published))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load menu data")
    } finally {
      setLoading(false)
    }
  }

  const handlePageToggle = (pageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId])
    } else {
      setSelectedPages(selectedPages.filter((id) => id !== pageId))
    }
  }

  const removePageFromMenu = (pageId: string) => {
    setSelectedPages(selectedPages.filter((id) => id !== pageId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const updateData = {
        label,
        pages: selectedPages,
      }

      const response = await fetch(`/api/menu/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        router.push("/admin/menus")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update menu")
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
        <div className="text-white">Loading menu...</div>
      </AdminLayout>
    )
  }

  if (!menu) {
    return (
      <AdminLayout>
        <div className="text-white">Menu not found</div>
      </AdminLayout>
    )
  }

  const selectedPagesData = selectedPages.map((pageId) => pages.find((p) => p.id === pageId)).filter(Boolean) as Page[]
  const availablePages = pages.filter((page) => !selectedPages.includes(page.id))

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Menu</h1>
          <p className="text-gray-400 mt-2">Update menu settings and page associations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="bg-red-900/20 border-red-800">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Menu Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label" className="text-white">
                  Menu Label
                </Label>
                <Input
                  id="label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter menu label"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Selected Pages ({selectedPages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPagesData.length === 0 ? (
                <div className="text-gray-400 text-center py-4">No pages selected</div>
              ) : (
                <div className="space-y-2">
                  {selectedPagesData.map((page) => (
                    <div key={page.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <GripVertical className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-white font-medium">{page.title}</div>
                          <div className="text-sm text-gray-400">/{page.slug}</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePageFromMenu(page.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Available Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {availablePages.length === 0 ? (
                <div className="text-gray-400 text-center py-4">All published pages are already in menus</div>
              ) : (
                <div className="space-y-3">
                  {availablePages.map((page) => (
                    <div key={page.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={page.id}
                        checked={selectedPages.includes(page.id)}
                        onCheckedChange={(checked) => handlePageToggle(page.id, checked as boolean)}
                      />
                      <Label htmlFor={page.id} className="text-white cursor-pointer flex-1">
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-gray-400">/{page.slug}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
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
