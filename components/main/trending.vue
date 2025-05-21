<script lang="ts" setup>
// Get Last 6 Publish Post from the content/blog directory
const { data } = await useAsyncData('trending-post', () =>
  queryContent('/blogs').limit(3).sort({ _id: 1 }).find(),
)

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
  })
})

useHead({
  title: 'Главные',
  meta: [
    {
      name: 'description',
      content:
        'Добро пожаловать на мой блог. Получите информацию по веб-разработке, Javascript, Typescript, NodeJs, Vue и Nuxt, соответствующие статьи, советы, обучающие ресурсы и многое другое.',
    },
  ],
})
</script>

<template>
  <div>
    <div v-if="formattedData && formattedData.length > 0" class="space-y-10">
      <!-- Главный пост (большой) -->
      <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div class="relative">
          <div class="absolute inset-0 bg-black/50 backdrop-filter backdrop-blur-sm" />
          <img
            :src="formattedData[0].image"
            :alt="formattedData[0].alt"
            class="w-full h-80 object-cover object-center opacity-60"
          >
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            <span
              v-for="tag in formattedData[0].tags.slice(0, 3)"
              :key="tag"
              class="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full shadow-lg border border-white/20 hover:bg-white/30 transition-all"
            >
              {{ tag }}
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <div class="flex items-center gap-2 mb-3">
              <div class="flex items-center gap-1.5 bg-indigo-600/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Icon name="heroicons:calendar" class="w-3.5 h-3.5 text-white" />
                <span class="text-xs text-white/80">{{ formattedData[0].date }}</span>
              </div>
            </div>
            <h3 class="text-3xl font-bold text-white mb-3 line-clamp-2">
              {{ formattedData[0].title }}
            </h3>
            <p class="text-white/80 text-lg mb-4 line-clamp-2">
              {{ formattedData[0].description }}
            </p>
            <NuxtLink
              :to="formattedData[0].path"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all group border border-white/20 shadow-lg"
            >
              <span class="font-medium">Читать полностью</span>
              <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Остальные посты -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="post in formattedData.slice(1)"
          :key="post.title"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100 dark:border-gray-700 hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="post.image"
              :alt="post.alt"
              class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div class="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full px-3 py-1 text-xs text-white font-medium shadow-lg">
              {{ post.date }}
            </div>
            <div class="absolute bottom-3 left-3 flex gap-2 flex-wrap">
              <span
                v-for="tag in post.tags.slice(0, 2)"
                :key="tag"
                class="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="p-5 flex flex-col flex-grow bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-slate-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">
              {{ post.description }}
            </p>
            <NuxtLink
              :to="post.path"
              class="flex items-center justify-center gap-2 bg-slate-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium py-2 rounded-lg transition-all group-hover:shadow-md"
            >
              Читать
              <Icon name="mdi:arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <template v-if="data?.length === 0">
      <div class="py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-100 dark:border-gray-700">
        <div class="bg-slate-100 dark:bg-gray-700 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
          <Icon name="mdi:file-document-outline" size="2em" class="text-slate-400 dark:text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
          Популярные посты отсутствуют
        </h3>
        <p class="text-slate-500 dark:text-gray-400">
          Скоро здесь появятся интересные материалы
        </p>
      </div>
    </template>
  </div>
</template>
