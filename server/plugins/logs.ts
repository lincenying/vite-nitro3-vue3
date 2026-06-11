import type { NitroApp } from 'nitro/types'
import { definePlugin } from 'nitro'

const sensitiveKeys = ['password', 'token', 'secret']

/**
 * 脱敏请求体中的敏感字段
 */
function sanitizeBody(body: unknown): string {
    if (!body || typeof body !== 'object') {
        return ''
    }
    const cloned = { ...(body as Record<string, unknown>) }
    for (const key of Object.keys(cloned)) {
        if (sensitiveKeys.some(item => key.toLowerCase().includes(item))) {
            cloned[key] = '***'
        }
    }
    return JSON.stringify(cloned)
}

export default definePlugin((nitroApp: NitroApp) => {
    nitroApp.hooks?.hook('request', async (event) => {
        if (process.env.NODE_ENV === 'production') {
            return
        }
        const body = event.req.body ? sanitizeBody(event.req.body) : ''
        console.log(`[${event.req.method}] ${event.req.url}${body ? ` ${body}` : ''}`)
    })
})
