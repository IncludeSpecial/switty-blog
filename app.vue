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

// Определяем цветовую тему
const colorMode = useColorMode()

// Функция для переключения темы
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Следим за системной темой и устанавливаем соответствующую тему
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const updateTheme = (event) => {
    colorMode.preference = event.matches ? 'dark' : 'light'
  }

  // Установка начальной темы
  if (!colorMode.preference)
    colorMode.preference = mediaQuery.matches ? 'dark' : 'light'

  // Слушаем изменения системной темы
  mediaQuery.addEventListener('change', updateTheme)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
    <NuxtLoadingIndicator />

    <!-- Кнопка переключения темы -->
    <button
      class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-gray-700"
      aria-label="Переключить тему"
      @click="toggleTheme"
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
        class="w-5 h-5 text-slate-700 dark:text-slate-200"
      />
    </button>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
