import type { ArchiveType } from '~server/types'
import { defineEventHandler, getQuery } from 'h3'
import { useDatabase } from 'nitro/database'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return {
            code: 400,
            message: 'Invalid user id',
        }
    }

    const db = useDatabase('archiveDB')

    // Query for users
    // const { rows } = await db.sql<QueryResult>`SELECT * FROM users WHERE id = ${id}`

    const data = await db.prepare(`SELECT * FROM archive WHERE c_id = ?`).get(id) as ArchiveType

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
