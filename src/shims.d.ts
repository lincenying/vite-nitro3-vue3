import 'alova'

declare module 'alova' {
    export interface AlovaCustomTypes {
        meta: {
            ignoreToken: boolean
            isDownload: boolean
        }
    }
}
