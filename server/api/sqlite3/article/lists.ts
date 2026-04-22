import type { ListPageType } from '~server/types'
import { count, desc } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const db = useSqlite3Drizzle()

    const query = getQuery<ListPageType>(event)
    const page = Number(query.page) > 0 ? Number(query.page) : 1
    const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 12

    const offset = (page - 1) * pageSize

    const rows = db.select().from(article).orderBy(desc(article.id)).limit(pageSize).offset(offset).all()
    const data = rows.map(mapArticleRow)

    const [{ total }] = db.select({ total: count() }).from(article).all()

    const hasNext = total > offset + pageSize ? 1 : 0
    const hasprev = page > 1 ? 1 : 0
    const totalPage = Math.ceil(total / pageSize)

    return {
        code: 200,
        message: 'API is working!',
        data: {
            list: data,
            total,
            currPage: page,
            pageSize,
            hasNext,
            hasprev,
            totalPage,
        },
    }
})
