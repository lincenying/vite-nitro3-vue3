import type { ArchiveType, ListPageType } from '~server/types'
import { count, desc, like } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'

import { useArchiveDrizzle } from '~server/db/client'
import { archive } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const db = useArchiveDrizzle()

    const query = getQuery<ListPageType>(event)
    const page = Number(query.page) > 0 ? Number(query.page) : 1
    const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 12
    const { category } = query

    const offset = (page - 1) * pageSize

    let data: ArchiveType[]
    if (category) {
        const pattern = `%$${category}$%`
        data = db.select().from(archive).where(like(archive.c_allcateid, pattern)).orderBy(desc(archive.c_id)).limit(pageSize).offset(offset).all() as ArchiveType[]
    }
    else {
        data = db.select().from(archive).orderBy(desc(archive.c_id)).limit(pageSize).offset(offset).all() as ArchiveType[]
    }

    let total: number
    if (category) {
        const pattern = `%$${category}$%`
        ;[{ total }] = db.select({ total: count() }).from(archive).where(like(archive.c_allcateid, pattern)).all()
    }
    else {
        ;[{ total }] = db.select({ total: count() }).from(archive).all()
    }

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
