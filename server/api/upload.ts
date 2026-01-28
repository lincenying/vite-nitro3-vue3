import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { randomStr } from '@lincy/utils'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const files = await event.req.formData()

    if (!files) {
        return {
            code: 400,
            data: null,
            message: '上传文件不存在',
        }
    }

    const file = files.get('file') as File
    const dir = '/public/upload'
    const dirPath = path.join(process.cwd(), dir)
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })
    }

    const ext = path.extname(file.name).toLowerCase()
    const newFileName = `${Date.now()}_${randomStr(8)}${ext}`

    const filepath = path.join(dirPath, newFileName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    writeFileSync(filepath, buffer)

    return {
        code: 200,
        data: {
            url: `/upload/${newFileName}`,
        },
        message: '上传成功',

    }
})
