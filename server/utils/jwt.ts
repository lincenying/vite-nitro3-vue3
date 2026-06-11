import type { JWTPayload } from 'jose'
import { jwtVerify, SignJWT } from 'jose'
import { authConfig } from '~server/config/auth'

export interface IAuthTokenPayload extends JWTPayload {
    sub: string
    name: string
    nickName: string
    role: string
    isAdmin: number
}

export type ISignAuthTokenPayload = Pick<IAuthTokenPayload, 'sub' | 'name' | 'nickName' | 'role' | 'isAdmin'>

/**
 * 签发 JWT
 */
export async function signAuthToken(payload: ISignAuthTokenPayload) {
    const secret = new TextEncoder().encode(authConfig.jwtSecret)
    return new SignJWT({
        name: payload.name,
        nickName: payload.nickName,
        role: payload.role,
        isAdmin: payload.isAdmin,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(payload.sub)
        .setIssuedAt()
        .setExpirationTime(authConfig.jwtExpiresIn)
        .sign(secret)
}

/**
 * 校验 JWT 并返回载荷
 */
export async function verifyAuthToken(token: string): Promise<IAuthTokenPayload | null> {
    try {
        const secret = new TextEncoder().encode(authConfig.jwtSecret)
        const { payload } = await jwtVerify(token, secret)
        return payload as IAuthTokenPayload
    }
    catch {
        return null
    }
}
