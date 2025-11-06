import type { NitroApp } from 'nitro/types'
import { defineNitroPlugin } from 'nitro/runtime'

export default defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('request', async (event: any) => {
        console.log(`[${event.req.method}] ${event.req.url} ${event.req.body ? JSON.stringify(event.req.body) : ''}`)
    })
})
