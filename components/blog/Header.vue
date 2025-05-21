<script setup lang="ts">
interface Props {
  title: string
  image: string
  alt: string
  description: string
  date: string
  tags: Array<string>
}

withDefaults(defineProps<Props>(), {
  title: 'no-title',
  image: '#',
  alt: 'no-img',
  description: 'no description',
  date: 'no-date',
  tags: () => [],
})

function formatDate(date: string): string {
  if (!date || date === 'no-date')
    return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  try {
  return new Date(date).toLocaleDateString('ru-RU', options)
  }
  catch (e) {
    return date
  }
}

// Функция для получения случайного цвета для тега из предопределенного набора
function getTagColor(index: number): string {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70',
    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/70',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/70',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/70',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/70',
  ]
  return colors[index % colors.length]
}
</script>

<template>
  <header class="relative pb-24 pt-16 overflow-hidden">
    <!-- Фоновые элементы -->
    <div class="absolute inset-0 -z-10">
      <!-- Основной градиент фона -->
      <div class="absolute inset-0 bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-blue-950/20 dark:via-gray-900/90 dark:to-gray-900"></div>
      
      <!-- Радиальный градиент для создания свечения -->
      <div class="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_700px_at_50%_100px,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(circle_700px_at_50%_100px,rgba(59,130,246,0.08),transparent)]"></div>
      
      <!-- Сетка для фона -->
      <div class="absolute inset-0 bg-grid-slate-100/[0.05] bg-[size:30px_30px] dark:bg-grid-slate-700/[0.05]"></div>
      
      <!-- Декоративные элементы -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Основной контент заголовка -->
    <div class="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Информация о статье -->
      <div class="flex flex-col items-center text-center max-w-3xl mx-auto">
        <!-- Категории и дата -->
        <div class="flex flex-wrap justify-center gap-3 mb-6">
          <time
            :datetime="date"
            class="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <Icon name="heroicons:calendar" class="mr-1.5 w-4 h-4 text-blue-500 dark:text-blue-400" />
            {{ formatDate(date) }}
          </time>
          <div
            v-if="tags.length > 0"
            class="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <Icon name="heroicons:tag" class="mr-1.5 w-4 h-4 text-blue-500 dark:text-blue-400" />
            {{ tags.length }} тег{{ tags.length > 1 ? 'а' : '' }}
          </div>
        </div>

        <!-- Заголовок с 3D эффектом и градиентом -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black mb-7 leading-tight header-gradient tracking-tight">
      {{ title || '' }}
    </h1>

        <!-- Описание статьи -->
        <p class="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed">
          {{ description }}
        </p>

        <!-- Теги -->
        <div class="flex flex-wrap justify-center gap-2.5 mb-14">
          <NuxtLink
            v-for="(tag, index) in tags"
            :key="tag"
            :to="`/categories/${tag.toLowerCase()}`"
            :class="getTagColor(index)"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-transparent hover:shadow-md transform hover:-translate-y-1 cursor-pointer"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>

      <!-- Главное изображение статьи с эффектами -->
      <div class="relative w-full max-w-4xl mx-auto">
        <!-- Эффект подсветки вокруг изображения -->
        <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 dark:opacity-40 group-hover:opacity-70 transition duration-1000"></div>
        
        <div class="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
          <!-- Фоновый градиент для изображения -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 rounded-2xl"></div>

          <!-- Изображение -->
    <NuxtImg
      :src="image || ''"
      :alt="alt || ''"
            class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 will-change-transform"
            loading="eager"
          />
          
          <!-- Блеск на изображении -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"></div>
        </div>
        
        <!-- Декоративный элемент в углу -->
        <div class="absolute -top-6 -right-6 p-3.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-slate-100 dark:border-slate-700 z-20">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Icon name="heroicons:document-text" class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-800 to-slate-700 dark:from-white dark:via-blue-300 dark:to-slate-300;
  background-size: 300% auto;
  animation: textShine 8s ease-in-out infinite alternate;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
}

@keyframes textShine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}

/* Фоновая сетка для хедера */
.bg-grid-slate-100 {
  background-image: linear-gradient(to right, rgba(226, 232, 240, 0.1) 1px, transparent 1px), 
                    linear-gradient(to bottom, rgba(226, 232, 240, 0.1) 1px, transparent 1px);
}

.bg-grid-slate-700 {
  background-image: linear-gradient(to right, rgba(51, 65, 85, 0.2) 1px, transparent 1px), 
                    linear-gradient(to bottom, rgba(51, 65, 85, 0.2) 1px, transparent 1px);
}

/* 3D эффект для заголовка при наведении */
h1 {
  transition: transform 0.3s ease;
}

h1:hover {
  transform: perspective(500px) translateZ(20px);
}
</style>
