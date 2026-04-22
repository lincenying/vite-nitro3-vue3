import type { InferSelectModel } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 与 `server/api/sqlite3/init.ts` 中 DDL 一致 */
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userid: text('userid'),
    firstName: text('firstName'),
    lastName: text('lastName'),
    email: text('email'),
})

export const article = sqliteTable('article', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title'),
    content: text('content'),
    author: text('author'),
    category: text('category'),
    views: integer('views'),
    date: text('date'),
})

/** 归档库 `.archive/db.sqlite3` 中的 `archive` 表 */
export const archive = sqliteTable('archive', {
    c_id: integer('c_id').primaryKey({ autoIncrement: true }),
    c_title: text('c_title'),
    c_intro: text('c_intro'),
    c_content: text('c_content'),
    c_cateid: integer('c_cateid'),
    c_allcateid: text('c_allcateid'),
    c_group: integer('c_group'),
    c_type: integer('c_type'),
    c_pass: text('c_pass'),
    c_img: text('c_img'),
    c_down: text('c_down'),
    c_free: text('c_free'),
    c_cb: integer('c_cb'),
    c_view: integer('c_view'),
    c_posttime: text('c_posttime'),
    c_lasttime: text('c_lasttime'),
    c_user: text('c_user'),
    c_userid: integer('c_userid'),
    c_isshow: integer('c_isshow'),
    c_istop: integer('c_istop'),
    c_iscatetop: integer('c_iscatetop'),
    c_favnum: integer('c_favnum'),
    c_upnum: integer('c_upnum'),
    c_downnum: integer('c_downnum'),
    c_disk: text('c_disk'),
    c_buynum: integer('c_buynum'),
    c_errnum: integer('c_errnum'),
    c_last: text('c_last'),
    c_spider: integer('c_spider'),
})

export type UserRow = InferSelectModel<typeof users>
export type ArticleRow = InferSelectModel<typeof article>
export type ArchiveRow = InferSelectModel<typeof archive>
