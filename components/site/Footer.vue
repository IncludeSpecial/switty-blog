<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <a class="logo" href="#top">Switty<span>.</span></a>
      <p>© {{ site.year }} {{ site.author }} · ne-nas.ru</p>
    </div>
  </footer>
</template>
