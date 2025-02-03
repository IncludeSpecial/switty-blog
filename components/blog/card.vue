<script lang="ts" setup>
interface Props {
  path: string
  title: string
  date: string
  description: string
  image: string
  alt: string
  ogImage: string
  tags: Array<string>
  published: boolean
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
  <article class="group border dark:border-neutral-800  m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700 dark:text-zinc-300  ">
    <NuxtLink :to="path">
      <NuxtImg
        class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500"
        width="300"
        :src="image"
        :alt="alt"
      />
      <div class="px-3 pb-4">
        <div class="text-black dark:text-zinc-300    pt-3 pb-2">
          <div class="flex items-center">
            <LogoDate />
            {{ formatDate(date) }}
          </div>
          <div class="flex items-center gap-1 flex-wrap">
            <LogoTag />
            <template v-for="tag in tags" :key="tag">
              <span>{{ tag }}</span>
            </template>
          </div>
        </div>
        <h2 class="text-xl font-semibold  text-black dark:text-zinc-300   pb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-400">
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2 text-base">
          {{ description }}
        </p>
        <div class="flex group-hover:underline text-neutral-700 dark:text-neutral-400 items-center py-2">
          <p>Читать далее</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
