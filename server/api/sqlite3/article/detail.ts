import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery, HTTPError } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'

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

    const row = db.select().from(article).where(eq(article.id, Number(id))).get()
    const data = row ? mapArticleRow(row) : undefined

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
