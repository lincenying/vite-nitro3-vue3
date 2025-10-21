import type { BuildOptions } from 'vite'

const config: { build: BuildOptions } = {
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: '.output/public',
        rollupOptions: {
            input: './template.html',
            external: [
                /static\/.*?\.[cm]*js/,
                'element-plus/es/components/focus-trap/style/css',
                'element-plus/es/components/select-menu/style/css',
                'element-plus/es/components/options/style/css',
                'element-plus/es/components/roving-focus-item/style/css',
                'element-plus/es/components/dropdown-item-impl/style/css',
                'element-plus/es/components/roving-focus-collection-item/style/css',
                'element-plus/es/components/collection/style/css',
                'element-plus/es/components/slot/style/css',
                'element-plus/es/components/only-child/style/css',
                'element-plus/es/components/roving-focus-group/style/css',
                'element-plus/es/components/focus-group-collection/style/css',
                'element-plus/es/components/roving-focus-group-impl/style/css',
            ],
            output: {
                manualChunks(id: string) {
                    // 处理css分块
                    // if (id.includes('.css') || id.includes('.scss') || id.includes('.sass') || id.includes('.less')) {
                    //     if (id.includes('node_modules'))
                    //         return 'vendor'
                    //     return 'main'
                    // }
                    if (id.includes('node_modules')) {
                        if (id.includes('element-plus')) {
                            return 'element-plus'
                        }
                        if (id.includes('lucide-vue-next') || id.includes('md-editor-v3')) {
                            return 'md-editor-v3'
                        }
                        if (id.includes('markdown-it') || id.includes('codemirror')) {
                            return 'markdown-it'
                        }
                        if (id.includes('vue-pdf')) {
                            return 'vue-pdf'
                        }
                        if (id.includes('pdfjs-dist')) {
                            return 'pdfjs-dist'
                        }
                        return 'vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return 'unocss'
                    }
                },
            },
        },
    },
}

export default config
