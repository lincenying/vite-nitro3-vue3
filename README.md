# Nitro Vue3

用nitro3来跑vue3, vue3 web项目脚手架, 包含技术栈(Vue3 + Element-Plus + Pinia + Vite + TS + Unocss)

## Features

- 💚 [Vue3](https://cn.vuejs.org/) - 易学易用，性能出色，适用场景丰富。
- ⚡️ [Vite](https://cn.vitejs.dev/) - 即时 HMR.
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子 CSS 引擎
- 😃 使用纯 CSS 中任何图标集的图标，由 [UnoCSS](https://github.com/unocss/unocss) 驱动.
- 🔥 `<script setup lang="ts">` 语法.
- 🍍 [通过 Pinia 进行状态管理](https://github.com/vuejs/pinia), 详见 [./stores/use-index-store.ts](./stores/use-product-store.ts).
- 📥 API 自动导入 - 用于 Composition API、VueUse 和自定义可组合项
- 🏎 零配置云功能和部署
- 🦾 当然是 TypeScript.

## IDE

建议使用 [VS Code](https://code.visualstudio.com/) 和 [Volar](https://github.com/vuejs/language-tools) 以获得最佳体验（您可能需要禁用 [Vetur](https://vuejs.github.io/vetur/) 如果你有的话）。

## Variations

- [vite-nitro-vue3](https://github.com/lincenying/vite-nitro-vue3) - Vue3 + Nitro2 + ElementPlus + Vite web入门模板
- [vite-nitro-vue3-ssr](https://github.com/lincenying/vite-nitro-vue3-ssr) - Vue3 + Nitro2 + ElementPlus + Vite + SSR web入门模板
- [vite-nitro3-vue3](https://github.com/lincenying/vite-nitro3-vue3) - Vue3 + Nitro3 + ElementPlus + Vite + SSR web入门模板
- [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite 入门模板
- [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台入门模板
- [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite 入门模板
- [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR 入门模板
- [vite-vue3-uniapp](https://github.com/lincenying/vite-vue3-uniapp) - Uniapp3 + Vite 入门模板
- [vite-vue3-web](https://github.com/lincenying/vite-vue3-web) - Vue3 + ElementPlus + Vite web入门模板
- [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite 入门模板
- [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR 入门模板
- [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite 入门模板

## Try it now!

### Clone to local

如果您更喜欢使用更干净的 git 历史记录手动执行此操作

```bash
npx degit lincenying/vite-nitro3-vue3 vite-nitro3-vue3
cd vite-nitro3-vue3
pnpm i # 如果您没有安装 pnpm，请运行：npm install -g pnpm
```

### 开发环境

```bash
pnpm serve
```

### 生产环境

```bash
pnpm build # 生产环境
```

### 生产环境预览

```bash
pnpm preview
```

### 生产环境部署

```bash
# 将 .data, .output, template 文件夹上传到服务器
node .output/server/index.mjs
```

### Lint 和修复文件

```bash
pnpm lint # eslint检测不修复
pnpm lint:fix # eslint检测并修复
pnpm lint:ts # ts 类型检测
pnpm lint:css # css 检测并修复

```

### Docker

```bash
# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
docker build -t vite-nitro3-vue3:1.25.1029 -f ./Dockerfile .
# 运行镜像
docker run -d -p 5123:5123 --add-host=host.docker.internal:host-gateway --name vite-nitro3-vue3 vite-nitro3-vue3:1.25.1029
# 进入镜像
docker exec -it vite-nitro3-vue3 /bin/sh
# 停止容器
docker stop vite-nitro3-vue3
# 删除容器
docker rm vite-nitro3-vue3
# 删除镜像
docker rmi vite-nitro3-vue3
```

## Nitro

使用 [Nitro](https://nitro.unjs.io/) 来构建 API 服务器。

## 环境变量

具体参数可查看根目录的 `.env.xxx`, 其中 `development` 为开发环境, `production` 依次为 `生产环境`
根据自己需要, 启动/编译不同的环境

## SSR or SPA

文件`vite.config.ts`里设置`entry: './src/server.ts'`为spa, `entry: './src/server.ssr.ts',`为ssr

## 自动引入UI库组件/项目组件/函数等

项目已经配置了`unplugin-auto-import`和`unplugin-vue-components`
前者能自动引入vue, vue-router, vueuse等提供的方法, 而无需一遍遍的`import`
后者能自动引入UI组件, 及项目被定义的组件, 也不用一遍遍的`import`
详细配置见: `vite.config.components.ts`
相关文档见:
https://github.com/antfu/unplugin-auto-import#readme
https://github.com/antfu/unplugin-vue-components#readme

## Pinia 状态管理

vue 官方出品的, 比vuex更好用的状态管理
使用方法:
在pinia文件夹下,新建一个ts文件, 如: `use-global-store.ts`
里面代码如下:

```ts
import type { GlobalState } from './pinia.types'

const useStore = defineStore('globalStore', () => {
    const state: GlobalState = reactive({
        globalLoading: true,
        routerLoading: false,
    })

    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }
    const setRouterLoading = (payload: boolean) => {
        state.routerLoading = payload
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
        setRouterLoading,
    }
})

export default useStore
```

那么在需要用到该状态管理的地方, 只需要

```ts
const userStore = useGlobalStore()
const { globalLoading } = storeToRefs(userStore)
userStore.setGlobalLoading(true)
```

即可, 因为配置了`unplugin-auto-import`, 所以根本无需要`import`, 你只需要直接把文件名改成驼峰的方式, 直接当函数使用即可
注意: 直接用文件名当函数名, 只有代码是用`export default`导出时可用, 如果是用`export const xxx`, `export function xxx {}` 这样导出的, 那么直接使用xxx作为方法名即可
具体可以看`src/auto-imports.d.ts`为你生成了那些方法, 这里的方法都可以直接使用, 而无需`import`

## 路由

放在`views`文件夹下的`vue`文件, 都会自动加入路由中, 根据你自己的使用情况, 可以修改`src/router/index.ts`以适配
是使用`hash`还是`history`模式, 也可以在上面的文件中修改

## Api封装

`src/composables/fetch.ts`封装了`get, post, put, delete`4中常用的方法, 分别对应4种method, 而`$api`为全局方法, 可以在任何`.vue`页面, 直接使用`$api.get/post/put/delete`
接口默认判断code=200为正常返回, 如果后端接口不是用code作为判断, 那么需要在`src/composables/fetch.ts`做对应修改
如:

```ts
let detail: NullAble<Article> = null
async function getDetail() {
    const { code, data } = await $api.get<Article>('article/detail', {})
    if (code === 200) {
        detail = data
    }
}

getDetail()
```

## vite 相关配置文件

- vite.config.ts 主配置文件
- vite.config.components.ts 自动引入组件配置文件
- vite.config.build.ts 打包/开发环境配置文件
- vite.config.css.ts css相关配置文件
- vite.config.macros.ts 宏配置文件

## 开发环境配置proxy跨域

```ts
export default {
    // ...
    server: {
        port: 7771,
        proxy: {
            '/api': {
                target: 'https://php.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
    },
    // ...
}
```

详见: `vite.config.build.ts`

## Unocss

unocss是一个及时/按需/原子化的css引擎, 项目中也做了相关配置, 可直接使用
配置见:
https://github.com/lincenying/unocss-base-config/blob/main/src/uno.web.config.ts
官方文档见:
https://unocss.dev/

## eslint/stylelint/prettierrc/vue-tsc

根目录下的`eslint.config.ts`、`stylelint.config.js`、`.prettier`内置了 lint 规则，帮助你规范地开发代码，有助于提高团队的代码质量和协作性，可以根据团队的规则进行修改
注意: `prettier`只在编辑器层面, 在`eslint`中并没有添加`prettier`插件

## License

[MIT]
