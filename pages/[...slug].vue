<script setup lang="ts">
// Объявляем текущий роут для получения информации о пути
const route = useRoute()
const currentPath = route.path

useHead({
  title: 'Страница не найдена',
  meta: [
    {
      name: 'description',
      content: `Страница по адресу ${currentPath} не найдена`,
    },
  ],
})

defineOgImageComponent('PageNotFound', {
  headline: 'Страница не найдена',
  title: '404',
  description: `Путь ${currentPath} не существует`,
})
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center py-16 px-4">
    <div class="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-slate-100 dark:border-gray-700 overflow-hidden">
      <div class="relative h-32 bg-gradient-to-r from-indigo-600 to-blue-500">
        <!-- Декоративные элементы -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <div class="absolute top-4 left-6 w-20 h-20 rounded-full border-4 border-white" />
          <div class="absolute bottom-4 right-6 w-12 h-12 rounded-full border-4 border-white" />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-8 border-white" />
        </div>

        <!-- Номер ошибки -->
        <div class="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full w-28 h-28 flex items-center justify-center border-8 border-white dark:border-gray-800 shadow-md">
          <span class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">404</span>
        </div>
      </div>

      <div class="pt-16 pb-8 px-8 text-center">
        <h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-3">
          Страница не найдена
        </h1>
        <p class="text-slate-600 dark:text-gray-300 mb-8">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
          Проверьте правильность введенного URL или вернитесь на главную страницу.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/" class="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300">
            <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
            На главную
          </NuxtLink>

          <button class="inline-flex items-center justify-center px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-700 dark:text-white font-medium rounded-lg transition-colors duration-300" @click="() => window.history.back()">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            Назад
          </button>
        </div>
      </div>

      <div class="py-4 px-8 bg-slate-50 dark:bg-gray-700/50 border-t border-slate-100 dark:border-gray-700 text-center text-sm text-slate-500 dark:text-gray-400">
        Текущий путь: <span class="font-mono bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">{{ currentPath }}</span>
      </div>
    </div>
  </div>
</template>
