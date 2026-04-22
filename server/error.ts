import { defineErrorHandler } from 'nitro'

export default defineErrorHandler((error, _event) => {
    return new Response(JSON.stringify({
        code: error.status,
        message: (error.cause as { statusMessage: string })?.statusMessage || error.statusText || '服务器错误',
        data: error.data,
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
})
