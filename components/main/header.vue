<script setup lang="ts">
import { navbarData } from '@/data'

const colorMode = useColorMode()
const isMenuOpen = ref(false)

function onClick(val: string) {
  colorMode.preference = val
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="py-5 border-b dark:border-neutral-800 font-semibold">
    <div class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base sm:text-2xl font-bold">
          <NuxtLink to="/">
            {{ navbarData.homeTitle }}
          </NuxtLink>
        </li>
      </ul>
      <!-- Desktop Menu -->
      <ul class="hidden sm:flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
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
            <button v-if="colorMode.value === 'light'" class="hover:scale-110 transition-all ease-out" @click="onClick('dark')">
              <Icon name="solar:moon-bold-duotone" size="20" />
            </button>
            <button v-if="colorMode.value === 'dark'" class="hover:scale-110 transition-all ease-out" @click="onClick('light')">
              <Icon name="solar:sun-bold-duotone" size="20" />
            </button>
          </ClientOnly>
        </li>
      </ul>
      <!-- Burger Icon for Mobile -->
      <button class="sm:hidden" @click="toggleMenu">
        <Icon name="mdi:menu" size="2rem" />
      </button>
    </div>

    <!-- Overlay for Mobile Menu -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleMenu" />
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-right">
      <div
        v-if="isMenuOpen"
        class="fixed top-0 right-0 bg-white dark:bg-gray-900 z-50 p-6 w-2/3 h-full shadow-lg flex flex-col"
      >
        <button class="absolute top-5 left-5" @click="toggleMenu">
          <Icon name="mdi:close" size="2rem" />
        </button>
        <!-- Menu Header -->
        <div class="mt-10 mb-6">
          <p class="text-gray-500 dark:text-gray-400">
            Навигация по сайту
          </p>
        </div>
        <!-- Menu Links -->
        <ul class="space-y-5 text-lg">
          <li>
            <NuxtLink to="/" aria-label="Home" @click="toggleMenu">
              <Icon name="mdi:home" size="20" class="mr-3" /> Главная
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blogs" aria-label="Blogs" @click="toggleMenu">
              <Icon name="mdi:paper" size="20" class="mr-3" /> Посты
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/categories" aria-label="Categories" @click="toggleMenu">
              <Icon name="mdi:category" size="20" class="mr-3" /> Категории
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" aria-label="About me" @click="toggleMenu">
              <Icon name="mdi:user" size="20" class="mr-3" /> Обо мне
            </NuxtLink>
          </li>
        </ul>
        <!-- Theme Toggle in Mobile Menu -->
        <div class="mt-auto pt-10">
          <button v-if="colorMode.value === 'light'" class="flex items-center space-x-2 hover:scale-110 transition-all ease-out" @click="onClick('dark')">
            <Icon name="solar:moon-bold-duotone" size="20" /> <span>Темная тема</span>
          </button>
          <button v-if="colorMode.value === 'dark'" class="flex items-center space-x-2 hover:scale-110 transition-all ease-out" @click="onClick('light')">
            <Icon name="solar:sun-bold-duotone" size="20" /> <span>Светлая тема</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Slide-right transition for menu */
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter, .slide-right-leave-to {
  transform: tranneutralX(100%);
}
</style>
