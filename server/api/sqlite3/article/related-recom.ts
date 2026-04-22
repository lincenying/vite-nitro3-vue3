import type { Article } from '~server/types'
import { desc } from 'drizzle-orm'
import { defineEventHandler } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'

export default defineEventHandler(async (_event) => {
    const db = useSqlite3Drizzle()

    const rows = db.select().from(article).orderBy(desc(article.views)).limit(10).offset(0).all()
    const data: Article[] = rows.map(mapArticleRow)

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
