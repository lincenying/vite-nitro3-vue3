import type { User } from '~server/types'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery, HTTPError } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapUserRow } from '~server/db/maps'
import { users } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return new HTTPError({
            status: 400,
            statusMessage: 'ID不能为空',
            data: { field: 'id' },
        })
    }

    const db = useSqlite3Drizzle()

    const row = db.select().from(users).where(eq(users.id, Number(id))).get()
    const data: User | undefined = row ? mapUserRow(row) : undefined

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
