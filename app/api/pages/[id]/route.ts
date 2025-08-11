import { type NextRequest, NextResponse } from "next/server"
import { PageModel } from "@/lib/models/page"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const page = await PageModel.findById(params.id)

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Increment view count for published pages
    if (page.published) {
      await PageModel.incrementViews(params.id)
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const page = await PageModel.update(params.id, body)

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await PageModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
