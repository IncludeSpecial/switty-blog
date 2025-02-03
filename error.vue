// Исправленный `error.vue`
<script setup lang="ts">
useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена',
    },
    {
      property: 'og:image',
      content: '/default-og-image.png',
    },
  ],
})
</script>

<template>
  <div class="py-5">
    <div class="container max-w-xl mx-auto">
      <h1 class="text-2xl text-center">
        404 - Страница не найдена
      </h1>
    </div>
  </div>
</template>
