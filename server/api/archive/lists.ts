import type { ListPageType } from '~server/types'
import { defineEventHandler, getQuery } from 'h3'
import { listArchives } from '~server/services/archive.service'

export default defineEventHandler(async (event) => {
    const query = getQuery<ListPageType>(event)
    const data = listArchives(query)
    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
