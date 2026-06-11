import type { EventHandler } from 'h3'
import type { ListPageType } from '~server/types'
import { defineEventHandler, getQuery } from 'h3'
import Mock from 'mockjs'
import { getRandomValue } from '.'
import { imgUrl } from './img'

interface IMockListItemTemplate {
    [key: string]: unknown
}

/**
 * 创建 Mock 分页列表 handler
 */
export function createMockListHandler(
    itemTemplate: IMockListItemTemplate,
    defaultPageSize = 12,
    imgUrlKey = '',
): EventHandler {
    return defineEventHandler(async (event) => {
        let { page, pageSize } = getQuery<ListPageType>(event)
        page ||= 1
        pageSize ||= defaultPageSize
        const template = {
            list: Array.from({ length: Number(pageSize) }, (_, index) => ({
                id: (Number(page) - 1) * Number(pageSize) + index + 1,
                ...itemTemplate,
                ...imgUrlKey ? { [imgUrlKey]: getRandomValue(imgUrl) } : {},
            })),
            hasPrev: Number(page) > 1 ? 1 : 0,
            hasNext: 1,
            total: 100,
            pageSize: Number(pageSize),
            currPage: Number(page),
        }
        const data = Mock.mock(template)
        return {
            code: 200,
            message: 'ok',
            data,
        }
    })
}
