import { getDatabase } from "../lib/mongodb"

async function createAdmin() {
  try {
    const db = await getDatabase()

    // Check if admin already exists
    const existingAdmin = await db.collection("users").findOne({
      email: "admin@hacktricks.com",
      role: "admin",
    })

    if (existingAdmin) {
      console.log("Admin user already exists!")
      return
    }

    // Create admin user
    const adminUser = {
      username: "admin",
      email: "admin@hacktricks.com",
      role: "admin" as const,
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(adminUser)
    console.log("Admin user created successfully!")
    console.log("Email: admin@hacktricks.com")
    console.log("Note: Current system has no password verification - any password will work for admin users")
    console.log("User ID:", result.insertedId)
  } catch (error) {
    console.error("Error creating admin user:", error)
  }
}

createAdmin()
