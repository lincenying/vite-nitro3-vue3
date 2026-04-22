import type { ArchiveType } from '~server/types'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery, HTTPError } from 'h3'

import { useArchiveDrizzle } from '~server/db/client'
import { archive } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return new HTTPError({
            status: 400,
            statusMessage: 'ID不能为空',
            data: { field: 'id' },
        })
    }

    const db = useArchiveDrizzle()

    const data = db.select().from(archive).where(eq(archive.c_id, Number(id))).get() as ArchiveType | undefined

    if (!data) {
        return new HTTPError({
            status: 404,
            statusMessage: '文章不存在或已被删除',
            data: { field: 'id' },
        })
    }

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
