import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return {
            code: 400,
            message: 'Invalid user id',
        }
    }

    const db = useSqlite3Drizzle()

    const row = db.select().from(article).where(eq(article.id, Number(id))).get()
    const data = row ? mapArticleRow(row) : undefined

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
