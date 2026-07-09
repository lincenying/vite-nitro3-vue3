## 2026-07-09 11:42:45

### 修复 TypeScript 6 baseUrl 弃用报错

- 从 `tsconfig.app.json`、`tsconfig.server.json` 移除已弃用的 `baseUrl`（值为 `.` 时可直接删除，`paths` 仍相对配置文件目录解析）

**Commit:** fix: 移除 tsconfig 中已弃用的 baseUrl 配置

---

## 2026-07-08 13:58:00

### 修复开发环境 Nitro 503 不可用错误

- `fetch.ts` 在开发环境 SSR 阶段对 HTTP 503 自动重试（最多 5 次），缓解 Nitro Vite 环境启动竞态导致的 `Vite environment "nitro" is unavailable` 报错

**Commit:** fix: 开发环境 SSR 请求对 Nitro 503 自动重试

---

## 2026-06-17 10:42:02

### 修复 tsconfig.server.json TypeScript 6 rootDir 报错

- 在 `tsconfig.server.json` 中显式设置 `rootDir: "."`，满足 TS 6 对 `outDir` 与源文件目录的明确要求

**Commit:** fix: 修复 tsconfig.server.json 缺少 rootDir 的 TS 6 报错

---

## 2026-06-11 16:44:35

### 修复登录时 auth_users 表不存在

- 新增 `server/db/init.ts`：自动建表并在无用户时写入默认账号
- 新增 `server/plugins/db-init.ts`：服务启动时执行数据库初始化
- `loginUser` 增加兜底初始化，避免首次登录失败
- `/api/sqlite3/init` 改为调用统一的 `ensureSqlite3Database({ reset: true })`

**Commit:** fix: 修复登录时 auth_users 表未初始化报错

---

## 2026-06-11 16:26:47

### 修复 TypeScript 类型报错

- tsconfig 添加 `ignoreDeprecations: 6.0` 消除 baseUrl 弃用警告
- `fetch.ts` 使用 `VITE_APP_ENV` 替代不存在的 `import.meta.env.DEV`
- `createContentStore` 修复 reactive 泛型赋值、`getRecommend` 可选调用问题
- 服务端补充 h3 工具函数显式导入（`createError`、`getCookie`）
- `parsePageQuery` 接受 `Partial<ListPageType>` 参数
- `signAuthToken` 修正 JWT 载荷类型定义
- 移除 `cases.vue` 未使用的 `_useAsyncData` 调试代码

**Commit:** fix: 修复前后端 TypeScript 类型报错

---

## 2026-06-11 12:00:00

### 全面优化改造

**P0 Bug 修复**

- 修复 `use-product-store` 详情接口错误（`/home/detail`）
- 修复 `fetch.ts` 错误响应返回 `null` 的问题
- 移除 `App.vue` 开发环境隐藏整页、无效 keep-alive
- 修复 `sqlite/detail` 重复查询

**构建配置**

- 移除无效的 `terserOptions`，启用 Rollup 代码分割
- `vite-plugin-inspect` 仅开发环境启用

**安全加固**

- 实现 JWT + HttpOnly Cookie 鉴权体系
- 新增 `auth_users` 表与登录/登出/用户信息接口
- 保护 init/upload/写操作端点
- 生产环境返回真实 HTTP 状态码
- 请求日志脱敏；详情页 `v-html` 经 DOMPurify 消毒

**架构优化**

- 新增 `src/api/` 请求层与 `createContentStore` 工厂
- 后端 Service 分层（article/archive/user）
- Mock API 与分页逻辑去重
- 废弃 `server/api/sqlite/*` 旧栈
- 移除 alova、vue-query、elysia、mitt 冗余依赖

**组件与工具**

- 抽取 `ContentDetailSkeleton` / `ContentDetailContent` 组件
- 合并 `scrollToElement` 滚动工具
- 统一事件系统为 `useEventBus`

**其他**

- 新增 `drizzle.config.ts` 与 `db:push` 脚本
- 整理双 Nitro 配置
- 更新 README 文档

```
feat: 全栈模板全面优化与安全加固
```
