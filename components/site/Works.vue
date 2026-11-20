<script setup lang="ts">
import { projects } from '~/data/site'
</script>

<template>
  <section id="works" class="section light">
    <div class="wrap">
      <div class="section-head">
        <p class="kicker">Портфолио</p>
        <h2>Работы</h2>
      </div>
      <div class="works">
        <article
          v-for="project in projects"
          :key="project.title"
          class="card"
          :class="{ featured: project.featured }"
        >
          <div class="frame">
            <SiteBrowserFrame
              :url="project.chrome"
              :src="project.image"
              :alt="project.imageAlt"
              :width="project.width"
              :height="project.height"
              :light="project.light"
              :sizes="project.featured ? '(max-width: 680px) 92vw, 1124px' : '(max-width: 680px) 92vw, 540px'"
            />
          </div>
          <div class="card-body">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="meta">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              <div class="links">
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  :aria-label="`${link.label}: ${project.title}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ link.label }}</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
