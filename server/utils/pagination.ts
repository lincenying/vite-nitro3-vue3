import type { ListPageType } from '~server/types'

export interface IPageMeta {
    total: number
    currPage: number
    pageSize: number
    hasNext: number
    hasprev: number
    totalPage: number
}

/**
 * 解析分页查询参数
 */
export function parsePageQuery(query: Partial<ListPageType>, defaultPageSize = 12) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1
    const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : defaultPageSize
    const offset = (page - 1) * pageSize
    return { page, pageSize, offset }
}

/**
 * 构建分页元数据
 */
export function buildPageMeta(total: number, page: number, pageSize: number, offset: number): IPageMeta {
    return {
        total,
        currPage: page,
        pageSize,
        hasNext: total > offset + pageSize ? 1 : 0,
        hasprev: page > 1 ? 1 : 0,
        totalPage: Math.ceil(total / pageSize),
    }
}
