import { type NextRequest, NextResponse } from "next/server"
import { MenuModel } from "@/lib/models/menu"

export async function GET() {
  try {
    const menus = await MenuModel.findAll()
    return NextResponse.json({ menus })
  } catch (error) {
    console.error("Error fetching menus:", error)
    return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const menu = await MenuModel.create(body)
    return NextResponse.json({ menu }, { status: 201 })
  } catch (error) {
    console.error("Error creating menu:", error)
    return NextResponse.json({ error: "Failed to create menu" }, { status: 500 })
  }
}
