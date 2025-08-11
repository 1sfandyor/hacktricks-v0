import { getDatabase } from "../mongodb"
import { ObjectId } from "mongodb"

export interface Article {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  category: string
  tags: string[]
  author: string
  createdAt: Date
  updatedAt: Date
  published: boolean
  views: number
}

export class ArticleModel {
  static async create(articleData: Omit<Article, "_id" | "createdAt" | "updatedAt" | "views">): Promise<Article> {
    const db = await getDatabase()
    const article: Article = {
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    }

    const result = await db.collection<Article>("articles").insertOne(article)
    return { ...article, _id: result.insertedId }
  }

  static async findBySlug(slug: string): Promise<Article | null> {
    const db = await getDatabase()
    return await db.collection<Article>("articles").findOne({ slug, published: true })
  }

  static async findByCategory(category: string, limit = 10): Promise<Article[]> {
    const db = await getDatabase()
    return await db
      .collection<Article>("articles")
      .find({ category, published: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async incrementViews(id: string): Promise<void> {
    const db = await getDatabase()
    await db.collection<Article>("articles").updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
  }

  static async getPopular(limit = 5): Promise<Article[]> {
    const db = await getDatabase()
    return await db.collection<Article>("articles").find({ published: true }).sort({ views: -1 }).limit(limit).toArray()
  }
}
