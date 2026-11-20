<script setup lang="ts">
import { included, serverServices, siteServices } from '~/data/site'
</script>

<template>
  <section id="services" class="section dark">
    <div class="wrap">
      <div class="section-head">
        <p class="kicker">Что делаю</p>
        <h2>Услуги</h2>
      </div>
      <div class="services-layout">
        <div class="service-groups">
          <div>
            <p class="group-title">Сайты</p>
            <article v-for="item in siteServices" :key="item.title" class="service">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
          <div>
            <p class="group-title">Боты и серверы</p>
            <article v-for="item in serverServices" :key="item.title" class="service">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
        <aside class="aside">
          <h3>Что входит</h3>
          <ul>
            <li v-for="item in included" :key="item">{{ item }}</li>
          </ul>
          <p class="price-note">Стоимость — по запросу, после короткого разговора о задаче.</p>
        </aside>
      </div>
    </div>
  </section>
</template>
