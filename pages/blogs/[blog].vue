<!-- pages/blogs/[blog] -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { BlogPost } from '@/types/blog'
import { navigateTo, useAsyncData, useRoute } from '#imports'

import BlogHeader from '~/components/blog/Header.vue'
import BlogToc from '~/components/blog/Toc.vue'
import BlogRelatedPosts from '~/components/blog/RelatedPosts.vue'
import { navbarData, seoData } from '~/data'

const { path } = useRoute()
const _route = useRoute()

// Для функции копирования ссылки
const urlInput = ref<HTMLInputElement | null>(null)
const copied = ref(false)
const currentUrl = computed(() => {
  const baseUrl = seoData.mySite || 'https://switty.ru'
  return `${baseUrl}${path}`
})

function copyToClipboard() {
  if (urlInput.value) {
    try {
      navigator.clipboard.writeText(currentUrl.value)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
    catch (err) {
      // Если API Clipboard недоступен, используем старый метод
      urlInput.value.select()
      document.execCommand('copy')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }
}

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent(path).findOne())
if (error.value)
  navigateTo('/404')

const data = computed<BlogPost>(() => {
  return {
    postId: articles.value?._path || '',
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: articles.value?.image || '/not-found.jpg',
    alt: articles.value?.alt || 'no alter data available',
    ogImage: articles.value?.ogImage || '/not-found.jpg',
    date: articles.value?.date || 'not-date-available',
    tags: articles.value?.tags || [],
    published: articles.value?.published || false,
  }
})

type SocialNetwork = 'twitter' | 'facebook' | 'telegram' | 'whatsapp' | 'email'

function getSocialUrl(network: SocialNetwork): string {
  const url = encodeURIComponent(currentUrl.value)
  const titleEncoded = encodeURIComponent(data.value.title)
  const description = encodeURIComponent(data.value.description)

  switch (network) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${url}&text=${titleEncoded}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    case 'telegram':
      return `https://t.me/share/url?url=${url}&text=${titleEncoded}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${data.value.title} ${currentUrl.value}`)}`
    case 'email':
      return `mailto:?subject=${titleEncoded}&body=${description}%0A%0A${url}`
    default:
      return '#'
  }
}

// Получаем рекомендованные статьи (статьи с теми же тегами)
const { data: relatedPosts } = await useAsyncData(`related-posts-${path}`, async () => {
  if (!data.value.tags.length)
    return []

  const posts = await queryContent('/blogs')
    .where({
      _path: { $ne: path },
      tags: { $contains: data.value.tags[0] },
    })
    .limit(3)
    .find()

  return posts
})

// Функция форматирования даты
function formatDate(date: string): string {
  if (!date || date === 'no-date')
    return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  }

  try {
    return new Date(date).toLocaleDateString('ru-RU', options)
  }
  catch (e) {
    return date
  }
}

// Функции для работы с социальными сетями
function getNetworkIcon(network: SocialNetwork): string {
  const icons: Record<SocialNetwork, string> = {
    twitter: 'ri:twitter-x-fill',
    facebook: 'ri:facebook-fill',
    telegram: 'ri:telegram-fill',
    whatsapp: 'ri:whatsapp-fill',
    email: 'heroicons:envelope',
  }
  return icons[network]
}

function getNetworkName(network: SocialNetwork): string {
  const names: Record<SocialNetwork, string> = {
    twitter: 'Twitter',
    facebook: 'Facebook',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    email: 'Email',
  }
  return names[network]
}

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    {
      name: 'description',
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: navbarData.homeTitle },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      property: 'og:title',
      content: data.value.title,
    },
    {
      property: 'og:description',
      content: data.value.description,
    },
    {
      property: 'og:image',
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@SwittyIDS' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      name: 'twitter:title',
      content: data.value.title,
    },
    {
      name: 'twitter:description',
      content: data.value.description,
    },
    {
      name: 'twitter:image',
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${seoData.mySite}/${path}`,
    },
  ],
})

// Generate OG Image
defineOgImageComponent('Test', {
  headline: 'Приветствую 👋',
  title: data.value.title || '',
  description: data.value.description || '',
  link: data.value.ogImage,
  postId: data.value.postId || '',
})

const currentUserId = ref<string>('guest')

function loadUserStatus() {
  const storedUserId = localStorage.getItem('userId')
  currentUserId.value = storedUserId || 'guest'
}

onMounted(loadUserStatus)
</script>

