<!--pages/blogs/[blog]-->
<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import { computed, ref, onMounted } from "vue";
import { useRoute, useAsyncData, navigateTo } from '#imports'
import CommentSection from "~/components/blog/CommentSection.vue";
import BlogHeader from "~/components/blog/Header.vue";
import BlogToc from "~/components/blog/Toc.vue";
import { navbarData, seoData } from '~/data'

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent(path).findOne())
if (error.value) navigateTo('/404')

const data = computed<BlogPost>(() => {
  return articles.value ? {
    title: articles.value.title,
    postId: articles.value.postId,
    description: articles.value.description,
    image: articles.value.image,
    alt: articles.value.alt,
    ogImage: articles.value.ogImage,
    date: articles.value.date,
    tags: articles.value.tags,
    published: articles.value.published,
  } : { /* ...значения по умолчанию... */ }
})

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
    { hid: 'og:type', property: 'og:type', content: 'website' },
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
    { name: 'twitter:site', content: '@qdnvubp' },
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
  "postId": data.value.postId || ''

})

const adminId = 'admin-123'
const currentUserId = ref<string>('guest')
const isAdmin = computed(() => currentUserId.value === adminId)

function loadUserStatus() {
  const storedUserId = localStorage.getItem('userId')
  currentUserId.value = storedUserId || 'guest'
}

onMounted(loadUserStatus)
</script>

<template>
  <div class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12 ">
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="data.date"
        :description="data.description"
        :tags="data.tags"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg
        prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>Контент не найден.</p>
          </template>
        </ContentRenderer>

<!--        <CommentSection :postId="data.postId" :isAdmin="isAdmin" :userId="currentUserId" />-->

      </div>
    </div>
    <BlogToc />

    <div class="flex flex-row text-sky-50  flex-wrap md:flex-nowrap mt-10 gap-2">
      <SocialShare
        v-for="network in ['twitter', 'telegram', 'whatsapp', 'email']"
        :key="network"
        :network="network"
        :styled="true"
        :label="true"
        class="p-1"
        aria-label="Поделиться в {{network}}"
      />
    </div>
  </div>
</template>
