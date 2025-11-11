/// <reference types="vite/client" />

interface ViteManifest {
    [key: string]: {
        file: string
        name: string
        src: string
        isEntry: boolean
        css?: string[]
        imports?: string[]
        dynamicImports?: string[]
    }
}

declare global {
    const __VITE_MANIFEST__: ViteManifest | undefined

    interface Window {
        __VITE_MANIFEST__: ViteManifest | undefined
    }

}

export {}
