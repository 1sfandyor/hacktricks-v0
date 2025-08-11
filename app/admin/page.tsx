import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Menu,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  MoreHorizontal,
  Calendar,
  CheckCircle,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome to HackTricks admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,234</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +20% last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45,210</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +9.0% last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Menu Items</CardTitle>
              <Menu className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -4.5% last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Statistics</CardTitle>
                <CardDescription className="text-slate-400">Target you've set for each month</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Monthly
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Quarterly
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Annually
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-white">$212,142.12</div>
                  <div className="text-sm text-slate-400">Avg. Yearly Profit</div>
                  <div className="text-xs text-green-500 mt-1">+23.2%</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">$30,321.23</div>
                  <div className="text-sm text-slate-400">Avg. Yearly Profit</div>
                  <div className="text-xs text-red-500 mt-1">-12.3%</div>
                </div>
              </div>
              <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-slate-400">Chart Placeholder</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Estimated Revenue</CardTitle>
                <CardDescription className="text-slate-400">Target you've set for each month</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 mb-6">
                <div className="relative w-32 h-32">
                  <div className="w-32 h-32 rounded-full border-8 border-slate-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-slate-400">June Goals</div>
                      <div className="text-2xl font-bold text-white">$90</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-400">Marketing</div>
                  <div className="text-sm text-white">$30,569.00</div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-400">Sales</div>
                  <div className="text-sm text-white">$20,486.00</div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "55%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/pages/new"
                className="flex items-center p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <FileText className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <div className="font-medium text-white">Create New Page</div>
                  <div className="text-sm text-slate-400">Add a new content page</div>
                </div>
              </a>
              <a
                href="/admin/menus"
                className="flex items-center p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <div className="font-medium text-white">Manage Menus</div>
                  <div className="text-sm text-slate-400">Edit navigation structure</div>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Upcoming Schedule</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Content Review</div>
                  <div className="text-xs text-slate-400">Wed, 11 Jan - 09:20 AM</div>
                </div>
                <CheckCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Security Update</div>
                  <div className="text-xs text-slate-400">Fri, 15 Feb - 02:30 PM</div>
                </div>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
