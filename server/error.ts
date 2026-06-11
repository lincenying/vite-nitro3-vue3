import { defineErrorHandler } from 'nitro'

export default defineErrorHandler((error, _event) => {
    const status = error.status || 500
    const message = (error.cause as { statusMessage: string })?.statusMessage || error.statusText || '服务器错误'
    const httpStatus = process.env.NODE_ENV === 'production' ? status : 200

    return new Response(JSON.stringify({
        code: status,
        message,
        data: error.data ?? null,
    }), {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json' },
    })
})
