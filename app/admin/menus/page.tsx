"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"

interface Menu {
  _id: string
  id: string
  label: string
  pages: string[]
  order?: number
  createdAt: string
  updatedAt: string
}

export default function MenuManagement() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [newMenuLabel, setNewMenuLabel] = useState("")
  const [showNewMenu, setShowNewMenu] = useState(false)

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const response = await fetch("/api/menu")
      if (response.ok) {
        const data = await response.json()
        setMenus(data.menus)
      }
    } catch (error) {
      console.error("Error fetching menus:", error)
    } finally {
      setLoading(false)
    }
  }

  const createMenu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMenuLabel.trim()) return

    try {
      const menuData = {
        id: newMenuLabel.toLowerCase().replace(/\s+/g, "-"),
        label: newMenuLabel,
        pages: [],
        order: menus.length,
      }

      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      })

      if (response.ok) {
        const data = await response.json()
        setMenus([...menus, data.menu])
        setNewMenuLabel("")
        setShowNewMenu(false)
      }
    } catch (error) {
      console.error("Error creating menu:", error)
    }
  }

  const deleteMenu = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu?")) return

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMenus(menus.filter((menu) => menu.id !== id))
      }
    } catch (error) {
      console.error("Error deleting menu:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white">Loading menus...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Menu Management</h1>
            <p className="text-gray-400 mt-2">Manage your website navigation structure</p>
          </div>
          <Button onClick={() => setShowNewMenu(true)} className="bg-yellow-600 hover:bg-yellow-700 text-black">
            <Plus className="h-4 w-4 mr-2" />
            New Menu
          </Button>
        </div>

        {showNewMenu && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Create New Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createMenu} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="menuLabel" className="text-white">
                    Menu Label
                  </Label>
                  <Input
                    id="menuLabel"
                    value={newMenuLabel}
                    onChange={(e) => setNewMenuLabel(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter menu label"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-black">
                    Create Menu
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowNewMenu(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {menus.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400">No menus found. Create your first menu to get started.</div>
                <Button
                  onClick={() => setShowNewMenu(true)}
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-black"
                >
                  Create First Menu
                </Button>
              </CardContent>
            </Card>
          ) : (
            menus.map((menu) => (
              <Card key={menu.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-5 w-5 text-gray-500" />
                      <div>
                        <CardTitle className="text-white">{menu.label}</CardTitle>
                        <div className="text-sm text-gray-400">ID: {menu.id}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/menus/${menu.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMenu(menu.id)} className="text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400">
                    {menu.pages.length} pages • Updated: {new Date(menu.updatedAt).toLocaleDateString()}
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
