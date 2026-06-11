/**
 * 鉴权相关配置，从环境变量读取
 */
export const authConfig = {
    jwtSecret: process.env.NITRO_JWT_SECRET || 'vite-nitro3-vue3-dev-secret-change-in-production',
    jwtExpiresIn: process.env.NITRO_JWT_EXPIRES_IN || '7d',
    cookieName: 'token',
    cookieMaxAge: 60 * 60 * 24 * 7,
}