<template>
  <main class="pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-500">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="data.date"
        :description="data.description"
        :tags="data.tags"
      />

    <!-- Навигационная цепочка и кнопка "Назад" -->
    <div class="container max-w-5xl mx-auto mb-8 px-6">
      <div class="flex items-center justify-between py-3.5 px-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-xl border border-slate-100 dark:border-gray-700 transition-all duration-300">
        <div class="text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1">
          <NuxtLink to="/" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium">
            Главная
          </NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
          <NuxtLink to="/blogs" class="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium">
            Блог
          </NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
          <span class="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[180px] sm:max-w-xs">{{ data.title }}</span>
        </div>

        <button
          class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 group"
          @click="() => navigateTo('/blogs')"
        >
          <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-1.5 mr-2 group-hover:-translate-x-1 transition-transform duration-300">
            <Icon name="heroicons:arrow-left" class="w-3.5 h-3.5" />
          </div>
          Назад
        </button>
      </div>
    </div>

    <div class="container max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-6 lg:gap-8">
      <!-- Контент и боковая панель -->
      <div class="lg:col-span-9 col-span-12 grid grid-cols-1 gap-6">
        <!-- Основной контент -->
        <article class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-gray-700/80 overflow-hidden transform transition-all duration-500 hover:shadow-lg">
          <!-- Содержимое статьи -->
          <div class="p-5 md:p-8">
            <div class="prose prose-lg max-w-none mx-auto dark:prose-invert 
                       prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white 
                       prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200/70 dark:prose-h2:border-gray-700/70 prose-h2:pb-2
                       prose-h3:text-xl
                       prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline 
                       prose-img:rounded-xl prose-img:shadow-md hover:prose-img:shadow-lg prose-img:transition-all prose-img:duration-500
                       prose-pre:bg-slate-100 dark:prose-pre:bg-gray-800/80 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-gray-700
                       prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:font-medium
                       prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
              
              <!-- Уведомление о недоступности контента для неопубликованных статей -->
              <div v-if="!data.published" class="unavailable-content">
                <div class="unavailable-icon">
                  <Icon name="heroicons:lock-closed" class="icon-lock" />
                </div>
                <h2 class="unavailable-title">
                  Контент недоступен
                </h2>
                <div class="unavailable-message">
                  <p>Уважаемые пользователи,</p>
                  <p>Данный материал временно недоступен или был удален администрацией.</p>
                  <p>Приносим извинения за возможные неудобства.</p>
                </div>
                <div class="unavailable-footer">
                  <NuxtLink to="/blogs" class="back-to-blogs">
                    <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1" />
                    Вернуться к статьям
                  </NuxtLink>
                </div>
              </div>
              
              <!-- Обычный контент для опубликованных статей -->
              <ContentRenderer v-else-if="articles" :value="articles">
          <template #empty>
                  <div class="py-16 text-center">
                    <div class="relative mx-auto mb-6">
                      <div class="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-lg opacity-70"></div>
                      <div class="relative bg-slate-100 dark:bg-gray-700 p-5 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                        <Icon name="heroicons:document-text" class="w-12 h-12 text-slate-400 dark:text-gray-400" />
                      </div>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-700 dark:text-gray-300 mb-3">
                      Контент не найден
                    </h3>
                    <p class="text-slate-500 dark:text-gray-400 max-w-md mx-auto">
                      К сожалению, содержимое статьи отсутствует или было удалено.
                    </p>
                  </div>
          </template>
        </ContentRenderer>
      </div>
    </div>

          <!-- Разделитель -->
          <div class="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />

          <!-- Автор и метаданные -->
          <div class="p-5 md:p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 bg-slate-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-full blur-sm opacity-40"></div>
                <div class="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-md">
                  <Icon name="heroicons:user" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <div class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                  Администратор
                  <span class="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <Icon name="heroicons:calendar" class="w-3.5 h-3.5" />
                  <span>{{ formatDate(data.date) }}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <div
                v-for="tag in data.tags"
                :key="tag"
                class="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-sm"
              >
                #{{ tag }}
              </div>
            </div>
          </div>
        </article>

        <!-- Кнопки шеринга -->
        <div v-if="data.published" class="overflow-hidden relative group rounded-2xl transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200/80 dark:border-gray-700/80 p-7">
            <h3 class="text-lg font-bold mb-5 flex items-center">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-lg mr-3.5 text-white shadow-sm">
                <Icon name="heroicons:share" class="w-5 h-5" />
              </div>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Поделиться статьёй
              </span>
            </h3>

            <!-- Кнопка копирования ссылки -->
            <div class="mb-5 flex items-center gap-2 bg-slate-50 dark:bg-gray-700/50 rounded-lg p-2.5 pr-1.5 border border-slate-100 dark:border-gray-700">
              <input
                ref="urlInput"
                type="text"
                :value="currentUrl"
                readonly
                class="flex-1 bg-transparent border-none text-sm text-slate-600 dark:text-slate-300 focus:outline-none px-2"
              >
              <button
                class="bg-blue-100 hover:bg-blue-200 dark:bg-blue-700/30 dark:hover:bg-blue-700/50 text-blue-600 dark:text-blue-400 p-2 rounded-md transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                @click="copyToClipboard"
              >
                <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'" class="w-4 h-4" />
                {{ copied ? 'Скопировано' : 'Копировать' }}
              </button>
            </div>

            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
              Поделиться через:
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 share-buttons">
              <a
                v-for="network in ['twitter', 'telegram', 'whatsapp', 'email'] as SocialNetwork[]"
        :key="network"
                :href="getSocialUrl(network)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-sm transition-all duration-300 shadow-sm hover:scale-105 hover:-translate-y-1 hover:shadow-md border border-transparent"
                :class="{
                  'bg-zinc-800 text-white hover:bg-zinc-900': network === 'twitter',
                  'bg-sky-500 text-white hover:bg-sky-600': network === 'telegram',
                  'bg-green-500 text-white hover:bg-green-600': network === 'whatsapp',
                  'bg-purple-600 text-white hover:bg-purple-700': network === 'email',
                }"
              >
                <Icon
                  :name="getNetworkIcon(network)"
                  class="h-5 w-5"
                />
                <span class="whitespace-nowrap">
                  {{ getNetworkName(network) }}
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- Рекомендованные статьи -->
        <div v-if="relatedPosts && relatedPosts.length && data.published" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-slate-200/80 dark:border-gray-700/80 overflow-hidden transition-all duration-500 hover:shadow-lg">
          <div class="p-5 border-b border-slate-200 dark:border-gray-700 bg-gradient-to-r from-slate-50 to-white dark:from-gray-800 dark:to-gray-800/80">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg mr-2.5 text-blue-600 dark:text-blue-400">
                <Icon name="heroicons:bookmark" class="w-5 h-5" />
              </div>
              Рекомендуем прочитать
            </h3>
          </div>
          <div class="p-5">
            <BlogRelatedPosts :posts="relatedPosts" />
          </div>
        </div>
      </div>

      <!-- Боковая панель -->
      <div class="lg:block lg:col-span-3 col-span-12 hidden">
        <!-- Оглавление - фиксированное при прокрутке -->
        <div class="sticky top-6">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-gray-700/80 overflow-hidden transform transition-all duration-500 hover:shadow-lg">
            <div class="p-4 border-b border-slate-200 dark:border-gray-700 bg-gradient-to-r from-slate-50 to-white dark:from-gray-800 dark:to-gray-800/80">
              <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg mr-2.5 text-blue-600 dark:text-blue-400">
                  <Icon name="heroicons:list-bullet" class="w-4 h-4" />
                </div>
                Содержание
              </h3>
            </div>
            <div class="p-4">
              <BlogToc v-if="data.published" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* Стили для уведомления о недоступности контента */
