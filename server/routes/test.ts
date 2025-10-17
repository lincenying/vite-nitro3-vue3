import { defineEventHandler } from 'h3'
import Twig from 'twig'
import { getTemplateDir } from '~server/utils'

export default defineEventHandler(async () => {
    const data = {
        seo: {
            title: '首页',
        },
        user: '林岑影',
    }
    const templateDir = getTemplateDir('./template/index.twig')
    const html = await new Promise<string>((resove) => {
        Twig.renderFile(templateDir, data, (err, html) => {
            resove(err ? err.toString() : html)
        })
    })

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html',
        },
    })
})
