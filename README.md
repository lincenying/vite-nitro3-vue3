# Vite Nitro3 Vue3

基于 **Nitro 3** + **Vue 3** + **Vite** 的全栈 SSR/SPA Web 脚手架，集成了 Element Plus、Pinia、TypeScript、UnoCSS 等现代前端技术栈。

## 技术栈

| 类别        | 技术                                               |
| ----------- | -------------------------------------------------- |
| 框架        | Vue 3 (Composition API + `<script setup>`)         |
| 构建        | Vite 8                                             |
| 服务端      | Nitro 3 (支持 Bun / Node.js)                       |
| SSR         | 内置 SSR 支持，可切换 SPA 模式                     |
| UI 库       | Element Plus + UnoCSS (原子化 CSS)                 |
| 状态管理    | Pinia                                              |
| 路由        | Vue Router 5 (History / Memory 模式)               |
| 语言        | TypeScript                                         |
| 数据库      | SQLite (better-sqlite3 / bun-sqlite) + Drizzle ORM |
| HTTP 客户端 | ofetch (封装 `get/post/put/delete`)                |
| 模板引擎    | Twig (服务端渲染模板)                              |
| 图标        | Iconify (自动按需导入)                             |
| 代码规范    | ESLint + Stylelint + Prettier + vue-tsc            |
| 容器化      | Docker 多阶段构建                                  |
| 包管理      | pnpm (>=11.5.1)                                    |

## 特性

- 💚 **Vue 3** - Composition API + `<script setup lang="ts">` 语法
- ⚡️ **Vite 8** - 极速 HMR，秒级冷启动
- 🖥️ **SSR 支持** - 通过 `src/config/index.ts` 中 `useSSR` 一键切换 SSR / SPA
- 🚀 **Nitro 3** - 强大的服务端引擎，支持文件系统路由、API 代理、插件系统
- 🗄️ **SQLite + Drizzle ORM** - 内置多数据库支持（默认 SQLite + better-sqlite3/bun-sqlite）
- 📂 **本地存储** - Nitro 内置 FS 存储（K/V），用于轻量数据持久化
- 🎨 **UnoCSS** - 即时按需原子 CSS 引擎
- 🧩 **自动导入** - API、组件、图标自动按需导入，告别手动 `import`
- 🍍 **Pinia** - Vue 官方推荐的状态管理方案
- 📡 **API 封装** - 基于 ofetch 的 `$api` 全局方法，支持请求取消、Cookie 透传
- 🔀 **反向代理** - Nitro 内置路由级代理规则
- 📤 **文件上传** - 内置 multipart 文件上传 API
- 📄 **Twig 模板** - 支持服务端 Twig 模板渲染
- 🐳 **Docker** - 多阶段构建，生产就绪
- 🦾 **TypeScript** - 全面类型安全
- ✅ **代码检查** - ESLint + Stylelint + vue-tsc 全链路检查

## 快速开始

### 环境要求

- **Node.js** >= 22.0.0
- **pnpm** >= 11.5.1（推荐使用 `npm install -g pnpm` 安装）

### 克隆项目

```bash
npx degit lincenying/vite-nitro3-vue3 vite-nitro3-vue3
cd vite-nitro3-vue3
pnpm i
```

### 开发

```bash
pnpm serve         # 启动开发服务器（默认端口 18422）
```

### 构建 & 部署

```bash
pnpm build         # 生产环境构建
pnpm preview       # 预览生产构建（默认端口 8422）

# 部署到服务器 - 上传 .data / .output / template 目录后执行：
node .output/server/index.mjs
```

### 代码检查

```bash
pnpm lint          # ESLint 检查
pnpm lint:fix      # ESLint 检查并修复
pnpm lint:ts       # TypeScript 类型检查
pnpm lint:css      # CSS / SCSS 检查并修复
```

## 项目结构

