import { sql } from 'drizzle-orm'
import { defineEventHandler } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'

export default defineEventHandler(async () => {
    const db = useSqlite3Drizzle()
    const statements = [
        sql.raw('DROP TABLE IF EXISTS users'),
        sql.raw(`
        CREATE TABLE IF NOT EXISTS users (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "userid" VARCHAR(10),
            "firstName" VARCHAR(50),
            "lastName" VARCHAR(50),
            "email" VARCHAR(50)
        )`),
        sql.raw('DROP TABLE IF EXISTS article'),
        sql.raw(`
        CREATE TABLE IF NOT EXISTS article (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "title" VARCHAR(100),
            "content" TEXT,
            "author" VARCHAR(20),
            "category" VARCHAR(20),
            "views" INTEGER,
            "date" VARCHAR(20)
        )`),
    ]

    const result: { success: boolean, changes: number, lastInsertRowid: number }[] = []
    for (const statement of statements) {
        const r = db.run(statement)
        result.push({
            success: true,
            changes: r.changes,
            lastInsertRowid: Number(r.lastInsertRowid),
        })
    }

    return {
        code: 200,
        message: 'API is working!',
        data: result,
    }
})
