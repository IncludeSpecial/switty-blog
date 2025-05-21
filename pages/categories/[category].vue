<script lang="ts" setup>
const route = useRoute()

// take category from route params & make first char upper
const category = computed(() => {
  const name = route.params.category || ''
  let strName = ''.toString()

  if (Array.isArray(name))
    strName = name.at(0) || ''
  else strName = name
  return strName
})

const { data } = await useAsyncData(`category-data-${category.value}`, () =>
  queryContent('/blogs')
    .where({ tags: { $contains: category.value } })
    .find(),
)

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/blogs-img/blog.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/blogs-img/blog.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
    }
  })
})

// Добавляем состояние для фильтрации и сортировки
const sortOption = ref('latest')
const sortedPosts = computed(() => {
  if (!formattedData.value)
    return []

  const posts = [...formattedData.value]

  if (sortOption.value === 'oldest') {
    return posts.sort((a, b) => new Date(a.date) - new Date(b.date))
  }
  else if (sortOption.value === 'a-z') {
    return posts.sort((a, b) => a.title.localeCompare(b.title))
  }
  else if (sortOption.value === 'z-a') {
    return posts.sort((a, b) => b.title.localeCompare(a.title))
  }
  else {
    // По умолчанию новые сначала
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})

useHead({
  title: `Категория: ${category.value}`,
  meta: [
    {
      name: 'description',
      content: `Здесь вы найдете все публикации, связанные с ${category.value}.`,
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: category.value?.toUpperCase(),
    description: `Здесь вы найдете все публикации, связанные с ${category.value}.`,
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4">
    <CategoryTopic />

    <!-- Панель фильтрации и сортировки -->
    <div class="flex flex-col sm:flex-row justify-between mb-8 items-start sm:items-center gap-4">
      <div class="text-slate-700 dark:text-slate-300">
        <span>
          Найдено статей: <strong class="text-indigo-600 dark:text-indigo-400">{{ data?.length || 0 }}</strong>
        </span>
      </div>

      <div class="flex items-center gap-3">
        <label for="sort" class="text-sm text-slate-600 dark:text-slate-400">Сортировать:</label>
        <select
          id="sort"
          v-model="sortOption"
          class="form-select rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-200 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
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
      </div>
    </div>

    <!-- Сетка статей -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard
        v-for="post in sortedPosts"
        :key="post.path"
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

      <div
        v-if="data?.length === 0"
        class="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-100 dark:border-gray-700"
      >
        <div class="bg-slate-100 dark:bg-gray-700 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
          <Icon name="heroicons:document-text" class="w-10 h-10 text-slate-400 dark:text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
          Публикации не найдены
        </h3>
        <p class="text-slate-500 dark:text-gray-400 mb-6">
          В данной категории пока нет статей
        </p>
        <NuxtLink
          to="/categories"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
          Вернуться к категориям
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
