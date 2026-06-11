import { defineEventHandler, getCookie, getRequestURL, HTTPError } from 'h3'
import { authConfig } from '~server/config/auth'
import { verifyAuthToken } from '~server/utils/jwt'

/** 无需鉴权的 API 路径（精确匹配 method + path 前缀） */
const publicRoutes: Array<{ method?: string, path: string }> = [
    { method: 'POST', path: '/api/user/login' },
    { method: 'POST', path: '/api/user/logout' },
    { path: '/api/user/profile' },
    { path: '/api/info' },
    { path: '/api/home/' },
    { path: '/api/news/' },
    { path: '/api/cases/' },
    { path: '/api/faqs/' },
    { path: '/api/comment/lists' },
    { path: '/api/sqlite3/article/detail' },
    { path: '/api/sqlite3/article/lists' },
    { path: '/api/sqlite3/article/related-recom' },
    { path: '/api/archive/detail' },
    { path: '/api/archive/lists' },
    { path: '/api/sqlite/detail' },
    { path: '/api/sqlite/lists' },
]

/**
 * 判断当前请求是否在公开白名单内
 */
function isPublicRoute(method: string, pathname: string): boolean {
    return publicRoutes.some((route) => {
        if (route.method && route.method !== method) {
            return false
        }
        return pathname.startsWith(route.path)
    })
}

/**
 * 全局鉴权中间件：解析 JWT Cookie 并注入 event.context.auth
 */
export default defineEventHandler(async (event) => {
    const { pathname } = getRequestURL(event)
    const method = event.req.method

    if (!pathname.startsWith('/api/')) {
        return
    }

    if (pathname.startsWith('/api/sqlite/') && process.env.NODE_ENV === 'production') {
        throw new HTTPError({ statusCode: 410, statusMessage: '该 API 已废弃，请使用 /api/sqlite3' })
    }

    if (isPublicRoute(method, pathname)) {
        return
    }

    const token = getCookie(event, authConfig.cookieName)
    if (!token) {
        throw new HTTPError({ statusCode: 401, statusMessage: '未登录' })
    }

    const payload = await verifyAuthToken(token)
    if (!payload) {
        throw new HTTPError({ statusCode: 401, statusMessage: '登录已过期' })
    }

    event.context.auth = {
        id: Number(payload.sub),
        name: payload.name as string,
        nickName: payload.nickName as string,
        role: payload.role as string,
        isAdmin: Number(payload.isAdmin),
    }
})
