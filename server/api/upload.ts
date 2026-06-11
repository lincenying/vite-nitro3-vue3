import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { randomStr } from '@lincy/utils'
import { defineEventHandler } from 'h3'

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.pdf'])
const MAX_FILE_SIZE = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
    const files = await event.req.formData()

    if (!files) {
        return {
            code: 400,
            data: null,
            message: '上传文件不存在',
        }
    }

    const file = files.get('file') as File | null
    if (!file) {
        return {
            code: 400,
            data: null,
            message: '上传文件不存在',
        }
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            code: 400,
            data: null,
            message: '文件大小不能超过 5MB',
        }
    }

    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
        return {
            code: 400,
            data: null,
            message: '不支持的文件类型',
        }
    }

    const dir = '/public/upload'
    const dirPath = path.join(process.cwd(), dir)
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true })
    }

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
