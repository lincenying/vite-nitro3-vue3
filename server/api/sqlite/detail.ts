import type { QueryResult, User } from '~server/types'
import { defineEventHandler, getQuery, HTTPError } from 'h3'
import { useDatabase } from 'nitro/database'
import { requireDevelopment } from '~server/utils/auth-guard'

export default defineEventHandler(async (event) => {
    requireDevelopment(event)
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return new HTTPError({
            status: 400,
            statusMessage: 'ID不能为空',
            data: { field: 'id' },
        })
    }

    const db = useDatabase()

    const { rows } = await db.sql<QueryResult<User[]>>`SELECT * FROM users WHERE id = ${id}`

    return {
        code: 200,
        message: 'API is working!',
        data: (rows && rows[0]) || {},
    }
})
