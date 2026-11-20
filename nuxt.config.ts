import { site } from './data/site'

const redirect = { redirect: { to: '/', statusCode: 301 as const }, prerender: false }

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: site.title,
      meta: [
        { name: 'description', content: site.description },
        { name: 'theme-color', content: '#0b0b0d' },
        { property: 'og:site_name', content: 'ne-nas.ru' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${site.url}/` },
        { property: 'og:title', content: site.title },
        { property: 'og:description', content: site.description },
        { property: 'og:image', content: `${site.url}/og.jpg` },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Делаю сайты для бизнеса в Амурской области' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: `${site.url}/` },
        { name: 'twitter:title', content: site.title },
        { name: 'twitter:description', content: site.description },
        { name: 'twitter:image', content: `${site.url}/og.jpg` },
        { name: 'twitter:image:alt', content: 'Делаю сайты для бизнеса в Амурской области' },
      ],
      link: [
        { rel: 'canonical', href: `${site.url}/` },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: false,
    layoutTransition: false,
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/site.css'],

  site: {
    url: site.url,
    name: 'Рустам — сайты, боты и серверы',
    description: site.description,
    defaultLocale: 'ru',
  },

  robots: {
    credits: false,
    header: false,
    robotsTxt: false,
  },

  sitemap: {
    discoverImages: false,
    urls: [
      {
        loc: '/',
        changefreq: 'monthly',
        priority: 1,
      },
    ],
  },

  image: {
    quality: 75,
    format: ['avif', 'webp'],
  },

  routeRules: {
    '/blogs': redirect,
    '/blogs/': redirect,
    '/blogs/**': redirect,
    '/categories': redirect,
    '/categories/': redirect,
    '/categories/**': redirect,
    '/about': redirect,
    '/about/': redirect,
    '/rss.xml': redirect,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  typescript: {
    strict: true,
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  compatibilityDate: '2024-09-30',
})
