import { defineEventHandler } from 'h3'
import { ensureSqlite3Database } from '~server/db/init'
import { requireDevelopment } from '~server/utils/auth-guard'

export default defineEventHandler(async (event) => {
    requireDevelopment(event)
    ensureSqlite3Database({ reset: true })

    return {
        code: 200,
        message: 'API is working!',
        data: { reset: true },
    }
})
