import type { BuildOptions } from 'vite'

const config: { build: BuildOptions } = {
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: '.output/public',
        rollupOptions: {
            input: './template.html',
            output: {
                generatedCode: {
                    symbols: false, // 禁用符号压缩，避免变量名冲突
                },
                hoistTransitiveImports: false, // 禁止提升导入
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        if (id.includes('element-plus')) {
                            return '1-element-plus'
                        }
                        if (id.includes('markdown-it') || id.includes('codemirror')) {
                            return '2-markdown-it'
                        }
                        return '0-vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return '4-unocss'
                    }
                    if (id.includes('.scss') || id.includes('.css')) {
                        return '5-main-style'
                    }
                },
            },
            external: [
                /static\/.*?\.[cm]*js/,
                'md-editor-v3',
            ],
            onLog(level, log, handler) {
                if (log.code === 'UNUSED_EXTERNAL_IMPORT')
                    return
                handler(level, log)
            },
            onwarn(warning, warn) {
                // 忽略特定的未使用导入警告
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT' || warning.code === 'UNUSED_IMPORT') {
                    return
                }
                warn(warning)
            },
        },
    },
}

export default config
