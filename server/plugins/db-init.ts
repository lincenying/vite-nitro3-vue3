import { definePlugin } from 'nitro'
import { ensureSqlite3Database } from '~server/db/init'

export default definePlugin(() => {
    ensureSqlite3Database()
})
