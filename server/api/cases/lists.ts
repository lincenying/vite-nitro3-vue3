import { createMockListHandler } from '~server/utils/create-mock-list-handler'

export default createMockListHandler({
    title: '@ctitle(7, 20)',
    date: '@date("yyyy-MM-dd")',
    intro: '@cparagraph(10, 15)',
}, 12, 'imgUrl')
