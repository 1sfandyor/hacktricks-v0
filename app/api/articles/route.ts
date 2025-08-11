import { type NextRequest, NextResponse } from "next/server"
import { ArticleModel } from "@/lib/models/article"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let articles
    if (category) {
      articles = await ArticleModel.findByCategory(category, limit)
    } else {
      articles = await ArticleModel.getPopular(limit)
    }

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const article = await ArticleModel.create(body)
    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}
