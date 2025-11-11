import type { NitroApp } from 'nitro/types'
import { definePlugin } from 'nitro'

export default definePlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('request', async (event: any) => {
        console.log(`[${event.req.method}] ${event.req.url} ${event.req.body ? JSON.stringify(event.req.body) : ''}`)
    })
})
