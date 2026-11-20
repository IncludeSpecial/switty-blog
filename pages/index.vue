<script setup lang="ts">
import { site } from '~/data/site'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Рустам — сайты, боты и серверы',
      url: `${site.url}/`,
      inLanguage: 'ru',
      description: site.description,
    },
    {
      '@type': 'Person',
      name: site.author,
      url: `${site.url}/`,
      email: site.email,
      sameAs: [site.telegram, site.github],
    },
  ],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    },
  ],
})
</script>

<template>
  <main>
    <SiteHero />
    <SiteWorks />
    <SiteServices />
    <SiteProcess />
    <SiteCta />
  </main>
</template>
