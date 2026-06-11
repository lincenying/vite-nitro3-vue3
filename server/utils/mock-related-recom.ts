import Mock from 'mockjs'

/**
 * 生成相关推荐 Mock 数据
 */
export function createMockRelatedRecom() {
    const template = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        date: '@date("yyyy-MM-dd")',
        title: '@ctitle(10, 30)',
    }))
    return Mock.mock(template)
}
