<!-- pages/blogs/[blog].vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPost } from '@/types/blog'
import { navigateTo, useAsyncData, useRoute } from '#imports'
import { navbarData, seoData } from '~/data'

const route = useRoute()
const { path } = route

// Загрузка данных статьи с обработкой ошибок и кэшированием
const { data: articles, error } = await useAsyncData(`blog-post-${path}`,
  () => queryContent(path).findOne(),
  {
    transform: (data) => {
      if (!data || !data.published)
        throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })

      return data
    },
  },
)

if (error.value)
  navigateTo('/404')

// Вычисляемые данные с защитой от null
const data = computed<BlogPost>(() => {
  return {
    title: articles.value?.title || 'Без названия',
    description: articles.value?.description || 'Описание отсутствует',
    image: articles.value?.image || '/placeholder.jpg',
    alt: articles.value?.alt || 'Изображение статьи',
    ogImage: articles.value?.ogImage || articles.value?.image || '/placeholder.jpg',
    date: articles.value?.date ? useDateFormat(articles.value.date, 'DD MMM YYYY').value : 'Дата не указана',
    tags: articles.value?.tags || [],
    postId: articles.value?._id || '',
  }
})

// SEO-оптимизация
const fullUrl = computed(() => {
  const baseUrl = !seoData.mySite.endsWith('/') ? seoData.mySite : seoData.mySite.slice(0, -1)
  const pathClean = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${pathClean}`
})

const socialImage = computed(() => data.value.ogImage.startsWith('http')
  ? data.value.ogImage
  : `${seoData.mySite}${data.value.ogImage}`,
)

useHead({
  title: data.value.title,
  meta: [
    { name: 'description', content: data.value.description },
    { property: 'og:site_name', content: navbarData.homeTitle },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:title', content: data.value.title },
    { property: 'og:description', content: data.value.description },
    { property: 'og:image', content: socialImage.value },
    { property: 'og:image:alt', content: data.value.alt },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@SwittyIDS' },
    { name: 'twitter:creator', content: '@SwittyIDS' },
    { name: 'twitter:title', content: data.value.title },
    { name: 'twitter:description', content: data.value.description },
    { name: 'twitter:image', content: socialImage.value },
  ],
  link: [{ rel: 'canonical', href: fullUrl.value }],
})

// Оптимизированная генерация OG-изображения
defineOgImage({
  component: 'BlogPost',
  props: {
    title: data.value.title,
    description: data.value.description,
    image: socialImage.value,
    date: data.value.date,
    readingTime: articles.value?.readingTime?.minutes || 0,
  },
})
</script>

<template>
  <div class="container max-w-5xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-12 gap-8">
      <!-- Основной контент -->
      <main class="col-span-12 lg:col-span-8 xl:col-span-9">
        <BlogHeader
          :title="data.title"
          :image="data.image"
          :alt="data.alt"
          :date="data.date"
          :description="data.description"
          :tags="data.tags"
        />

        <article
          class="prose prose-zinc max-w-none dark:prose-invert
          prose-headings:font-semibold prose-img:rounded-xl prose-img:shadow-lg
          prose-pre:bg-zinc-800 prose-pre:rounded-xl"
        >
          <ContentRenderer v-if="articles" :value="articles">
            <template #empty>
              <p class="text-red-500">
                Контент не найден
              </p>
            </template>
          </ContentRenderer>
        </article>

        <!-- Социальные кнопки с оптимизацией -->
        <div class="mt-12 flex flex-wrap gap-3">
          <SocialShare
            v-for="network in ['twitter', 'telegram', 'whatsapp', 'email']"
            :key="network"
            :network="network"
            :styled="true"
            :label="true"
            class="p-2 transition-transform hover:scale-105"
            :aria-label="`Поделиться в ${network}`"
          />
        </div>
      </main>

      <!-- Боковая панель -->
      <aside class="hidden lg:block col-span-4 xl:col-span-3">
        <div class="sticky top-24">
          <BlogToc :toc="articles?.toc" />
        </div>
      </aside>
    </div>
  </div>
</template>
