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

withDefaults(defineProps<Props>(), {
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

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  return new Date(date).toLocaleDateString('ru-RU', options)
}
</script>

<template>
  <article class="group border dark:border-neutral-800  m-2 rounded-2xl overflow-hidden shadow-sm text-zinc-700 dark:text-zinc-300  ">
    <NuxtLink :to="path" class="grid grid-cols-1 sm:grid-cols-10 gap-1">
      <div class="sm:col-span-3">
        <NuxtImg
          class="h-full w-full object-cover object-center rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none shadow-lg group-hover:scale-[1.02] transition-all duration-500"
          width="300"
          :src="image"
          :alt="alt"
        />
      </div>
      <div class="sm:col-span-7 p-5">
        <h2 class="text-xl font-semibold text-black dark:text-zinc-300   pb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-400">
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2">
          {{ description }}
        </p>
        <div class="text-black dark:text-zinc-300   text-sm mt-2 mb-1 md:flex md:space-x-6">
          <div class="flex items-center">
            <LogoDate />
            <p> {{ formatDate(date) }}</p>
          </div>
          <div class="flex items-center gap-1 flex-wrap">
            <LogoTag />
            <p v-for="tag in tags" :key="tag">
              {{ tag }}
            </p>
          </div>
        </div>
        <div class="flex group-hover:underline text-neutral-700 dark:text-neutral-400 items-center pt-2">
          <p>Читать подробнее</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
