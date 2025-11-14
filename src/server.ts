import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export default {
    async fetch(): Promise<Response> {
        let template = ''
        const baseDir = process.cwd()
        if (import.meta.env?.VITE_APP_ENV === 'development') {
            template = fs.readFileSync(path.resolve(baseDir, './template.html'), 'utf-8')
            // template = template.replace('<!--vite-client-->', '<script type="module" src="/@vite/client"></script>')
        }
        else {
            template = fs.readFileSync(path.resolve(baseDir, '.output/public/template.html'), 'utf-8')
        }

        const headers = new Headers()
        headers.set('Content-Type', 'text/html')

        return new Response(template, {
            headers,
        })
    },
}
