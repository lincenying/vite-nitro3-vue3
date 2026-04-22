import type { InsertSucces, User } from '~server/types'
import { defineEventHandler, HTTPError, readBody } from 'h3'
import { useDatabase } from 'nitro/database'

export default defineEventHandler(async (event) => {
    const db = useDatabase()

    const body = await readBody<User>(event)

    const { firstName, lastName, email } = body!

    if (!firstName || !lastName || !email) {
        return new HTTPError({
            status: 400,
            statusMessage: '请填写姓名、邮箱',
            data: { field: 'firstName, lastName, email' },
        })
    }

    const userId = String(Math.round(Math.random() * 10_000))
    // const data = await db.sql`INSERT INTO users VALUES (null, ${userId}, ${firstName}, ${lastName}, ${email})`
    const result = await db.prepare('INSERT INTO users VALUES (null, ?, ?, ?, ?)').run(userId, firstName, lastName, email) as InsertSucces

    const data = await db.prepare('select * from users where id = ?').get(result.lastInsertRowid) as User

    return {
        code: 200,
        message: 'API is working!',
        result,
        data,
    }
})
