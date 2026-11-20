<script setup lang="ts">
withDefaults(defineProps<{
  url: string
  src: string
  width: number
  height: number
  alt?: string
  light?: boolean
  sizes?: string
  eager?: boolean
}>(), {
  alt: '',
  light: false,
  sizes: '100vw',
  eager: false,
})
</script>

<template>
  <div class="chrome" :class="{ light }">
    <span class="dots" aria-hidden="true"><i /><i /><i /></span>
    <div class="url">{{ url }}</div>
  </div>
  <NuxtPicture
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    format="avif,webp"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />
</template>
