<script setup lang="ts">
import { aboutPage, footerData, navbarData } from '~/data'

useHead({
  title: 'О мне',
  meta: [
    {
      name: 'description',
      content: footerData.aboutAuthor,
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Приветствую 👋',
  title: navbarData.homeTitle,
  description: 'Погрузитесь в веб-разработку вместе со мной и изучите Js, Ts, Vue, Nuxt.',
  link: '/switty.jpg',
})
</script>

<template>
  <div class="py-5">
    <div class="sm:grid grid-cols-8 px-6 py-5 sm:py-9 gap-5 container max-w-5xl  mx-auto">
      <div class="col-span-5  max-w-md">
        <div class="flex justify-between">
          <div>
            <h1 class="text-xl sm:text-4xl  pb-2 font-bold ">
              {{ aboutPage.title }}
            </h1>

            <div class="my-3 space-x-2 md:space-x-3 pb-10">
              <NuxtLink
                to="https://github.com/IncludeSpecial"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="Github"
              >
                <Icon name="fa:github" size="1em" />
              </NuxtLink>
              <NuxtLink
                to="https://www.youtube.com/@IDS_Switty"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="YouTube"
              >
                <Icon name="fa:youtube-play" size="1em" />
              </NuxtLink>
              <NuxtLink
                to="https://vk.com/k8rnash"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="VK"
              >
                <Icon name="fa:vk" size="1em" />
              </NuxtLink>

            </div>
          </div>
          <div class="sm:hidden block col-span-3 pb-5 dark:text-[#F1F2F4]">
            <NuxtImg
              src="/switty.jpg"
              width="125"
              height="115"
              quality="50"
              class="rounded-md"
            />
          </div>
        </div>
        <h3 class="text-base sm:text-3xl font-semibold pb-7 sm:pb-12">
          {{ aboutPage.description }}
        </h3>

        <p>{{ aboutPage.aboutMe }}</p>
      </div>
      <div class="hidden  sm:block col-span-3">
        <NuxtImg
          src="/switty.jpg"
          width="500"
          height="500"
          quality="50"
          class="rounded-full border-2 border-white"
        />
      </div>
    </div>
  </div>
</template>
