<template>
    <div id="root" flex="~ col" :style="isDev ? 'display: none' : ''">
        <globalHeader v-if="!isLoginPage" />
        <router-view v-slot="{ Component }" class="body">
            <transition
                name="fade" mode="out-in"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter"
                @after-leave="handleAfterLeave"
            >
                <Suspense>
                    <component :is="Component" />
                </Suspense>
            </transition>
        </router-view>
        <globalFooter v-if="!isLoginPage" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AppRoot',
})

const userStore = useUserStore()

const isDev = computed(() => {
    return import.meta.env.VITE_APP_ENV === 'development'
})

const router = useRouter()

const isLoginPage = computed(() => {
    return router.currentRoute.value.name === 'login'
})

provide(onLoginKey, (payload: Objable) => {
    userStore.setInfo(payload)
})

function handleBeforeEnter() {
}
function handleAfterEnter() {
}
function handleAfterLeave() {
}
</script>
