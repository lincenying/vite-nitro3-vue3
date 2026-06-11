declare module 'h3' {
    interface H3EventContext {
        auth?: {
            id: number
            name: string
            nickName: string
            role: string
            isAdmin: number
        }
    }
}

export {}