```
vite-nitro3-vue3/
├── server/                   # Nitro 服务端
│   ├── api/                  # API 路由（文件系统路由）
│   │   ├── archive/          # 归档相关 API
│   │   ├── article/          # 文章相关 API
│   │   ├── comment/          # 评论相关 API
│   │   ├── home/             # 首页相关 API
│   │   ├── news/             # 新闻相关 API
│   │   ├── sqlite/           # SQLite 示例 API
│   │   ├── sqlite3/          # SQLite3 + Drizzle ORM API
│   │   ├── user/             # 用户登录 API
│   │   ├── info.ts           # 服务信息 API
│   │   └── upload.ts         # 文件上传 API
│   ├── db/                   # 数据库层
│   │   ├── drivers/          # 数据库驱动（sqlite.bun / sqlite.node）
│   │   ├── client.ts         # 数据库客户端
│   │   ├── maps.ts           # 数据映射
│   │   └── schema.ts         # Drizzle ORM 表结构定义
│   ├── config/               # 服务端配置（JWT 等）
│   ├── middleware/           # 全局中间件（鉴权等）
│   ├── services/             # 业务服务层
│   ├── plugins/              # Nitro 插件
│   │   └── logs.ts           # 请求日志插件
│   ├── routes/               # 自定义路由（如 Twig 模板渲染）
│   ├── utils/                # 服务端工具函数
│   ├── error.ts              # 全局错误处理
│   └── types.ts              # 服务端类型定义
├── src/                      # 前端源码
│   ├── assets/               # 静态资源（字体、图标、SCSS、图片）
│   ├── components/           # 组件（自动导入）
│   ├── api/                  # API 请求模块（按业务拆分）
│   ├── composables/          # 组合式函数（自动导入）
│   │   ├── fetch.ts          # API 请求封装
│   │   ├── asyncData.ts      # SSR 异步数据
│   │   ├── storage.ts        # 本地存储
│   │   └── ...
│   ├── config/               # 配置文件
│   │   └── index.ts          # SSR/SPA 开关
│   ├── constants/            # 常量定义
│   ├── plugin/               # Vue 插件
│   ├── polyfill/             # Polyfill 脚本
│   ├── router/               # 路由配置（自动扫描 views/）
│   ├── stores/               # Pinia 状态管理（自动导入）
│   ├── types/                # TypeScript 类型定义
│   ├── utils/                # 工具函数
│   ├── views/                # 页面组件（自动生成路由）
│   ├── App.vue               # 根组件
│   ├── client.ts             # 客户端入口
│   ├── server.ts             # SPA 服务端入口
│   ├── server.ssr.ts         # SSR 服务端入口
│   └── main.ts               # 应用工厂函数
├── public/                   # 公共静态资源
├── template/                 # Twig / HTML 模板
├── .data/                    # 本地数据库 & 文件存储（运行时生成）
├── .output/                  # 构建产物（运行时生成）
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── drizzle.config.ts         # Drizzle ORM 配置
├── nitro.config.ts           # Nitro 配置
├── vite.config.ts            # Vite 主配置
├── vite.config.components.ts # 自动导入配置
├── vite.config.build.ts      # 客户端构建与分包配置
├── vite.config.css.ts        # CSS 配置
├── vite.config.macros.ts     # Vue Macros 配置
├── unocss.config.ts          # UnoCSS 配置
├── Dockerfile                # Docker 多阶段构建
└── tsconfig.json             # TypeScript 配置
```

## 核心功能详解

### SSR / SPA 切换

在 [src/config/index.ts](src/config/index.ts) 中修改 `useSSR` 变量：

```ts
// SSR 模式（默认）
export const useSSR = true
// SPA 模式
export const useSSR = false
```

该变量会联动 `vite.config.ts` 中的 `environments.ssr.build.rollupOptions.input`，分别使用 `server.ssr.ts`（SSR）或 `server.ts`（SPA）作为服务端入口。

### Nitro 3 服务端

配置文件：[nitro.config.ts](nitro.config.ts)

