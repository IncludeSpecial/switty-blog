<script setup lang="ts">
import {navbarData} from '@/data'

const colorMode = useColorMode()

function onClick(val: string) {
  colorMode.preference = val
}
</script>

<template>
  <div class="py-5 border-b dark:border-gray-800  font-semibold">
    <div class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline ">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base sm:text-2xl font-bold">
          <NuxtLink to="/">
            {{ navbarData.homeTitle }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <li title="Home">
          <NuxtLink to="/" aria-label="Home">
            Главная
          </NuxtLink>
        </li>
        <li title="Blogs">
          <NuxtLink to="/blogs" aria-label="Blogs">
            Посты
          </NuxtLink>
        </li>
        <li title="Categories">
          <NuxtLink to="/categories" aria-label="Categories">
            Категории
          </NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink to="/about" aria-label="About me">
            Обо мне
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'"
              name="light-mode"
              title="Light"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="onClick('dark')"
            >
              <Icon name="fa:moon-o" size="20"/>
            </button>
            <button
              v-if="colorMode.value === 'dark'"
              name="dark-mode"
              title="Dark"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="onClick('light')"
            >
              <Icon name="fa:sun-o" size="20"/>
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20"/>
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.router-link-active .router-link-exact-active {
  @apply underline
}
</style>
