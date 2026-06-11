import { defineEventHandler } from 'h3'
import { useDatabase } from 'nitro/database'
import { requireDevelopment } from '~server/utils/auth-guard'

export default defineEventHandler(async (event) => {
    requireDevelopment(event)
    const db = useDatabase()

    // Create users table
    await db.sql`DROP TABLE IF EXISTS users`
    const result = await db.sql`CREATE TABLE IF NOT EXISTS users ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "userid" VARCHAR(10), "firstName" VARCHAR(50), "lastName" VARCHAR(50), "email" VARCHAR(50))`

    return {
        code: 200,
        message: 'API is working!',
        data: result,
    }
})
