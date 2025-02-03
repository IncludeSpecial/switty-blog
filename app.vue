// Исправленный `app.vue`
<script setup>
import { inject } from '@vercel/analytics'
import { siteMetaData } from './data'

inject()

useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  meta: () => siteMetaData,
})
</script>

<template>
  <div class="bg-neutral-100/50 dark:text-zinc-300 dark:bg-neutral-950">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
