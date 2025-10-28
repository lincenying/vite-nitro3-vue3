import type { ConfigEnv } from 'vite'

// import events from 'node:events'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { nitro } from 'nitro/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'

import { needSSR } from './src/config'
import Build from './vite.config.build'
import Components from './vite.config.components'
import Css from './vite.config.css'
import Macros from './vite.config.macros'

export default defineConfig(({ mode }: ConfigEnv) => {
    // events.EventEmitter.defaultMaxListeners = 0

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
        base: '/',
        assetsInclude: [
            '/static/**',
        ],
        server: {
            open: true,
            hmr: {
                port: 55473,
            },
            warmup: {
                clientFiles: ['./src/client.ts', './src/views/*.vue'],
            },
        },
        build: Build.build,
        css: Css,
        plugins: [
            ...Macros(),
            ...Components(),
            nitro({
                config: {
                    output: {
                        dir: '.output',
                        serverDir: '.output/server',
                        publicDir: '.output/public',
                    },
                },
                services: {
                    ssr: {
                        entry: !needSSR ? './src/server.ts' : './src/server.ssr.ts',
                        // entry: './src/server.ts', // ===> spa
                        // entry: './src/server.ssr.ts', // ===> ssr
                    },
                },
            }),
            UnoCSS(),
            /**
             * 检查Vite插件的中间状态
             * @see https://github.com/antfu/vite-plugin-inspect#readme
             */
            Inspect(),
        ],
        environments: {
            client: {
                build: {
                    rollupOptions: { },
                },
            },
        },
        resolve: {
            alias: {
                '~': path.join(__dirname, './src'),
                '@': path.join(__dirname, './src'),
                '~server': path.join(__dirname, './server'),
                '@server': path.join(__dirname, './server'),
            },
        },
        ssr: {
            noExternal: [
                'element-plus',
                '@tato30/vue-pdf',
                'pdfjs-dist',
            ],
        },
    }
})