- **API 路由**: `server/api/` 下的文件自动映射为 API 端点（文件系统路由）
- **数据库**: 支持多数据库实例（default / sqlite3 / archiveDB），根据环境自动选择 better-sqlite3 或 bun-sqlite 驱动
- **API 代理**: `/php/**` 路径自动代理到配置的后端服务
- **文件存储**: 使用 Nitro 内置 FS 驱动，数据存储在 `.data/fsdb/` 目录
- **自定义插件**: 支持 Nitro 插件系统（如请求日志）
- **Twig 模板**: 支持服务端渲染 Twig 模板文件

### 数据库 (SQLite + Drizzle ORM)

- 使用 [Drizzle ORM](https://orm.drizzle.team/) 进行数据库操作
- 表结构定义在 [server/db/schema.ts](server/db/schema.ts)
- 支持 Node.js (`better-sqlite3`) 和 Bun (`bun-sqlite`) 两种运行时
- 通过 `NITRO_PRESET` 环境变量自动切换驱动
- 开发环境首次使用需调用 `GET /api/sqlite3/init` 初始化表结构与默认用户（admin/editor/test，密码均为 `123456`）
- 旧版 `server/api/sqlite/*` 接口已废弃，生产环境返回 410，请使用 `sqlite3/*`

### JWT 鉴权

- 登录接口 `POST /api/user/login` 校验 `auth_users` 表，签发 JWT 并写入 **HttpOnly Cookie**
- 全局中间件 [server/middleware/auth.ts](server/middleware/auth.ts) 保护写操作与敏感接口
- 前端通过 `GET /api/user/profile` 判断登录状态，Cookie 自动携带（`credentials: 'include'`）
- 登出 `POST /api/user/logout` 清除 Cookie

### API 分层

- 前端请求统一在 [src/api/](src/api/) 按模块封装，Store 通过 `createContentStore` 工厂减少重复
- 后端业务逻辑在 [server/services/](server/services/)，API handler 仅负责参数解析与响应

### 自动导入

项目配置了 [unplugin-auto-import](https://github.com/unplugin-auto-import) 和 [unplugin-vue-components](https://github.com/unplugin-vue-components)：

- **API 自动导入**: `vue`, `vue-router`, `@vueuse/core`, `pinia` 等无需手动 `import`
- **组件自动导入**: `src/components/` 下的组件、Element Plus 组件均可直接使用
- **图标自动导入**: 通过 [unplugin-icons](https://github.com/unplugin-icons) 按需引入 Iconify 图标

> 生成的定义文件在 `src/auto-imports.d.ts` 和 `src/components.d.ts`，可直接查看已自动导入的内容。

### API 封装

封装在 [src/composables/fetch.ts](src/composables/fetch.ts)：

```ts
// 在任意 .vue 页面中直接使用（无需 import）
let detail: Article | null = null

async function getDetail() {
    const { code, data } = await $api.get<Article>('article/detail', { id: 1 })
    if (code === 200) {
        detail = data
    }
}

// 支持请求取消
$fetch.abortRequest('your-abort-key')
```

- 默认判断 `code === 200` 为正常返回，可根据后端结构调整
- 支持 SSR 环境下的 Cookie 透传
- 自动处理 Content-Type（JSON / FormData）
- 10 秒请求超时

### Pinia 状态管理

采用 Setup Store 语法（Composition API 风格），示例：

```ts
// src/stores/use-global-store.ts
const useStore = defineStore('globalStore', () => {
    const state = reactive({
        globalLoading: true,
        routerLoading: false,
    })

    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
    }
})

export default useStore
```

使用（自动导入，无需手动 import）：

```ts
const globalStore = useGlobalStore()
const { globalLoading } = storeToRefs(globalStore)
globalStore.setGlobalLoading(true)
```

### 路由

- `src/views/` 下的 `.vue` 文件自动注册为路由（`/home` → `/`）
- 默认使用 History 模式（SSR 下自动切换为 MemoryHistory）
- 支持路由守卫和 `asyncData` 异步数据预取
- 配置在 [src/router/index.ts](src/router/index.ts)

### 文件上传

[server/api/upload.ts](server/api/upload.ts) 提供文件上传 API：

```ts
// POST /api/upload (multipart/form-data, field: file)
// 返回 { code: 200, data: { url: '/upload/xxx.png' } }
```

上传文件存储在 `public/upload/` 目录。

### Docker 部署

```bash
# 构建镜像
docker build -t vite-nitro3-vue3:latest -f ./Dockerfile .

# 运行容器
docker run -d -p 5123:5123 --name vite-nitro3-vue3 vite-nitro3-vue3:latest

# 常用命令
docker stop vite-nitro3-vue3    # 停止
docker rm vite-nitro3-vue3      # 删除容器
docker rmi vite-nitro3-vue3     # 删除镜像
```

> 如果拉取 node 镜像失败，可参考 [Dockerfile](Dockerfile) 中的镜像替换命令。

## 环境变量

| 变量                 | 说明             | 示例                            |
| -------------------- | ---------------- | ------------------------------- |
| `VITE_APP_ENV`       | 运行环境         | `development` / `production`    |
| `VITE_APP_API`       | 客户端 API 路径  | `/api`                          |
| `VITE_APP_SSR_API`   | SSR 端 API 地址  | `http://localhost:18422/api`    |
| `NITRO_PRESET`       | Nitro 运行预设   | `node_server` / `bun`           |
| `NITRO_HOST_API_URL` | API 代理目标地址 | `https://php.mmxiaowu.com`      |
| `NITRO_JWT_SECRET`   | JWT 签名密钥     | 生产环境务必修改                |
| `PORT`               | 服务端口         | `18422`（开发）/ `8422`（预览） |

## Vite 配置文件

| 文件                                                   | 说明                            |
| ------------------------------------------------------ | ------------------------------- |
| [vite.config.ts](vite.config.ts)                       | 主配置（插件、SSR、别名、解析） |
| [vite.config.components.ts](vite.config.components.ts) | 自动导入组件 / API / 图标       |
| [vite.config.build.ts](vite.config.build.ts)           | 客户端构建输出与 Rollup 分包    |
| [drizzle.config.ts](drizzle.config.ts)                 | Drizzle Kit 迁移与推送配置      |
| [vite.config.css.ts](vite.config.css.ts)               | CSS 预处理相关配置              |
| [vite.config.macros.ts](vite.config.macros.ts)         | Vue Macros 编译期宏配置         |

## 代码规范

| 工具      | 配置文件                                   | 说明                               |
| --------- | ------------------------------------------ | ---------------------------------- |
| ESLint    | [eslint.config.ts](eslint.config.ts)       | JavaScript / TypeScript / Vue 检查 |
| Stylelint | [stylelint.config.js](stylelint.config.js) | CSS / SCSS 检查                    |
| Prettier  | [.prettierrc](.prettierrc)                 | 代码格式化（编辑器层面）           |
| vue-tsc   | [tsconfig.json](tsconfig.json)             | TypeScript 类型检查                |

> **注意**: Prettier 仅作用于编辑器层面，ESLint 中未集成 Prettier 插件。

## IDE

推荐使用 [VS Code](https://code.visualstudio.com/) + [Volar](https://github.com/vuejs/language-tools) 以获得最佳开发体验（如已安装 Vetur，请禁用）。

## 相关模板

- [vite-nitro-vue3](https://github.com/lincenying/vite-nitro-vue3) - Vue3 + Nitro2 + ElementPlus + Vite
- [vite-nitro-vue3-ssr](https://github.com/lincenying/vite-nitro-vue3-ssr) - Vue3 + Nitro2 + ElementPlus + Vite + SSR
- [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite
- [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台
- [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite H5
- [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR H5
- [vite-vue3-web](https://github.com/lincenying/vite-vue3-web) - Vue3 + ElementPlus + Vite Web
- [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite
- [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR
- [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite

## License

[MIT](LICENSE)
