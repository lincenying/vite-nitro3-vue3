import type { H3Event } from 'h3'
import { HTTPError } from 'h3'

/**
 * 仅开发环境允许访问
 */
export function requireDevelopment(_event: H3Event) {
    if (process.env.NODE_ENV === 'production') {
        throw new HTTPError({ statusCode: 403, statusMessage: '该接口仅开发环境可用' })
    }
}

/**
 * 要求管理员权限
 */
export function requireAdmin(event: H3Event) {
    const auth = event.context.auth
    if (!auth?.isAdmin) {
        throw new HTTPError({ statusCode: 403, statusMessage: '无权限访问' })
    }
}
