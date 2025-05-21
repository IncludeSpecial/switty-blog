<script lang="ts" setup>
interface Props {
  path?: string
  title?: string
  date?: string
  description?: string
  image?: string
  alt?: string
  ogImage?: string
  tags?: Array<string>
  published?: boolean
}

const _props = withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  }
  return new Date(date).toLocaleDateString('ru-RU', options)
}

// Функция для получения цвета тега
function getTagColor(index: number): string {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
  ]
  return colors[index % colors.length]
}
</script>

<template>
  <article class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
    <NuxtLink :to="path" class="block">
      <div class="relative h-56 sm:h-52 md:h-60 overflow-hidden">
        <NuxtImg
          class="h-full w-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          :src="image"
          :alt="alt"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div class="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            v-for="(tag, index) in tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm"
            :class="getTagColor(index)"
          >
            {{ tag }}
          </span>
          <span
            v-if="tags.length > 3"
            class="px-2 py-1 text-xs font-medium rounded-md bg-gray-700/70 text-white"
          >
            +{{ tags.length - 3 }}
          </span>
        </div>
        <div class="absolute bottom-3 left-3">
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
            <Icon name="heroicons:calendar" class="w-3.5 h-3.5" />
            <span>{{ formatDate(date) }}</span>
          </div>
        </div>
      </div>
      <div class="p-5">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {{ title }}
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
          {{ description }}
        </p>
        <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-gray-700">
          <span class="text-sm text-slate-500 dark:text-slate-400">
            {{ published ? 'Опубликовано' : 'Черновик' }}
          </span>
          <div class="inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline transition-all duration-300">
            Читать
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
