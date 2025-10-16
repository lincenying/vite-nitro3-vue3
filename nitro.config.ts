import path from 'node:path'
import process from 'node:process'

import { defineNitroConfig } from 'nitro/config'

const proxyDomain = process.env.NITRO_ENV_HOST_API_URL || 'https://php.mmxiaowu.com'

export default defineNitroConfig({
    alias: {
        '~': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~server': path.join(__dirname, './server'),
        '@server': path.join(__dirname, './server'),
    },
    srcDir: 'server',
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
    // 将vite编译后的静态资源文件存入服务端
    publicAssets: [
        {
            baseURL: '/assets/',
            // 相对 `srcDir` 文件夹
            dir: '../dist/assets/',
        },
        {
            baseURL: '/static/',
            // 相对 `srcDir` 文件夹
            dir: '../dist/static/',
        },
    ],
    // 将vite编译后的html文件写入服务端资产
    serverAssets: [
        {
            baseName: 'appTemplate',
            // 相对 `srcDir` 文件夹
            dir: '../dist',
            ignore: ['static', 'assets'],
        },
    ],
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
            connector: 'better-sqlite3',
            options: {
                // 相对项目根目录
                path: './.data/db.sqlite3',
                name: 'db',
            },
        },
    },
    typescript: {
        tsConfig: {
            compilerOptions: {
                noEmit: false,
                outDir: 'dist',
            },
        },
    },
})
