import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

export function drizzleForSqlite<TSchema extends Record<string, unknown>>(
    client: unknown,
    config: { schema: TSchema },
): BunSQLiteDatabase<TSchema> {
    return drizzle(client as Parameters<typeof drizzle>[0], config)
}
