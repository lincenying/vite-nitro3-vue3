import type { User } from '~server/types'
import { defineEventHandler } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapUserRow } from '~server/db/maps'
import { users } from '~server/db/schema'
import { requireAdmin } from '~server/utils/auth-guard'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const db = useSqlite3Drizzle()

    const rows = db.select().from(users).all()
    const data: User[] = rows.map(mapUserRow)

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
