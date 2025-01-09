<template>
  <div class="gd-container font-spacegrotesk">
    <header class="fixed w-full bg-white dark:bg-neutral-950 z-10">
      <MainHeader />
    </header>
    <main>
      <div class="p-9" />
      <SpeedInsights/>
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
