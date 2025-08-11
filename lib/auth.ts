import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { UserModel, type User } from "./models/user"

const secretKey = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function login(email: string, password: string) {
  // In a real app, you'd verify the password hash
  // For demo purposes, we'll check if user exists and has admin role
  const user = await UserModel.findByEmail(email)

  if (!user || user.role !== "admin") {
    return null
  }

  // Update last login
  if (user._id) {
    await UserModel.updateLastLogin(user._id.toString())
  }

  // Create session
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const session = await encrypt({ userId: user._id?.toString(), email: user.email, role: user.role, expires })

  // Save the session in a cookie
  ;(await cookies()).set("session", session, { expires, httpOnly: true })

  return user
}

export async function logout() {
  // Destroy the session
  ;(await cookies()).set("session", "", { expires: new Date(0) })
}

export async function getSession(): Promise<User | null> {
  const session = (await cookies()).get("session")?.value
  if (!session) return null

  try {
    const payload = await decrypt(session)

    // Check if session is expired
    if (new Date() > new Date(payload.expires)) {
      return null
    }

    // Get fresh user data
    const user = await UserModel.findById(payload.userId)
    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return user
}
