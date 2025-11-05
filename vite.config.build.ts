import type { BuildOptions } from 'vite'

const config: { build: BuildOptions } = {
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        terserOptions: {
            // @ts-ignore 1234
            compress: {
                // 禁用变量名压缩
                mangle: {
                    toplevel: true,
                    properties: {
                        regex: /^_/,
                    },
                },
            },
        },
        outDir: '.output/public',
        rollupOptions: {
            input: './template.html',
            output: {
                generatedCode: {
                    symbols: false, // 禁用符号压缩，避免变量名冲突
                },
                hoistTransitiveImports: false, // 禁止提升导入
                inlineDynamicImports: false, // 确保动态导入不被内联
                manualChunks(id: string) {
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
                        return 'vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return 'unocss'
                    }
                },
            },
            external: [
                /static\/.*?\.[cm]*js/,
                'md-editor-v3',
            ],
        },
    },
}

export default config
