import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { useDatabase } from 'nitro/database'

import * as schema from './schema'

export type AppSchema = typeof schema

let sqlite3Drizzle: BetterSQLite3Database<AppSchema> | undefined
let archiveDrizzle: BetterSQLite3Database<AppSchema> | undefined

/** 主业务库 `.data/db.sqlite3`（users / article） */
export function useSqlite3Drizzle(): BetterSQLite3Database<AppSchema> {
    if (!sqlite3Drizzle) {
        sqlite3Drizzle = drizzle(useDatabase('sqlite3').getInstance(), { schema })
    }
    return sqlite3Drizzle
}

/** 归档库 `.archive/db.sqlite3` */
export function useArchiveDrizzle(): BetterSQLite3Database<AppSchema> {
    if (!archiveDrizzle) {
        archiveDrizzle = drizzle(useDatabase('archiveDB').getInstance(), { schema })
    }
    return archiveDrizzle
}
