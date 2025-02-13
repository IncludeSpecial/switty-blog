<script lang="ts" setup>
// Получаем последние 3 опубликованных поста
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryContent('/blogs').limit(3).sort({ _id: -1 }).where({ published: true }).find(),
)

// Получаем все посты
const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryContent('/blogs').where({ published: true }).find(),
)

const formattedRecentPosts = computed(() => formatPosts(recentPosts.value))
const formattedAllPosts = computed(() => formatPosts(allPosts.value))

// Функция для форматирования постов
function formatPosts(posts) {
  return posts?.map(article => ({
    path: article._path,
    title: article.title || 'no-title available',
    description: article.description || 'no-description available',
    image: article.image || '/not-found.jpg',
    alt: article.alt || 'no alter data available',
    ogImage: article.ogImage || '/not-found.jpg',
    date: article.date || 'not-date-available',
    tags: article.tags || [],
    published: article.published || false,
  })) || []
}

// Функция для получения рекомендованных постов
const recommendedPosts = computed(() => {
  const recentTags = formattedRecentPosts.value.flatMap(post => post.tags)
  const uniqueTags = [...new Set(recentTags)]

  return formattedAllPosts.value
    .filter(post => !formattedRecentPosts.value.some(recentPost => recentPost.path === post.path))
    .map(post => ({
      ...post,
      relevance: post.tags.filter(tag => uniqueTags.includes(tag)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3)
})

useHead({
  title: 'Главные',
  meta: [
    {
      name: 'description',
      content: 'Добро пожаловать на мой блог. Получите информацию по веб-разработке, Javascript, Typescript, NodeJs, Vue и Nuxt, соответствующие статьи, советы, обучающие ресурсы и многое другое.',
    },
  ],
})
</script>

<template>
  <div class="pb-10 px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-three-points-outline" size="2em" class="text-black dark:text-zinc-300" />
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300">
        Недавние посты
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="post in formattedRecentPosts" :key="post.title">
        <BlogCard v-bind="post" />
      </template>
    </div>

    <div class="flex flex-row items-center space-x-3 pt-10 pb-3">
      <Icon name="mdi:lightbulb-outline" size="2em" class="text-black dark:text-zinc-300" />
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300">
        Рекомендуемые посты
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="post in recommendedPosts" :key="post.title">
        <BlogCard v-bind="post" />
      </template>
    </div>

    <template v-if="formattedRecentPosts.length === 0 && recommendedPosts.length === 0">
      <BlogEmpty />
    </template>
  </div>
</template>
