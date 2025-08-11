import { type NextRequest, NextResponse } from "next/server"
import { ArticleModel } from "@/lib/models/article"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const article = await ArticleModel.findBySlug(params.slug)

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Increment view count
    if (article._id) {
      await ArticleModel.incrementViews(article._id.toString())
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}
