import {navbarData, seoData} from './data'

import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(
  {
    app: {
      head: {
        charset: 'utf-16',
        viewport: 'width=device-width,initial-scale=1',
        title: navbarData.homeTitle,
        titleTemplate: `%s - ${navbarData.homeTitle}`,
      },
      pageTransition: {
        name: 'page',
        mode: 'out-in'
      },
      layoutTransition: {
        name: 'layout',
        mode: 'out-in'
      },
    },
    runtimeConfig: {
      redis: { // Default values
        host: '',
        port: 0,
        /* other redis connector options */
      }
    },
    experimental: {
      componentIslands: true
    },
    sitemap: {
      strictNuxtContentPaths: true,
    },

    site: {
      url: seoData.mySite,
      identity: {
        type: 'Person',
      },
      twitter: seoData.twitterHandle,
    },

    typescript: {
      strict: true,
    },
    robots: {
      mergeWithRobotsTxtPath: './robots.txt'
    },
    nitro: {
      // Production
      storage: {
        db: {
          driver: 'redis',
          /* redis connector options */
        }
      },
      // Development
      devStorage: {
        db: {
          driver: 'fs',
          base: './data/db'
        }
      }      ,
      prerender: {
        crawlLinks: true,
        routes: [
          '/',
          '/rss.xml',
        ],
      },
    },

    colorMode: {
      classSuffix: '',
      preference: 'dark',
      fallback: 'light',
    },

    modules: [
      'nuxt-icon',
      '@nuxt/image',
      '@vueuse/nuxt',
      'nuxt-og-image',
      '@nuxt/content',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      '@nuxtjs/fontaine',
      '@nuxtjs/color-mode',
      '@nuxtjs/tailwindcss',
      '@stefanobartoletti/nuxt-social-share',
      'nuxtjs-naive-ui'
    ],
    vite: {
      plugins: [
        AutoImport({
          imports: [
            {
              'naive-ui': [
                'useDialog',
                'useMessage',
                'useNotification',
                'useLoadingBar'
              ]
            }
          ]
        }),
        Components({
          resolvers: [NaiveUiResolver()]
        })
      ]
    },
    content: {
      highlight: {
        theme: 'dracula',
      },
    },

    compatibilityDate: '2024-09-30',
  })
