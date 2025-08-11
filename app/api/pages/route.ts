import { type NextRequest, NextResponse } from "next/server"
import { PageModel } from "@/lib/models/page"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const menuId = searchParams.get("menuId")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    let pages
    if (menuId) {
      pages = await PageModel.findByMenuId(menuId)
    } else {
      pages = await PageModel.findAll()
    }

    return NextResponse.json({ pages })
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const page = await PageModel.create(body)
    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
