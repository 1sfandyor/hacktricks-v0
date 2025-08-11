import { getDatabase } from "../mongodb"
import { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  username: string
  email: string
  role: "admin" | "user"
  createdAt: Date
  lastLogin?: Date
}

export class UserModel {
  static async create(userData: Omit<User, "_id" | "createdAt">): Promise<User> {
    const db = await getDatabase()
    const user: User = {
      ...userData,
      createdAt: new Date(),
    }

    const result = await db.collection<User>("users").insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  static async findByEmail(email: string): Promise<User | null> {
    const db = await getDatabase()
    return await db.collection<User>("users").findOne({ email })
  }

  static async findById(id: string): Promise<User | null> {
    const db = await getDatabase()
    return await db.collection<User>("users").findOne({ _id: new ObjectId(id) })
  }

  static async updateLastLogin(id: string): Promise<void> {
    const db = await getDatabase()
    await db.collection<User>("users").updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date() } })
  }
}
