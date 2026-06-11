import type { ArchiveType } from '~server/types'
import { count, desc, eq, like } from 'drizzle-orm'
import { useArchiveDrizzle } from '~server/db/client'
import { archive } from '~server/db/schema'
import { buildPageMeta, parsePageQuery } from '~server/utils/pagination'

/**
 * 分页查询归档列表
 */
export function listArchives(query: { page?: number, pageSize?: number, category?: string }) {
    const db = useArchiveDrizzle()
    const { page, pageSize, offset } = parsePageQuery(query)
    const { category } = query

    let data: ArchiveType[]
    let total: number

    if (category) {
        const pattern = `%$${category}$%`
        data = db.select().from(archive).where(like(archive.c_allcateid, pattern)).orderBy(desc(archive.c_id)).limit(pageSize).offset(offset).all() as ArchiveType[]
        ;[{ total }] = db.select({ total: count() }).from(archive).where(like(archive.c_allcateid, pattern)).all()
    }
    else {
        data = db.select().from(archive).orderBy(desc(archive.c_id)).limit(pageSize).offset(offset).all() as ArchiveType[]
        ;[{ total }] = db.select({ total: count() }).from(archive).all()
    }

    return {
        list: data,
        ...buildPageMeta(total, page, pageSize, offset),
    }
}

/**
 * 按 ID 查询归档详情
 */
export function getArchiveById(id: number) {
    const db = useArchiveDrizzle()
    return db.select().from(archive).where(eq(archive.c_id, id)).get() as ArchiveType | undefined
}
