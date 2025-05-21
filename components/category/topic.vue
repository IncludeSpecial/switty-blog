<script setup lang="ts">
import { makeFirstCharUpper } from '@/utils/helper'

const route = useRoute()

// take category from route params & make first char upper
const category = computed(() => {
  const name = route.params.category || ''
  let strName = ''

  if (Array.isArray(name))
    strName = name.at(0) || ''
  else strName = name
  return makeFirstCharUpper(strName)
})

// Получаем данные статей в этой категории
const { data: categoryPosts } = await useAsyncData(`category-count-${category.value}`, () =>
  queryContent('/blogs')
    .where({ tags: { $contains: category.value.toLowerCase() } })
    .find(),
)

const postsCount = computed(() => categoryPosts.value?.length || 0)

// Цвета для категорий (аналогично card.vue)
const categoryColors = {
  javascript: 'bg-amber-500 text-amber-50',
  typescript: 'bg-blue-500 text-blue-50',
  vue: 'bg-emerald-500 text-emerald-50',
  nuxt: 'bg-green-500 text-green-50',
  react: 'bg-cyan-500 text-cyan-50',
}

// Получаем цвет для текущей категории или используем запасной
const categoryColor = computed(() => {
  const normalizedName = category.value.toLowerCase()
  return categoryColors[normalizedName] || 'bg-indigo-500 text-indigo-50'
})
</script>

<template>
  <div class="container mx-auto mb-10">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
      <!-- Декоративные элементы -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-slate-200/50 dark:to-gray-700/50 rounded-full transform translate-x-16 -translate-y-16" />
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-transparent to-slate-200/50 dark:to-gray-700/50 rounded-full transform -translate-x-12 translate-y-12" />

      <div class="relative py-8 px-6 md:px-8 z-10">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center px-3 py-1 mb-4 rounded-full" :class="categoryColor">
              <span class="text-xs font-medium uppercase tracking-wider">Категория</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <span>#{{ category }}</span>
              <span class="inline-flex items-center justify-center px-2.5 py-0.5 text-sm font-medium rounded-full bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-slate-300">
                {{ postsCount }}
              </span>
            </h1>
            <p class="mt-2 text-slate-600 dark:text-gray-300 max-w-2xl">
              Здесь вы найдете все статьи, связанные с категорией <strong>{{ category }}</strong>. Изучайте материалы, делитесь опытом и находите полезную информацию.
            </p>
          </div>

          <div class="inline-flex items-center self-end">
            <NuxtLink to="/categories" class="px-4 py-2 text-sm text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm transition-colors duration-300 inline-flex items-center">
              <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
              Все категории
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
