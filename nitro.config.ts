import type { NitroConfig } from 'nitro/types'
import path from 'node:path'

import process from 'node:process'
import { defineNitroConfig } from 'nitro/config'

const proxyDomain = process.env.NITRO_HOST_API_URL || 'https://php.mmxiaowu.com'

/**
 * 与下方 `preset` 保持一致：
 * - `'bun'`：Nitro Bun 预设 + db0 `bun-sqlite` + Drizzle `drizzle-orm/bun-sqlite`（见 `#sqlite-drizzle` 别名）
 * - `undefined`：Node 运行时 + `better-sqlite3`
 */
const nitroPreset = process.env.NITRO_PRESET || 'node_server' as NitroConfig['preset']

const sqliteConnector = nitroPreset === 'bun' ? 'bun-sqlite' : 'better-sqlite3'
const sqliteDrizzleDriver = path.join(
    __dirname,
    nitroPreset === 'bun' ? 'server/db/drivers/sqlite.bun.ts' : 'server/db/drivers/sqlite.node.ts',
)

export default defineNitroConfig({
    preset: nitroPreset,
    alias: {
        '~': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~server': path.join(__dirname, './server'),
        '@server': path.join(__dirname, './server'),
        '#sqlite-drizzle': sqliteDrizzleDriver,
    },
    serverDir: 'server',
    serveStatic: true,
    compatibilityDate: '2025-06-23',
    // 代理
    routeRules: {
        '/php/**': {
            proxy: {
                to: `${proxyDomain}/api/**`,
            },
            swr: false,
        },
    },
    // 开启本地文件K/V存储
    storage: {
        fsdb: {
            driver: 'fs',
            // 相对项目根目录
            base: './.data/fsdb',
        },
    },
    // 开启sqlite数据库存储
    experimental: {
        database: true,
    },
    database: {
        // 配置SQLite数据库
        default: {
            connector: 'sqlite',
            options: {
                // 相对项目根目录
                path: './.data/db.sqlite',
                name: 'db',
            },
        },
        sqlite3: {
            connector: sqliteConnector,
            options: {
                // 相对项目根目录
                path: './.data/db.sqlite3',
                name: 'db',
            },
        },
        archiveDB: {
            connector: sqliteConnector,
            options: {
                // 相对项目根目录
                path: './.archive/db.sqlite3',
                name: 'db',
            },
        },
    },
    typescript: {
        tsConfig: {
            compilerOptions: {
                noEmit: false,
                outDir: '.output',
            },
        },
    },
})
