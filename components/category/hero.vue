<script setup lang="ts">
import { categoryPage } from '~/data'

// Количество всех доступных категорий
const { data } = await useAsyncData('all-blog-post-for-category', () => queryContent('/blogs').sort({ _id: -1 }).find())

const allTags = new Map()
const totalCategories = ref(0)

data.value?.forEach((blog) => {
  const tags: Array<string> = blog.tags || []
  tags.forEach((tag) => {
    if (!allTags.has(tag)) {
      allTags.set(tag, 1)
      totalCategories.value++
    }
  })
})
</script>

<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-white/5 to-pink-500/10 dark:from-indigo-900/30 dark:via-gray-900/20 dark:to-pink-900/30 rounded-2xl my-8 shadow-lg">
    <!-- Декоративные элементы -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div class="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full filter blur-3xl" />
      <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 dark:bg-pink-500/10 rounded-full filter blur-3xl" />
      <div class="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-500/20 dark:bg-blue-500/10 rounded-full filter blur-xl" />
    </div>

    <div class="container mx-auto relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-12 items-center py-12 px-6">
        <div class="col-span-7 sm:pr-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
            <span class="w-2 h-2 bg-indigo-500 rounded-full" />
            {{ totalCategories }} категорий
          </div>
          <h1 class="text-slate-800 dark:text-white font-bold leading-tight text-4xl md:text-5xl mb-4">
            {{ categoryPage.title }}
          </h1>
          <p class="text-slate-600 dark:text-slate-300 text-lg">
            {{ categoryPage.description }}
          </p>
        </div>
        <div class="col-span-5 justify-self-center mt-8 sm:mt-0 relative">
          <div class="w-48 h-48 sm:w-64 sm:h-64 relative">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-800 rounded-3xl transform rotate-6 opacity-80" />
            <div class="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
              <div class="grid grid-cols-3 gap-3 p-3">
                <div
                  v-for="i in 9" :key="i" class="w-8 h-8 sm:w-12 sm:h-12 rounded-lg"
                  :class="[
                    i % 3 === 0 ? 'bg-indigo-500 dark:bg-indigo-600'
                    : i % 3 === 1 ? 'bg-slate-200 dark:bg-gray-700'
                      : 'bg-pink-400 dark:bg-pink-600',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
