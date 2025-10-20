import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { needSSR } from './config'
import render from './main.server'

export default {
    async fetch(req: Request): Promise<Response> {
        let template = ''
        let html
        const baseDir = process.cwd()
        const url = new URL(req.url).pathname
        if (import.meta.env?.VITE_APP_ENV === 'development') {
            template = fs.readFileSync(path.resolve(baseDir, './template.html'), 'utf-8')
            template = template.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            template = fs.readFileSync(path.resolve(baseDir, '.output/server/template.html'), 'utf-8')
        }
        if (needSSR) {
            const renderSSR = (await render(url, template, { req }))
            // 处理跳转
            if (typeof renderSSR === 'object') {
                if ('body' in renderSSR)
                    html = renderSSR.body
            }
            // 正常返回html
            else {
                html = renderSSR
            }
        }
        else {
            html = template
        }
        return new Response(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
}
