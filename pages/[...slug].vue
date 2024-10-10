<script setup lang="ts">
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
      <Logo404 />
    </div>
  </div>
</template>
