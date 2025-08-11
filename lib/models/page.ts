import { getDatabase } from "../mongodb"
import type { ObjectId } from "mongodb"

export interface Page {
  _id?: ObjectId
  id: string
  title: string
  slug: string
  content: string
  menuId?: string
  published: boolean
  order?: number
  createdAt: Date
  updatedAt: Date
  views: number
}

export class PageModel {
  static async create(pageData: Omit<Page, "_id" | "createdAt" | "updatedAt" | "views">): Promise<Page> {
    const db = await getDatabase()
    const page: Page = {
      ...pageData,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    }

    const result = await db.collection<Page>("pages").insertOne(page)
    return { ...page, _id: result.insertedId }
  }

  static async findAll(): Promise<Page[]> {
    const db = await getDatabase()
    return await db.collection<Page>("pages").find({}).sort({ order: 1, createdAt: -1 }).toArray()
  }

  static async findById(id: string): Promise<Page | null> {
    const db = await getDatabase()
    return await db.collection<Page>("pages").findOne({ id })
  }

  static async findBySlug(slug: string): Promise<Page | null> {
    const db = await getDatabase()
    return await db.collection<Page>("pages").findOne({ slug, published: true })
  }

  static async findByMenuId(menuId: string): Promise<Page[]> {
    const db = await getDatabase()
    return await db.collection<Page>("pages").find({ menuId, published: true }).sort({ order: 1 }).toArray()
  }

  static async update(id: string, updateData: Partial<Omit<Page, "_id" | "createdAt">>): Promise<Page | null> {
    const db = await getDatabase()
    const result = await db
      .collection<Page>("pages")
      .findOneAndUpdate({ id }, { $set: { ...updateData, updatedAt: new Date() } }, { returnDocument: "after" })
    return result
  }

  static async delete(id: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection<Page>("pages").deleteOne({ id })
    return result.deletedCount > 0
  }

  static async incrementViews(id: string): Promise<void> {
    const db = await getDatabase()
    await db.collection<Page>("pages").updateOne({ id }, { $inc: { views: 1 } })
  }

  static async getPopular(limit = 10): Promise<Page[]> {
    const db = await getDatabase()
    return await db.collection<Page>("pages").find({ published: true }).sort({ views: -1 }).limit(limit).toArray()
  }
}
