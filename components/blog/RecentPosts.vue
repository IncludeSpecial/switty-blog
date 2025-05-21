<script setup lang="ts">
const props = defineProps({
  excludePost: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 3,
  },
})

// Получаем последние статьи
const { data: recentPosts } = await useAsyncData('recent-posts', async () => {
  const posts = await queryContent('/blogs')
    .where({
      _path: { $ne: props.excludePost },
      published: true,
    })
    .sort({ date: -1 })
    .limit(props.limit)
    .find()

  return posts
})

// Форматирование даты
function formatDate(date) {
  if (!date)
    return ''
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-5">
    <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
      <Icon name="heroicons:clock" class="w-5 h-5 mr-2 text-indigo-500" />
      Свежие публикации
    </h3>

    <!-- Список статей -->
    <div v-if="recentPosts && recentPosts.length" class="space-y-3">
      <NuxtLink
        v-for="post in recentPosts"
        :key="post._path"
        :to="post._path"
        class="flex group p-2 hover:bg-slate-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
      >
        <!-- Миниатюра статьи -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden mr-3">
          <img
            :src="post.image || '/blogs-img/blog.jpg'"
            :alt="post.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
        </div>

        <!-- Информация о статье -->
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm text-slate-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1 transition-colors">
            {{ post.title }}
          </h4>
          <div class="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <Icon name="heroicons:calendar" class="w-3 h-3 mr-1" />
            <span>{{ formatDate(post.date) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Пустое состояние -->
    <div v-else class="py-8 text-center">
      <div class="bg-slate-100 dark:bg-gray-700 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
        <Icon name="heroicons:document" class="w-8 h-8 text-slate-400 dark:text-gray-400" />
      </div>
      <p class="text-slate-500 dark:text-slate-400">
        Нет доступных публикаций
      </p>
    </div>
  </div>
</template>
