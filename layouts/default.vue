<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div class="min-h-screen font-spacegrotesk flex flex-col">
      <MainHeader />
    <main class="flex-grow pt-0">
      <SpeedInsights />
      <slot />
    </main>
      <MainFooter />
  </div>
</template>

<style scoped>
/* Удалены неиспользуемые стили */
</style>
