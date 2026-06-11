import { defineEventHandler } from 'h3'
import { createMockRelatedRecom } from '~server/utils/mock-related-recom'

export default defineEventHandler(async () => {
    return {
        code: 200,
        message: 'ok',
        data: createMockRelatedRecom(),
    }
})
