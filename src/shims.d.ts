import 'alova'

declare module '@financial-times/polyfill-useragent-normaliser';

declare module 'alova' {
    export interface AlovaCustomTypes {
        meta: {
            ignoreToken: boolean
            isDownload: boolean
        }
    }
}
