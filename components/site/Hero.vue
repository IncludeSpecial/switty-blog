<script setup lang="ts">
import { site, techStack } from '~/data/site'

const shots = [
  {
    className: 'device-a',
    url: 'getbox.ne-nas.ru',
    src: '/works/getbox.jpg',
    width: 1440,
    height: 900,
    sizes: '(max-width: 680px) 88vw, 700px',
    eager: true,
  },
  {
    className: 'device-b',
    url: 'Салон «Елена», Свободный',
    src: '/works/elena.jpg',
    width: 1440,
    height: 900,
    light: true,
    sizes: '520px',
    eager: true,
  },
  {
    className: 'device-c',
    url: 'adblock.ne-nas.ru',
    src: '/works/adblock.jpg',
    width: 1440,
    height: 820,
    sizes: '460px',
    eager: true,
  },
]
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">Рустам · Благовещенск и Свободный</p>
      <h1>Делаю сайты для бизнеса в Амурской области</h1>
      <p class="lead">На Тильде или на коде — как удобнее потом вести сайт.</p>
      <div class="hero-actions">
        <a class="btn btn-accent" :href="site.telegram">Написать в Telegram</a>
        <a class="btn btn-ghost" href="#works">Смотреть работы</a>
      </div>
    </div>

    <div class="hero-stage" aria-hidden="true">
      <div class="glow" />
      <div
        v-for="shot in shots"
        :key="shot.src"
        class="device"
        :class="shot.className"
      >
        <SiteBrowserFrame
          :url="shot.url"
          :src="shot.src"
          :width="shot.width"
          :height="shot.height"
          :light="shot.light"
          :sizes="shot.sizes"
          :eager="shot.eager"
          alt=""
        />
      </div>
    </div>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="(item, index) in [...techStack, ...techStack]" :key="`${item}-${index}`">{{ item }}</span>
      </div>
    </div>
  </section>
</template>
