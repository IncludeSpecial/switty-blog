<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="#top">Switty<span>.</span></a>
      <nav class="site-nav" aria-label="Разделы страницы">
        <a href="#works">Работы</a>
        <a href="#services">Услуги</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <a class="btn btn-accent" :href="site.telegram">Написать в Telegram</a>
    </div>
  </header>
</template>
