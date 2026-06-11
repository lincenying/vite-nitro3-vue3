import type { QueryResult, User } from '~server/types'
import { defineEventHandler } from 'h3'
import { useDatabase } from 'nitro/database'
import { requireDevelopment } from '~server/utils/auth-guard'

export default defineEventHandler(async (event) => {
    requireDevelopment(event)
    const db = useDatabase()

    // Query for users
    const { rows } = await db.sql<QueryResult<User[]>>`SELECT * FROM users`

    return {
        code: 200,
        message: 'API is working!',
        data: rows || [],
    }
})
