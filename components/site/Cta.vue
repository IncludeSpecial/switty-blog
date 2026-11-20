<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section id="contacts" class="cta">
    <div class="wrap">
      <h2>Есть задача? Напишите в Telegram</h2>
      <p class="lead">Отвечу сам, без рассылок и форм на десять полей.</p>
      <a class="btn btn-accent" :href="site.telegram">Написать в Telegram</a>
      <div class="contact-row">
        <a :href="site.telegram"><span>Telegram</span> {{ site.telegramHandle }}</a>
        <a :href="`mailto:${site.email}`"><span>Почта</span> {{ site.email }}</a>
        <a :href="site.github"><span>GitHub</span> {{ site.githubHandle }}</a>
      </div>
      <p class="npd">Работаю как самозанятый (НПД).</p>
    </div>
  </section>
</template>
