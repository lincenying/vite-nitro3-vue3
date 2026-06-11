import { defineEventHandler, readBody, setCookie } from 'h3'
import { authConfig } from '~server/config/auth'
import { loginUser } from '~server/services/user.service'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ name: string, password: string }>(event)

    if (!body?.name || !body?.password) {
        return {
            code: 400,
            message: '用户名和密码不能为空',
            data: null,
        }
    }

    const user = await loginUser(body.name.trim(), body.password)
    if (!user) {
        return {
            code: 401,
            message: '用户名或密码错误',
            data: null,
        }
    }

    setCookie(event, authConfig.cookieName, user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: authConfig.cookieMaxAge,
        path: '/',
    })

    return {
        code: 200,
        message: 'success',
        data: {
            name: user.name,
            nickName: user.nickName,
            role: user.role,
            isAdmin: user.isAdmin,
            info: {
                name: user.nickName,
            },
        },
    }
})
