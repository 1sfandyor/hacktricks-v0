import { type NextRequest, NextResponse } from "next/server"
import { MenuModel } from "@/lib/models/menu"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const menu = await MenuModel.findById(params.id)

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 })
    }

    return NextResponse.json({ menu })
  } catch (error) {
    console.error("Error fetching menu:", error)
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const menu = await MenuModel.update(params.id, body)

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 })
    }

    return NextResponse.json({ menu })
  } catch (error) {
    console.error("Error updating menu:", error)
    return NextResponse.json({ error: "Failed to update menu" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await MenuModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Menu deleted successfully" })
  } catch (error) {
    console.error("Error deleting menu:", error)
    return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 })
  }
}
