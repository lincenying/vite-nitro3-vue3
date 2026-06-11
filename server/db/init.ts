import { count, sql } from 'drizzle-orm'
import { useSqlite3Drizzle } from '~server/db/client'
import { authUsers } from '~server/db/schema'
import { seedAuthUsers } from '~server/services/user.service'

const createAuthUsersTable = sql.raw(`
    CREATE TABLE IF NOT EXISTS auth_users (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" VARCHAR(50) NOT NULL,
        "password_hash" VARCHAR(100) NOT NULL,
        "nickName" VARCHAR(50),
        "role" VARCHAR(50),
        "is_admin" INTEGER DEFAULT 0
    )`)

const createUsersTable = sql.raw(`
    CREATE TABLE IF NOT EXISTS users (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "userid" VARCHAR(10),
        "firstName" VARCHAR(50),
        "lastName" VARCHAR(50),
        "email" VARCHAR(50)
    )`)

const createArticleTable = sql.raw(`
    CREATE TABLE IF NOT EXISTS article (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" VARCHAR(100),
        "content" TEXT,
        "author" VARCHAR(20),
        "category" VARCHAR(20),
        "views" INTEGER,
        "date" VARCHAR(20)
    )`)

let initialized = false

/**
 * 确保 sqlite3 主库表结构存在，并在无用户时写入默认账号
 */
export function ensureSqlite3Database(options?: { reset?: boolean }) {
    if (initialized && !options?.reset) {
        return
    }

    const db = useSqlite3Drizzle()

    if (options?.reset) {
        const resetStatements = [
            sql.raw('DROP TABLE IF EXISTS auth_users'),
            createAuthUsersTable,
            sql.raw('DROP TABLE IF EXISTS users'),
            createUsersTable,
            sql.raw('DROP TABLE IF EXISTS article'),
            createArticleTable,
        ]
        for (const statement of resetStatements) {
            db.run(statement)
        }
        seedAuthUsers()
        initialized = true
        return
    }

    db.run(createAuthUsersTable)
    db.run(createUsersTable)
    db.run(createArticleTable)

    const [{ total }] = db.select({ total: count() }).from(authUsers).all()
    if (total === 0) {
        seedAuthUsers()
    }

    initialized = true
}
