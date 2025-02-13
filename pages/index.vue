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
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </main>
</template>
