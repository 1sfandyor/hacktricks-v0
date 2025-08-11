import { Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { DynamicContent } from "@/components/dynamic-content"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-bold text-white hover:text-gray-300">
              HackTricks
            </a>
          </div>
          <nav className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Hacktricks Training
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Sponsor
            </a>
            <Search className="w-4 h-4 text-gray-400" />
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-xs">Translations</span>
          </nav>
        </div>
      </header>

      <div className="flex">
        <DynamicSidebar />
        <DynamicContent slug={slug} />

        {/* Right Sidebar */}
        <aside className="w-80 bg-gray-900 border-l border-gray-800 h-screen overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-blue-400 font-semibold mb-4">HackTricks</h3>
              <div className="space-y-2 text-sm">
                <a href="/" className="block text-gray-300 hover:text-white">
                  Home
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Run HackTricks Locally
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Corporate Sponsors
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  STM Cyber
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  RootedCON
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Intigriti
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Trickest
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  HACKENPROOF
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Pentest-Tools.com
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  SerpApi
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  8kSec Academy – In-Depth Mobile Security Courses
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  WebSec
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Venacus
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  CyberHelmets
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Last Tower Solutions
                </a>
              </div>
            </div>

            {/* STM Cyber Sponsor Section */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sponsor_stm-Gs5dKll2tbuYGpLnHj8krnSwJjT0Yp.png"
                alt="STM Cyber Logo"
                className="w-full max-w-[200px] mx-auto mb-3"
              />
              <h4 className="text-white font-semibold mb-3">STM Cyber</h4>
              <Button variant="outline" size="sm" className="w-full bg-white text-black hover:bg-gray-100">
                Learn more
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
