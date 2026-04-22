import type { ArchiveType } from '~server/types'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'

import { useArchiveDrizzle } from '~server/db/client'
import { archive } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return {
            code: 400,
            message: 'Invalid user id',
        }
    }

    const db = useArchiveDrizzle()

    const data = db.select().from(archive).where(eq(archive.c_id, Number(id))).get() as ArchiveType | undefined

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
