<script setup lang="ts">
defineProps({
  posts: {
    type: Array,
    default: () => [],
    required: true,
  },
})

// Функция для форматирования даты
function formatDate(date: string): string {
  if (!date)
    return ''
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Функция для получения случайного цвета из палитры
function getRandomColor(seed: string): string {
  const colors = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-rose-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-red-600',
  ]
  // Преобразуем строку в число для стабильного "случайного" выбора
  let hash = 0
  for (let i = 0; i < seed.length; i++)
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
  
  return colors[Math.abs(hash) % colors.length]
}
</script>

<template>
  <div v-if="posts && posts.length" class="related-posts-grid">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 border border-slate-200/60 dark:border-gray-700/60 relative"
      >
        <!-- Декоративный градиент у верхнего края карточки -->
        <div 
          class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" 
          :class="getRandomColor(post._path)"
        ></div>
        
        <!-- Обложка поста -->
        <div class="relative aspect-video overflow-hidden">
          <!-- Фон для изображения, если оно не загрузится -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800 animate-pulse"></div>
          
          <!-- Основное изображение -->
          <img
            :src="post.image || '/blogs-img/blog.jpg'"
            :alt="post.title"
            class="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 will-change-transform z-10"
          >
          
          <!-- Градиент поверх изображения -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity z-20"></div>

          <!-- Тег с новым дизайном -->
          <div 
            v-if="post.tags && post.tags.length" 
            class="absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md z-30 transform group-hover:scale-110 transition-transform duration-300"
          >
            #{{ post.tags[0] }}
          </div>

          <!-- Улучшенное отображение даты -->
          <div class="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm z-30">
            <Icon name="heroicons:calendar" class="w-3.5 h-3.5 mr-1.5 text-blue-300" />
            {{ formatDate(post.date) }}
          </div>
        </div>

        <div class="p-5 flex flex-col flex-grow">
          <!-- Заголовок с улучшенной типографикой -->
          <h4 class="font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg leading-tight">
            {{ post.title }}
          </h4>

          <!-- Описание с улучшенным стилем -->
          <p v-if="post.description" class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 flex-grow leading-relaxed">
            {{ post.description }}
          </p>

          <!-- Улучшенная кнопка "Читать" -->
          <div class="flex items-center mt-auto">
            <span class="text-sm text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center">
              Читать статью
              <div class="ml-2 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transform group-hover:translate-x-1 transition-transform duration-300">
                <Icon name="heroicons:arrow-right" class="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
            </span>
          </div>
        </div>
        
        <!-- Эффект наведения - подсветка края карточки -->
        <div class="absolute inset-0 border border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-xl transition-colors duration-300 pointer-events-none"></div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.related-posts-grid {
  container-type: inline-size;
}

@container (max-width: 768px) {
  .related-posts-grid .grid {
    grid-template-columns: 1fr;
  }
}

/* Плавные переходы для карточек */
.related-posts-grid a {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.related-posts-grid a:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
 