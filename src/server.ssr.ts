import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export default {
    async fetch(req: Request): Promise<Response> {
        let template = ''
        let html
        const baseDir = process.cwd()

        const url = new URL(req.url)
        const href = url.href.slice(url.origin.length)

        if (import.meta.env?.VITE_APP_ENV === 'development') {
            template = fs.readFileSync(path.resolve(baseDir, './template.html'), 'utf-8')
            template = template.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            template = fs.readFileSync(path.resolve(baseDir, '.output/public/template.html'), 'utf-8')
        }
        const render = await import('./main.server').then(m => m.default)
        const renderSSR = (await render(href, template, { req }))
        // 处理跳转
        if (typeof renderSSR === 'object') {
            if ('body' in renderSSR)
                html = renderSSR.body
        }
        // 正常返回html
        else {
            html = renderSSR
        }
        return new Response(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
}
