import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export default {
    async fetch(): Promise<Response> {
        let html = ''
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        if (import.meta.env?.DEV) {
            html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
            html = html.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            html = fs.readFileSync(path.resolve(__dirname, '../../../public/index.html'), 'utf-8')
        }
        return new Response(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        })
    },
}
