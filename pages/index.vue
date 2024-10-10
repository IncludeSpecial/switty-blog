<script lang="ts" setup>
import Glow from '~/components/logo/glow.vue';
import { navbarData } from '~/data'

useHead({
  title: 'Главная',
  meta: [
    {
      name: 'description',
      content:
        'Добро пожаловать в мой блог. Получайте советы по веб-разработке, Javascript, Typescript, NodeJs, Vue и Nuxt, связанные статьи, советы, обучающие ресурсы и многое другое.',
    },
  ],
})

// Generate OG Image
defineOgImageComponent('О сайте', {
  headline: 'Приветствую 👋',
  title: navbarData.homeTitle,
  description: 'Погрузитесь в веб-разработку вместе со мной и изучите Js, Ts, Vue, Nuxt.',
  link: '/switty.jpg',
})
</script>

<template>
  <Glow/>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </main>
</template>
