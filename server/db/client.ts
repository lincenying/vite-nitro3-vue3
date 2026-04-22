import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { useDatabase } from 'nitro/database'

import { drizzleForSqlite } from '#sqlite-drizzle'

import * as schema from './schema'

export type AppSchema = typeof schema

/**
 * 对外统一按 better-sqlite3 的 Drizzle 类型标注（Bun 下由 `bun:sqlite` 驱动，同步 API 与之一致）。
 * 具体加载的 ORM 模块由 Nitro 别名 `#sqlite-drizzle` 在构建时切换。
 */
export type AppDrizzle = BetterSQLite3Database<AppSchema>

let sqlite3Drizzle: AppDrizzle | undefined
let archiveDrizzle: AppDrizzle | undefined

/** 主业务库 `.data/db.sqlite3`（users / article） */
export function useSqlite3Drizzle(): AppDrizzle {
    if (!sqlite3Drizzle) {
        sqlite3Drizzle = drizzleForSqlite(useDatabase('sqlite3').getInstance(), { schema }) as AppDrizzle
    }
    return sqlite3Drizzle
}

/** 归档库 `.archive/db.sqlite3` */
export function useArchiveDrizzle(): AppDrizzle {
    if (!archiveDrizzle) {
        archiveDrizzle = drizzleForSqlite(useDatabase('archiveDB').getInstance(), { schema }) as AppDrizzle
    }
    return archiveDrizzle
}
