<script lang="ts" setup>
const { data } = await useAsyncData('home', () => queryContent('/blogs').sort({ _id: -1 }).find())

const elementPerPage = ref(6)
const pageNumber = ref(1)
const searchQuery = ref('')
const sortOption = ref('latest')

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/not-found.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/not-found.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
    }
  }) || []
})

const sortedData = computed(() => {
  const result = [...formattedData.value]

  if (sortOption.value === 'oldest') {
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
  else if (sortOption.value === 'a-z') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }
  else if (sortOption.value === 'z-a') {
    result.sort((a, b) => b.title.localeCompare(a.title))
  }
  else {
    // По умолчанию новые сначала (latest)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return result
})

const searchData = computed(() => {
  if (!searchQuery.value)
    return sortedData.value

  const query = searchQuery.value.toLowerCase().trim()
  return sortedData.value.filter((post) => {
    // Поиск по заголовку
    if (post.title.toLowerCase().includes(query))
      return true

    // Поиск по описанию
    if (post.description.toLowerCase().includes(query))
      return true

    // Поиск по тегам
    if (post.tags.some(tag => tag.toLowerCase().includes(query)))
      return true

    return false
  })
})

const paginatedData = computed(() => {
  const startIndex = (pageNumber.value - 1) * elementPerPage.value
  const endIndex = startIndex + elementPerPage.value
  return searchData.value.slice(startIndex, endIndex)
})

const totalPage = computed(() => {
  const totalItems = searchData.value.length || 0
  return Math.max(1, Math.ceil(totalItems / elementPerPage.value))
})

function onPreviousPageClick() {
  if (pageNumber.value > 1) {
    pageNumber.value -= 1
    scrollToTop()
  }
}

function onNextPageClick() {
  if (pageNumber.value < totalPage.value) {
    pageNumber.value += 1
    scrollToTop()
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Сбрасываем страницу на первую при изменении поисковой строки или опции сортировки
watch([searchQuery, sortOption], () => {
  pageNumber.value = 1
})

useHead({
  title: 'Архив блога',
  meta: [
    {
      name: 'description',
      content: 'Здесь вы найдете все сообщения в блоге, которые я написал и опубликовал на этом сайте.',
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Архив блога',
    description: 'Здесь вы найдете все сообщения в блоге, которые я написал и опубликовал на этом сайте.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />

    <!-- Фильтрация и поиск -->
    <div class="px-4 md:px-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Поиск -->
          <div class="flex-grow">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="block w-full pl-10 pr-3 py-2.5 text-sm text-slate-800 dark:text-white bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Искать статьи..."
              >
            </div>
          </div>

          <!-- Сортировка -->
          <div class="flex-shrink-0 min-w-[200px]">
            <div class="relative">
              <select
                v-model="sortOption"
                class="block w-full py-2.5 px-4 pr-8 text-sm text-slate-800 dark:text-white bg-slate-50 dark:bg-gray-700 rounded-lg border border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 appearance-none"
              >
                <option value="latest">
                  Сначала новые
                </option>
                <option value="oldest">
                  Сначала старые
                </option>
                <option value="a-z">
                  По алфавиту (А-Я)
                </option>
                <option value="z-a">
                  По алфавиту (Я-А)
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Icon name="heroicons:chevron-down" class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Результаты поиска -->
    <div class="px-4 md:px-6 mb-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-slate-800 dark:text-white">
          Найдено статей: <span class="text-blue-600 dark:text-blue-400">{{ searchData.length }}</span>
        </h2>

        <div class="text-sm text-slate-500 dark:text-slate-400">
          Страница {{ pageNumber }} из {{ totalPage }}
        </div>
      </div>

      <ClientOnly>
        <div
          v-auto-animate
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <template v-for="post in paginatedData" :key="post.path">
            <ArchiveCard
              :path="post.path"
              :title="post.title"
              :date="post.date"
              :description="post.description"
              :image="post.image"
              :alt="post.alt"
              :og-image="post.ogImage"
              :tags="post.tags"
              :published="post.published"
            />
          </template>

          <div
            v-if="paginatedData.length === 0"
            class="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-100 dark:border-gray-700"
          >
            <div class="bg-slate-100 dark:bg-gray-700 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
              <Icon name="heroicons:document-magnifying-glass" class="w-10 h-10 text-slate-400 dark:text-gray-400" />
            </div>
            <h3 class="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
              Статьи не найдены
            </h3>
            <p class="text-slate-500 dark:text-gray-400 mb-4">
              По вашему запросу не найдено ни одной статьи
            </p>
            <button
              v-if="searchQuery"
              class="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              @click="searchQuery = ''"
            >
              Сбросить поиск
            </button>
          </div>
        </div>

        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <BlogLoader v-for="i in 3" :key="i" />
          </div>
        </template>
      </ClientOnly>

      <!-- Пагинация -->
      <div class="flex justify-center items-center gap-2 my-8">
        <button
          :disabled="pageNumber <= 1"
          class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          :class="pageNumber > 1
            ? 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700'
            : 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'"
          @click="onPreviousPageClick"
        >
          <Icon name="heroicons:chevron-left" class="w-5 h-5" />
        </button>

        <div class="flex items-center">
          <template v-for="page in Math.min(5, totalPage)" :key="page">
            <button
              v-if="page <= 3 || page > totalPage - 2 || Math.abs(page - pageNumber) <= 1"
              class="inline-flex items-center justify-center w-10 h-10 rounded-full mx-1 text-sm font-medium transition-colors"
              :class="page === pageNumber
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700'"
              @click="pageNumber = page"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === 4 && totalPage > 5 && pageNumber < totalPage - 1"
              class="px-1 text-slate-400 dark:text-slate-500"
            >...</span>
          </template>
        </div>

        <button
          :disabled="pageNumber >= totalPage"
          class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          :class="pageNumber < totalPage
            ? 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700'
            : 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'"
          @click="onNextPageClick"
        >
          <Icon name="heroicons:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </main>
</template>
