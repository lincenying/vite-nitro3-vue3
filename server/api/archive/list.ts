import { Elysia } from 'elysia'

export default new Elysia().get('/api/archive/list', () => {
    return {
        code: 200,
        message: 'ok',
        data: [],
    }
})
