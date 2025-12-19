import type { ArchiveType, ListPageType } from '~server/types'
import { defineEventHandler, getQuery } from 'h3'
import { useDatabase } from 'nitro/database'

export default defineEventHandler(async (event) => {
    const db = useDatabase('archiveDB')

    let { page, pageSize, category } = getQuery<ListPageType>(event)
    page ||= 1
    pageSize ||= 12

    const offset = (page - 1) * pageSize

    let searchSql = ''
    if (category) {
        searchSql = `WHERE c_allcateid LIKE '%$${category}$%'`
    }

    // Query for users
    // const { rows } = await db.sql<QueryResult>`SELECT * FROM users`
    const data = await db.prepare(`SELECT * FROM archive ${searchSql} order by c_id desc LIMIT ${pageSize} OFFSET ${offset}`).all() as ArchiveType[]

    const total = await db.prepare(`SELECT COUNT(*) as total FROM archive`).get() as { total: number }

    const hasNext = total.total > offset + pageSize ? 1 : 0
    const hasprev = page > 1 ? 1 : 0
    const totalPage = Math.ceil(total.total / pageSize)

    return {
        code: 200,
        message: 'API is working!',
        data: {
            list: data,
            total: total.total,
            currPage: page,
            pageSize,
            hasNext,
            hasprev,
            totalPage,
        },
    }
})
