import type { Article, User } from '~server/types'

import type { ArticleRow, UserRow } from './schema'

export function mapUserRow(row: UserRow): User {
    return {
        id: String(row.id),
        userid: row.userid ?? '',
        firstName: row.firstName ?? '',
        lastName: row.lastName ?? '',
        email: row.email ?? '',
    }
}

export function mapArticleRow(row: ArticleRow): Article {
    return {
        id: String(row.id),
        title: row.title ?? '',
        content: row.content ?? '',
        author: row.author ?? '',
        category: row.category ?? '',
        views: row.views ?? 0,
        date: row.date ?? '',
    }
}
