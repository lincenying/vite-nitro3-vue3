import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { useSqlite3Drizzle } from '~server/db/client'
import { ensureSqlite3Database } from '~server/db/init'
import { authUsers } from '~server/db/schema'
import { signAuthToken } from '~server/utils/jwt'

export interface ILoginResult {
    id: number
    name: string
    nickName: string
    role: string
    isAdmin: number
    token: string
}

/**
 * 校验用户名密码并签发 JWT
 */
export async function loginUser(name: string, password: string): Promise<ILoginResult | null> {
    ensureSqlite3Database()
    const db = useSqlite3Drizzle()
    const user = db.select().from(authUsers).where(eq(authUsers.name, name)).get()

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return null
    }

    const token = await signAuthToken({
        sub: String(user.id),
        name: user.name,
        nickName: user.nickName ?? user.name,
        role: user.role ?? '',
        isAdmin: user.isAdmin ?? 0,
    })

    return {
        id: user.id,
        name: user.name,
        nickName: user.nickName ?? user.name,
        role: user.role ?? '',
        isAdmin: user.isAdmin ?? 0,
        token,
    }
}

/**
 * 生成密码哈希
 */
export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
}

/**
 * 初始化默认鉴权用户
 */
export function seedAuthUsers(): void {
    const db = useSqlite3Drizzle()
    const defaults = [
        { name: 'admin', nickName: 'admin', role: '系统管理员', isAdmin: 1 },
        { name: 'editor', nickName: 'editor', role: '编辑人员', isAdmin: 1 },
        { name: 'test', nickName: 'test', role: '测试人员', isAdmin: 0 },
    ]

    for (const item of defaults) {
        db.insert(authUsers).values({
            name: item.name,
            passwordHash: hashPassword('123456'),
            nickName: item.nickName,
            role: item.role,
            isAdmin: item.isAdmin,
        }).run()
    }
}
