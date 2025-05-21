<script lang="ts" setup>
import { navbarData } from '~/data'

useHead({
  title: 'Главные | Home',
  meta: [
    {
      name: 'description',
      content:
        'Добро пожаловать в мой блог. Получайте советы по веб-разработке, связанные статьи, советы, обучающие ресурсы и многое другое.',
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Приветствую 👋',
  title: navbarData.homeTitle,
  description: 'Погрузитесь в веб-разработку вместе со мной и изучите Js, Ts, Vue, Nuxt.',
  link: '/switty.jpg',
})

// Данные для статистики
const stats = [
  { number: '100+', label: 'Статей' },
  { number: '20+', label: 'Тем' },
  { number: '5k+', label: 'Читателей' },
  { number: '3+', label: 'Года опыта' },
]

// Данные о преимуществах
const features = [
  {
    icon: 'mdi:lightbulb-on-outline',
    title: 'Актуальные знания',
    description: 'Статьи всегда отражают последние тенденции и технологии в веб-разработке',
  },
  {
    icon: 'mdi:book-open-page-variant-outline',
    title: 'Понятное объяснение',
    description: 'Сложные концепции объясняются простым и доступным языком',
  },
  {
    icon: 'mdi:code-tags',
    title: 'Практические примеры',
    description: 'Каждая статья содержит практические примеры кода и рабочие решения',
  },
]
</script>

<template>
  <main class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5" />
      <div class="container max-w-5xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <h1 class="text-5xl font-bold text-slate-800 dark:text-white leading-tight">
              Добро пожаловать в мир веб-разработки
            </h1>
            <p class="text-xl text-slate-700 dark:text-gray-300">
              Изучайте современные технологии, делитесь опытом и развивайтесь вместе с нами
            </p>
            <div class="flex gap-4">
              <NuxtLink
                to="/blogs"
                class="px-6 z-20 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/50"
              >
                Начать чтение
              </NuxtLink>
              <NuxtLink
                to="/categories"
                class="px-6 z-20 py-3 border border-slate-300 bg-white text-slate-800 dark:border-gray-600 dark:bg-transparent dark:text-white rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow hover:shadow-md"
              >
                Категории
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl blur-3xl" />
            <div class="relative bg-white/90 backdrop-blur-sm dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-slate-100 dark:border-gray-600 shadow-sm">
                  <Icon name="logos:vue" class="w-12 h-12" />
                  <h3 class="mt-2 font-semibold text-slate-800 dark:text-white">
                    Vue.js
                  </h3>
                </div>
                <div class="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-slate-100 dark:border-gray-600 shadow-sm">
                  <Icon name="logos:nuxt-icon" class="w-12 h-12" />
                  <h3 class="mt-2 font-semibold text-slate-800 dark:text-white">
                    Nuxt.js
                  </h3>
                </div>
                <div class="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-slate-100 dark:border-gray-600 shadow-sm">
                  <Icon name="logos:typescript-icon" class="w-12 h-12" />
                  <h3 class="mt-2 font-semibold text-slate-800 dark:text-white">
                    TypeScript
                  </h3>
                </div>
                <div class="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-slate-100 dark:border-gray-600 shadow-sm">
                  <Icon name="logos:tailwindcss-icon" class="w-12 h-12" />
                  <h3 class="mt-2 font-semibold text-slate-800 dark:text-white">
                    Tailwind CSS
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Статистика -->
    <section class="py-16 bg-white dark:bg-gray-900 shadow-sm border-y border-slate-100 dark:border-gray-800">
      <div class="container max-w-5xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center transform hover:scale-105 transition-all duration-300"
          >
            <div class="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {{ stat.number }}
            </div>
            <div class="text-slate-700 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts Section -->
    <section class="py-16 bg-slate-50 dark:bg-gray-800">
      <div class="container max-w-5xl mx-auto px-4">
        <div class="flex items-center gap-3 mb-12">
          <div class="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow">
            <Icon name="mdi:star-three-points-outline" size="2em" class="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
            Популярные посты
          </h2>
        </div>
        <MainTrending />
      </div>
    </section>

    <!-- Recent Posts Section -->
    <section class="py-16 bg-white dark:bg-gray-900 shadow-sm border-y border-slate-100 dark:border-gray-800">
      <div class="container max-w-5xl mx-auto px-4">
        <div class="flex items-center gap-3 mb-12">
          <div class="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow">
            <Icon name="mdi:clock-outline" size="2em" class="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
            Недавние публикации
          </h2>
        </div>
        <MainRecent />
      </div>
    </section>

    <!-- Преимущества -->
    <section class="py-16 bg-slate-50 dark:bg-gray-800">
      <div class="container max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">
          Почему стоит читать этот блог
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-gray-700"
          >
            <div class="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-indigo-900 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
              <Icon :name="feature.icon" size="1.5em" class="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-slate-700 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
    linear-gradient(to bottom, #6366f1 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
