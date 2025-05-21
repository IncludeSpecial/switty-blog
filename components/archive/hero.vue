<script setup lang="ts">
import { blogsPage } from '~/data'

// Получаем количество всех доступных постов
const { data } = await useAsyncData('all-blog-post-count', () => queryContent('/blogs').sort({ _id: -1 }).find())

const totalPosts = computed(() => data.value?.length || 0)
</script>

<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-white/5 to-purple-500/10 dark:from-blue-900/30 dark:via-gray-900/20 dark:to-purple-900/30 rounded-2xl my-8 shadow-lg">
    <!-- Декоративные элементы -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div class="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 dark:bg-blue-500/10 rounded-full filter blur-3xl" />
      <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 dark:bg-purple-500/10 rounded-full filter blur-3xl" />
      <div class="absolute top-1/2 left-1/4 w-20 h-20 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full filter blur-xl" />
    </div>

    <div class="container mx-auto relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-12 items-center py-12 px-6">
        <div class="col-span-7 sm:pr-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
            <span class="w-2 h-2 bg-blue-500 rounded-full" />
            {{ totalPosts }} статей
          </div>
          <h1 class="text-slate-800 dark:text-white font-bold leading-tight text-4xl md:text-5xl mb-4">
            {{ blogsPage.title }}
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-lg">
            {{ blogsPage.description }}
          </p>
        </div>
        <div class="col-span-5 justify-self-center mt-8 sm:mt-0 relative">
          <div class="w-48 h-48 sm:w-64 sm:h-64 relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 rounded-3xl transform rotate-6 opacity-80" />
            <div class="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
              <div class="grid grid-cols-2 gap-3 p-3">
                <div v-for="i in 6" :key="i" class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-gray-700">
                  <Icon
                    :name="[
                      'heroicons:document-text',
                      'heroicons:newspaper',
                      'heroicons:document-duplicate',
                      'heroicons:book-open',
                      'heroicons:bookmark',
                      'heroicons:archive-box',
                    ][i - 1]"
                    class="w-8 h-8 text-blue-500 dark:text-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
