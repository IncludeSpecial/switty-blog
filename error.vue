


<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена',
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Не правильный путь',
  title: '404',
  description: 'Страница не найдена',
})
</script>

<template>
  <div class="py-5">
    <div class="container max-w-xl   mx-auto">
      <h1 class="text-2xl text-red-400 font-bold">Произошла ошибка... {{ error.statusCode }}</h1>
      <NuxtLink to="/"><Logo404 />Go back home

      </NuxtLink>
    </div>
  </div>
</template>
