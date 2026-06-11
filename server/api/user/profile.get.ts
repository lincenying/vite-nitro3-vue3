import { defineEventHandler, getCookie } from 'h3'
import { authConfig } from '~server/config/auth'
import { verifyAuthToken } from '~server/utils/jwt'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, authConfig.cookieName)
    if (!token) {
        return {
            code: 401,
            message: '未登录',
            data: null,
        }
    }

    const payload = await verifyAuthToken(token)
    if (!payload) {
        return {
            code: 401,
            message: '登录已过期',
            data: null,
        }
    }

    const auth = {
        id: Number(payload.sub),
        name: payload.name as string,
        nickName: payload.nickName as string,
        role: payload.role as string,
        isAdmin: Number(payload.isAdmin),
    }

    return {
        code: 200,
        message: 'success',
        data: {
            id: auth.id,
            name: auth.name,
            nickName: auth.nickName,
            role: auth.role,
            isAdmin: auth.isAdmin,
            info: {
                name: auth.nickName || auth.name,
            },
        },
    }
})
