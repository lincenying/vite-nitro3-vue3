import type { NitroApp } from 'nitro/types'
import { defineNitroPlugin } from 'nitro/runtime'

export default defineNitroPlugin((nitroApp: NitroApp) => {
    nitroApp.hooks.hook('request', async (event) => {
        console.log('on request:', event.req.url)
    })
})
