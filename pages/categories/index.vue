<script lang="ts" setup>
import { makeFirstCharUpper } from '@/utils/helper'

const { data } = await useAsyncData('all-blog-post-for-category', () => queryContent('/blogs').sort({ _id: -1 }).find())

const allTags = new Map()
const totalCategories = ref(0)

data.value?.forEach((blog) => {
  const tags: Array<string> = blog.tags || []
  tags.forEach((tag) => {
    if (allTags.has(tag)) {
      const cnt = allTags.get(tag)
      allTags.set(tag, cnt + 1)
    }
    else {
      allTags.set(tag, 1)
      totalCategories.value++
    }
  })
})

// Фильтрация и сортировка
const filterOption = ref('all') // Варианты: 'all', 'popular', 'alphabetical'
const searchQuery = ref('')

// Сортируем категории в зависимости от выбранного фильтра
const sortedTags = computed(() => {
  let entries = Array.from(allTags.entries())
    .map(([tag, count]) => ({
      tag,
      count,
      formattedTag: makeFirstCharUpper(tag),
    }))

  // Фильтрация по поисковому запросу
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase().trim()
    entries = entries.filter(entry => entry.tag.toLowerCase().includes(query))
  }

  // Сортировка по выбранному фильтру
  if (filterOption.value === 'popular') {
    entries.sort((a, b) => b.count - a.count)
  }
  else if (filterOption.value === 'alphabetical') {
    entries.sort((a, b) => a.formattedTag.localeCompare(b.formattedTag))
  }
  else {
    // По умолчанию - по популярности
    entries.sort((a, b) => b.count - a.count)
  }

  return entries
})

// Категории с иконками (добавляем иконки для самых популярных категорий)
interface CategoryIcons {
  [key: string]: string
  'javascript': string
  'typescript': string
  'vue': string
  'nuxt': string
  'react': string
  'html': string
  'css': string
  'node': string
  'python': string
  'sql': string
  'git': string
  'docker': string
  'linux': string
  'windows': string
  'design-patterns': string
  'patterns': string
  'db': string
  'database': string
  'api': string
  'security': string
  'performance': string
  'ru': string
  'en': string
}

const categoryIcons: CategoryIcons = {
  'javascript': 'logos:javascript',
  'typescript': 'logos:typescript-icon',
  'vue': 'logos:vue',
  'nuxt': 'logos:nuxt-icon',
  'react': 'logos:react',
  'html': 'logos:html-5',
  'css': 'logos:css-3',
  'node': 'logos:nodejs-icon',
  'python': 'logos:python',
  'sql': 'logos:mysql',
  'git': 'logos:git-icon',
  'docker': 'logos:docker-icon',
  'linux': 'logos:linux-tux',
  'windows': 'logos:microsoft-windows-icon',
  'design-patterns': 'carbon:chart-custom',
  'patterns': 'carbon:chart-custom',
  'db': 'carbon:database',
  'database': 'carbon:database',
  'api': 'carbon:api',
  'security': 'carbon:security',
  'performance': 'carbon:chart-line',
  'ru': 'twemoji:flag-russia',
  'en': 'twemoji:flag-united-kingdom',
}

function getCategoryIcon(tag: string): string {
  const normalizedTag = tag.toLowerCase()
  return categoryIcons[normalizedTag as keyof CategoryIcons] || 'heroicons:hashtag'
}

// Получение плиточных цветов
const tagColorClasses = [
  'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
  'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
  'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
  'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300',
]

function getTagColor(index: number): string {
  return tagColorClasses[index % tagColorClasses.length]
}

useHead({
  title: 'Категории',
  meta: [
    {
      name: 'description',
      content:
        'Ниже перечислены все темы, на которые я либо уже писал блог, либо напишу в ближайшее время.',
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Категории',
    description: 'Ниже перечислены все темы, на которые я либо уже писал блог, либо напишу в ближайшее время.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <CategoryHero />

    <div class="px-4 md:px-6 py-8">
      <!-- Поиск и фильтры категорий -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 mb-8 p-5">
        <!-- Заголовок и счетчик -->
        <div class="flex flex-wrap items-center justify-between mb-5">
          <h2 class="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            Все категории
            <span class="ml-2 inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              {{ totalCategories }}
            </span>
          </h2>
        </div>

        <!-- Поле поиска и фильтры -->
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Поиск -->
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              class="block w-full pl-10 pr-3 py-2.5 text-sm text-slate-800 dark:text-white bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              placeholder="Искать категории..."
            >
          </div>

          <!-- Фильтры -->
          <div class="flex space-x-2">
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="filterOption === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-600'"
              @click="filterOption = 'all'"
            >
              Все
            </button>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="filterOption === 'popular'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-600'"
              @click="filterOption = 'popular'"
            >
              Популярные
            </button>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="filterOption === 'alphabetical'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-600'"
              @click="filterOption = 'alphabetical'"
            >
              По алфавиту
            </button>
          </div>
        </div>
      </div>

      <!-- Плитки категорий -->
      <div v-if="sortedTags.length > 0" class="mb-10">
        <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">
          Популярные теги
        </h3>
        <div class="flex flex-wrap gap-2 mb-8">
          <NuxtLink
            v-for="(item, index) in sortedTags.slice(0, 12)"
            :key="item.tag"
            :to="`/categories/${item.tag.toLowerCase()}`"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:transform hover:scale-105"
            :class="getTagColor(index)"
          >
            <Icon :name="getCategoryIcon(item.tag)" class="w-5 h-5" />
            <span class="font-medium">{{ item.formattedTag }}</span>
            <span class="inline-flex justify-center items-center min-w-[20px] h-5 text-xs font-medium rounded-full bg-white/30 dark:bg-black/20 px-1">
              {{ item.count }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Сетка категорий -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategoryCard
          v-for="item in sortedTags"
          :key="item.tag"
          :title="item.formattedTag"
          :count="item.count"
        />

        <div v-if="sortedTags.length === 0" class="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-100 dark:border-gray-700">
          <div class="bg-slate-100 dark:bg-gray-700 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Icon name="heroicons:tag" size="1.5em" class="text-slate-400 dark:text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
            Категории не найдены
          </h3>
          <p class="text-slate-500 dark:text-gray-400">
            {{ searchQuery ? 'Попробуйте изменить параметры поиска' : 'Скоро здесь появятся категории для статей' }}
          </p>
          <button
            v-if="searchQuery"
            class="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            @click="searchQuery = ''"
          >
            Сбросить поиск
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
