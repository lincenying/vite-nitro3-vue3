import type { InsertSucces, User } from '~server/types'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody } from 'h3'

import { useSqlite3Drizzle } from '~server/db/client'
import { mapUserRow } from '~server/db/maps'
import { users } from '~server/db/schema'

export default defineEventHandler(async (event) => {
    const db = useSqlite3Drizzle()

    const body = await readBody<User>(event)

    const { firstName, lastName, email } = body!

    if (!firstName || !lastName || !email) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    const userId = String(Math.round(Math.random() * 10_000))

    const run = db.insert(users).values({
        userid: userId,
        firstName,
        lastName,
        email,
    }).run()

    const result: InsertSucces = {
        success: run.changes > 0,
        lastInsertRowid: Number(run.lastInsertRowid),
        changes: run.changes,
    }

    const row = db.select().from(users).where(eq(users.id, Number(run.lastInsertRowid))).get()
    const data = row ? mapUserRow(row) : undefined

    return {
        code: 200,
        message: 'API is working!',
        result,
        data,
    }
})
