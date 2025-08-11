import { getDatabase } from "../mongodb"
import type { ObjectId } from "mongodb"

export interface Menu {
  _id?: ObjectId
  id: string
  label: string
  pages: string[]
  order?: number
  createdAt: Date
  updatedAt: Date
}

export class MenuModel {
  static async create(menuData: Omit<Menu, "_id" | "createdAt" | "updatedAt">): Promise<Menu> {
    const db = await getDatabase()
    const menu: Menu = {
      ...menuData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Menu>("menu").insertOne(menu)
    return { ...menu, _id: result.insertedId }
  }

  static async findAll(): Promise<Menu[]> {
    const db = await getDatabase()
    return await db.collection<Menu>("menu").find({}).sort({ order: 1 }).toArray()
  }

  static async findById(id: string): Promise<Menu | null> {
    const db = await getDatabase()
    return await db.collection<Menu>("menu").findOne({ id })
  }

  static async update(id: string, updateData: Partial<Omit<Menu, "_id" | "createdAt">>): Promise<Menu | null> {
    const db = await getDatabase()
    const result = await db
      .collection<Menu>("menu")
      .findOneAndUpdate({ id }, { $set: { ...updateData, updatedAt: new Date() } }, { returnDocument: "after" })
    return result
  }

  static async delete(id: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection<Menu>("menu").deleteOne({ id })
    return result.deletedCount > 0
  }

  static async addPageToMenu(menuId: string, pageId: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db
      .collection<Menu>("menu")
      .updateOne({ id: menuId }, { $addToSet: { pages: pageId }, $set: { updatedAt: new Date() } })
    return result.modifiedCount > 0
  }

  static async removePageFromMenu(menuId: string, pageId: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db
      .collection<Menu>("menu")
      .updateOne({ id: menuId }, { $pull: { pages: pageId }, $set: { updatedAt: new Date() } })
    return result.modifiedCount > 0
  }
}
