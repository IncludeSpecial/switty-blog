// Исправленный `error.vue`
<script setup lang="ts">
const error = useError()

useHead({
  title: error?.statusCode === 404 ? '404 - Страница не найдена' : 'Произошла ошибка',
  meta: [
    {
      name: 'description',
      content: error?.statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка',
    },
    {
      property: 'og:image',
      content: '/default-og-image.png',
    },
  ],
})

// Функция для перехода на главную страницу
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="container max-w-lg mx-auto text-center">
      <div class="mb-8">
        <div class="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon
            :name="error?.statusCode === 404 ? 'heroicons:question-mark-circle' : 'heroicons:exclamation-triangle'"
            class="w-12 h-12 text-indigo-600 dark:text-indigo-400"
          />
        </div>
        <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          {{ error?.statusCode === 404 ? '404 - Страница не найдена' : 'Произошла ошибка' }}
        </h1>
        <p class="text-slate-600 dark:text-gray-400 mb-6">
          {{ error?.statusCode === 404
            ? 'Страница, которую вы ищете, не существует или была перемещена.'
            : 'При загрузке страницы произошла ошибка. Пожалуйста, попробуйте снова.' }}
        </p>
        <button
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
          @click="handleError"
        >
          <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
          Вернуться на главную
        </button>
      </div>
    </div>
  </div>
</template>
