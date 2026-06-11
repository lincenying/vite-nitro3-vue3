import { defineEventHandler, deleteCookie } from 'h3'
import { authConfig } from '~server/config/auth'

export default defineEventHandler((event) => {
    deleteCookie(event, authConfig.cookieName, { path: '/' })
    return {
        code: 200,
        message: 'success',
        data: null,
    }
})