.unavailable-content {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  margin: 2rem auto;
  max-width: 650px;
  position: relative;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
}

.dark .unavailable-content {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.7) 100%);
  border-color: #334155;
}

.unavailable-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef);
}

.unavailable-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  position: relative;
  border: 6px solid rgba(254, 242, 242, 0.5);
  box-shadow: 0 0 0 10px rgba(239, 68, 68, 0.05);
}

.dark .unavailable-icon {
  background-color: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border-color: rgba(254, 242, 242, 0.1);
  box-shadow: 0 0 0 10px rgba(239, 68, 68, 0.1);
}

.icon-lock {
  width: 40px;
  height: 40px;
}

.unavailable-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #1e293b, #334155);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.dark .unavailable-title {
  background: linear-gradient(90deg, #f8fafc, #f1f5f9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.unavailable-message {
  margin-bottom: 2rem;
  color: #475569;
  font-size: 1.125rem;
  max-width: 500px;
}

.dark .unavailable-message {
  color: #cbd5e1;
}

.unavailable-message p {
  margin-bottom: 0.875rem;
}

.unavailable-footer {
  margin-top: 1.5rem;
}

.back-to-blogs {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  box-shadow: 0 4px 15px -1px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.back-to-blogs:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -2px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.dark .back-to-blogs {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  box-shadow: 0 4px 15px -1px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.dark .back-to-blogs:hover {
  box-shadow: 0 8px 20px -2px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

@media (max-width: 640px) {
  .unavailable-content {
    padding: 2rem 1rem;
  }
  .unavailable-icon {
    width: 70px;
    height: 70px;
  }
  .icon-lock {
    width: 32px;
    height: 32px;
  }
  .unavailable-title {
    font-size: 1.5rem;
  }
  .unavailable-message {
    font-size: 1rem;
  }
  .back-to-blogs {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>
