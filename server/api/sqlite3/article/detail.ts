import { defineEventHandler, getQuery, HTTPError } from 'h3'
import { getArticleById } from '~server/services/article.service'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return new HTTPError({
            status: 400,
            statusMessage: 'ID不能为空',
            data: { field: 'id' },
        })
    }

    const data = getArticleById(Number(id))
    if (!data) {
        return new HTTPError({
            status: 404,
            statusMessage: '文章不存在或已被删除',
            data: { field: 'id' },
        })
    }

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
