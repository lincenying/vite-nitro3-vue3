import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export default {
    async fetch(): Promise<Response> {
        let html = ''
        const baseDir = process.cwd()
        if (import.meta.env?.VITE_APP_ENV === 'development') {
            html = fs.readFileSync(path.resolve(baseDir, './template.html'), 'utf-8')
            html = html.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            html = fs.readFileSync(path.resolve(baseDir, '.output/server/template.html'), 'utf-8')
        }
        return new Response(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
}
