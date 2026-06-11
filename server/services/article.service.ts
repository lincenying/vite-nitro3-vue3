import { count, desc, eq } from 'drizzle-orm'
import { useSqlite3Drizzle } from '~server/db/client'
import { mapArticleRow } from '~server/db/maps'
import { article } from '~server/db/schema'
import { buildPageMeta, parsePageQuery } from '~server/utils/pagination'

/**
 * 分页查询文章列表
 */
export function listArticles(query: { page?: number, pageSize?: number }) {
    const db = useSqlite3Drizzle()
    const { page, pageSize, offset } = parsePageQuery(query)

    const rows = db.select().from(article).orderBy(desc(article.id)).limit(pageSize).offset(offset).all()
    const data = rows.map(mapArticleRow)
    const [{ total }] = db.select({ total: count() }).from(article).all()

    return {
        list: data,
        ...buildPageMeta(total, page, pageSize, offset),
    }
}

/**
 * 按 ID 查询文章详情
 */
export function getArticleById(id: number) {
    const db = useSqlite3Drizzle()
    const row = db.select().from(article).where(eq(article.id, id)).get()
    return row ? mapArticleRow(row) : null
}
