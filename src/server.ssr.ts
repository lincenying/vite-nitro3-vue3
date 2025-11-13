import type { HTTPResponse } from 'h3'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { mockEvent } from 'h3'

function isHTTPResponse(obj: any): obj is HTTPResponse {
    // 根据 HTTPResponse 的实际属性来判断
    return 'status' in obj || 'headers' in obj || 'body' in obj
}

export default {
    async fetch(req: Request): Promise<Response> {
        let template = ''
        const baseDir = process.cwd()

        const url = new URL(req.url)
        const href = url.href.slice(url.origin.length)

        if (import.meta.env?.VITE_APP_ENV === 'development') {
            template = fs.readFileSync(path.resolve(baseDir, './template.html'), 'utf-8')
            // template = template.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            template = fs.readFileSync(path.resolve(baseDir, '.output/public/template.html'), 'utf-8')
        }

        const H3Event = mockEvent(url)

        const render = await import('./main.server').then(m => m.default)
        const renderSSR = await render(href, template, { req, event: H3Event })

        let html: BodyInit | string = ''
        let cookies = ''

        // 处理跳转
        if (isHTTPResponse(renderSSR)) {
            html = renderSSR.body || ''
        }
        else {
            html = renderSSR.html
            cookies = renderSSR.cookies || ''
        }

        const headers = new Headers()
        headers.set('Content-Type', 'text/html')
        const arrCookies = cookies.split(',')
        if (arrCookies.length > 0) {
            for (const cookie of arrCookies) {
                headers.append('set-cookie', cookie)
            }
        }

        return new Response(html, {
            headers,
        })
    },
}
