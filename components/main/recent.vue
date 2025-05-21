<script lang="ts" setup>
// Get Last 6 Publish Post from the content/blog directory
const { data } = await useAsyncData('recent-post', () =>
  queryContent('/blogs').limit(3).sort({ _id: -1 }).find(),
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
    <!-- Стильная компактная карусель -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(post, index) in formattedData"
        :key="post.title"
        class="relative bg-transparent group"
      >
        <!-- Карточка с боковым цветным акцентом -->
        <div
          class="h-full rounded-xl overflow-hidden flex flex-col transform transition duration-500 group-hover:shadow-[0_20px_70px_-15px_rgba(67,56,202,0.3)] dark:group-hover:shadow-[0_20px_70px_-15px_rgba(79,70,229,0.25)] group-hover:translate-y-[-8px]"
          :style="`box-shadow: 0 10px 30px -12px ${index % 3 === 0 ? 'rgba(79, 70, 229, 0.2)' : index % 3 === 1 ? 'rgba(236, 72, 153, 0.2)' : 'rgba(6, 182, 212, 0.2)'};`"
        >
          <div class="flex h-full">
            <!-- Цветная полоса слева - индикатор -->
            <div
              class="w-1.5 h-full"
              :class="{
                'bg-gradient-to-b from-indigo-500 to-blue-500': index % 3 === 0,
                'bg-gradient-to-b from-pink-500 to-rose-500': index % 3 === 1,
                'bg-gradient-to-b from-cyan-400 to-teal-500': index % 3 === 2,
              }"
            />

            <!-- Содержимое карточки -->
            <div class="flex flex-col flex-grow bg-white dark:bg-gray-800 p-0">
              <!-- Изображение -->
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="post.image"
                  :alt="post.alt"
                  class="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-in-out group-hover:scale-105"
                >
                <!-- Наложение градиента на изображение -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <!-- Дата в модном стиле -->
                <div
                  class="absolute top-3 left-3 rounded-md px-2 py-0.5 text-xs text-white font-medium backdrop-blur-md"
                  :class="{
                    'bg-indigo-500/80 border border-indigo-400/40': index % 3 === 0,
                    'bg-pink-500/80 border border-pink-400/40': index % 3 === 1,
                    'bg-cyan-500/80 border border-cyan-400/40': index % 3 === 2,
                  }"
                >
                  {{ post.date }}
                </div>

                <!-- Облако тегов -->
                <div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in post.tags.slice(0, 2)"
                    :key="tag"
                    class="px-2 py-0.5 text-xs rounded-full backdrop-blur-md border border-white/10 transform transition-transform duration-300 hover:scale-105"
                    :class="{
                      'bg-indigo-900/60 text-indigo-100': index % 3 === 0,
                      'bg-pink-900/60 text-pink-100': index % 3 === 1,
                      'bg-cyan-900/60 text-cyan-100': index % 3 === 2,
                    }"
                  >
                    {{ tag }}
                  </span>
                  <span
                    v-if="post.tags.length > 2"
                    class="px-2 py-0.5 text-xs rounded-full bg-black/50 text-white/80 backdrop-blur-md"
                  >
                    +{{ post.tags.length - 2 }}
                  </span>
                </div>
    </div>

              <!-- Контент статьи -->
              <div class="p-4 flex flex-col flex-grow">
                <h3
                  class="text-lg font-bold mb-2 line-clamp-2 transition-colors duration-300"
                  :class="{
                    'text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400': index % 3 === 0,
                    'text-slate-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400': index % 3 === 1,
                    'text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400': index % 3 === 2,
                  }"
                >
                  {{ post.title }}
                </h3>

                <p class="text-slate-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                  {{ post.description }}
                </p>

                <!-- Кнопка действия -->
                <NuxtLink
                  :to="post.path"
                  class="flex items-center justify-between mt-2 group/btn"
                >
                  <span
                    class="text-sm font-medium transition-colors duration-300"
                    :class="{
                      'text-indigo-600 dark:text-indigo-400': index % 3 === 0,
                      'text-pink-600 dark:text-pink-400': index % 3 === 1,
                      'text-cyan-600 dark:text-cyan-400': index % 3 === 2,
                    }"
                  >
                    Читать статью
                  </span>
                  <span
                    class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1"
                    :class="{
                      'bg-indigo-100 dark:bg-indigo-900/30': index % 3 === 0,
                      'bg-pink-100 dark:bg-pink-900/30': index % 3 === 1,
                      'bg-cyan-100 dark:bg-cyan-900/30': index % 3 === 2,
                    }"
                  >
                    <Icon
                      name="heroicons:arrow-right"
                      class="w-3.5 h-3.5"
                      :class="{
                        'text-indigo-600 dark:text-indigo-400': index % 3 === 0,
                        'text-pink-600 dark:text-pink-400': index % 3 === 1,
                        'text-cyan-600 dark:text-cyan-400': index % 3 === 2,
                      }"
                    />
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Декоративный элемент в углу карточки -->
        <div
          class="absolute -top-2 -right-2 w-6 h-6 rounded-full hidden md:flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 z-10"
          :class="{
            'bg-indigo-500': index % 3 === 0,
            'bg-pink-500': index % 3 === 1,
            'bg-cyan-500': index % 3 === 2,
          }"
        >
          <div class="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      <template v-if="data?.length === 0">
        <div class="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-slate-100 dark:border-gray-700">
          <div class="bg-slate-100 dark:bg-gray-700 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Icon name="mdi:file-document-outline" size="2em" class="text-slate-400 dark:text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
            Посты отсутствуют
          </h3>
          <p class="text-slate-500 dark:text-gray-400">
            Скоро здесь появятся новые материалы
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
