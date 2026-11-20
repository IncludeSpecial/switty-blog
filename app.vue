<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import manropeCyrillic from '@fontsource/manrope/files/manrope-cyrillic-400-normal.woff2?url'
import manropeLatin from '@fontsource/manrope/files/manrope-latin-400-normal.woff2?url'
import unboundedCyrillic from '@fontsource/unbounded/files/unbounded-cyrillic-600-normal.woff2?url'
import unboundedLatin from '@fontsource/unbounded/files/unbounded-latin-600-normal.woff2?url'

const fontPreload = [manropeCyrillic, manropeLatin, unboundedCyrillic, unboundedLatin]

useHead({
  link: fontPreload.map(href => ({
    rel: 'preload',
    href,
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous',
  })),
})
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
