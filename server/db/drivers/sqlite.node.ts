import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

export function drizzleForSqlite<TSchema extends Record<string, unknown>>(
    client: unknown,
    config: { schema: TSchema },
): BetterSQLite3Database<TSchema> {
    return drizzle(client as never, config)
}
