import type { Article, InsertSucces } from '~server/types'
import { UTC2Date } from '@lincy/utils'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const db = useSqlite3Drizzle()

    const body = await readBody<Article>(event)

    const { title, content, category } = body!

    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')

    if (!title || !content || !category) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    const run = db.insert(article).values({
        title,
        content,
        author: '央视网',
        category,
        views: 0,
        date,
    }).run()

    const result: InsertSucces = {
        success: run.changes > 0,
        lastInsertRowid: Number(run.lastInsertRowid),
        changes: run.changes,
    }

    const row = db.select().from(article).where(eq(article.id, Number(run.lastInsertRowid))).get()
    const data = row ? mapArticleRow(row) : undefined

    return {
        code: 200,
        message: 'API is working!',
        result,
        data,
    }
})
