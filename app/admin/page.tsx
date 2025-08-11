import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Menu, Users, Eye } from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome to the HackTricks admin panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">--</div>
              <p className="text-xs text-gray-500">Published content</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Menu Items</CardTitle>
              <Menu className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">--</div>
              <p className="text-xs text-gray-500">Navigation items</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">--</div>
              <p className="text-xs text-gray-500">Page views</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Admin Users</CardTitle>
              <Users className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">--</div>
              <p className="text-xs text-gray-500">Active admins</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/pages/new"
                className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="font-medium text-white">Create New Page</div>
                <div className="text-sm text-gray-400">Add a new content page</div>
              </a>
              <a href="/admin/menus" className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="font-medium text-white">Manage Menus</div>
                <div className="text-sm text-gray-400">Edit navigation structure</div>
              </a>
              <a
                href="/admin/articles/new"
                className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="font-medium text-white">Write Article</div>
                <div className="text-sm text-gray-400">Create new article content</div>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Latest content updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400">No recent activity to display</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
