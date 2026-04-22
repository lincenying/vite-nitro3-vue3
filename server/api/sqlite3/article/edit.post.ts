import type { Article, InsertSucces } from '~server/types'
import { UTC2Date } from '@lincy/utils'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { article } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const db = useSqlite3Drizzle()

    const body = await readBody<Article>(event)

    const { id, title, content, category } = body!

    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')

    if (id == null || id === '' || !title || !content || !category) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    const run = db.update(article).set({
        title,
        content,
        category,
        date,
    }).where(eq(article.id, Number(id))).run()

    const data: InsertSucces = {
        success: run.changes > 0,
        lastInsertRowid: Number(run.lastInsertRowid),
        changes: run.changes,
    }

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
