<script setup lang="ts">
import { navbarData } from '@/data'

const colorMode = useColorMode()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

function onClick(val: string) {
  colorMode.preference = val
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// Отслеживание скролла
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-sm transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg border-b border-slate-100 dark:border-gray-800 py-2'
        : 'bg-white/80 dark:bg-gray-900/80 py-4',
    ]"
  >
    <div class="container max-w-5xl mx-auto px-6">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-2 group relative z-10">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-md">
            <span class="text-white font-bold">S</span>
          </div>
          <span class="text-xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ navbarData.homeTitle }}</span>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            to="/"
            class="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:dark:bg-indigo-400 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:origin-left"
            active-class="text-indigo-600 dark:text-indigo-400 after:scale-x-100"
          >
            Главная
          </NuxtLink>
          <NuxtLink
            to="/blogs"
            class="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:dark:bg-indigo-400 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:origin-left"
            active-class="text-indigo-600 dark:text-indigo-400 after:scale-x-100"
          >
            Посты
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:dark:bg-indigo-400 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:origin-left"
            active-class="text-indigo-600 dark:text-indigo-400 after:scale-x-100"
          >
            Категории
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:dark:bg-indigo-400 after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:origin-left"
            active-class="text-indigo-600 dark:text-indigo-400 after:scale-x-100"
          >
            Обо мне
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'"
              class="p-2 rounded-full hover:bg-slate-100 hover:shadow-sm transition-all"
              aria-label="Переключить на темную тему"
              @click="onClick('dark')"
            >
              <Icon name="solar:moon-bold-duotone" class="text-slate-700 w-5 h-5" />
            </button>
            <button
              v-if="colorMode.value === 'dark'"
              class="p-2 rounded-full hover:bg-gray-800 transition-all"
              aria-label="Переключить на светлую тему"
              @click="onClick('light')"
            >
              <Icon name="solar:sun-bold-duotone" class="text-gray-300 w-5 h-5" />
            </button>
          </ClientOnly>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Открыть меню"
            @click="toggleMenu"
          >
            <Icon name="heroicons:bars-3" class="w-6 h-6 text-slate-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <!-- Mobile Menu Overlay -->
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm transition-opacity duration-300"
        @click="toggleMenu"
      />

      <!-- Mobile Menu Panel -->
      <div
        v-show="isMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 z-[70] md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out"
        :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      >
        <div class="p-6 flex flex-col h-full">
          <div class="flex justify-between items-center mb-8">
            <span class="text-xl font-bold text-slate-800 dark:text-white">Меню</span>
            <button
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Закрыть меню"
              @click="toggleMenu"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6 text-slate-700 dark:text-gray-300" />
            </button>
          </div>

          <nav class="flex flex-col gap-4">
            <NuxtLink
              to="/"
              class="py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-800 dark:text-white font-medium transition-all hover:shadow-sm flex items-center gap-3"
              active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
              @click="toggleMenu"
            >
              <Icon name="heroicons:home" class="w-5 h-5" />
              Главная
            </NuxtLink>
            <NuxtLink
              to="/blogs"
              class="py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-800 dark:text-white font-medium transition-all hover:shadow-sm flex items-center gap-3"
              active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
              @click="toggleMenu"
            >
              <Icon name="heroicons:document-text" class="w-5 h-5" />
              Посты
            </NuxtLink>
            <NuxtLink
              to="/categories"
              class="py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-800 dark:text-white font-medium transition-all hover:shadow-sm flex items-center gap-3"
              active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
              @click="toggleMenu"
            >
              <Icon name="heroicons:tag" class="w-5 h-5" />
              Категории
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-800 dark:text-white font-medium transition-all hover:shadow-sm flex items-center gap-3"
              active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
              @click="toggleMenu"
            >
              <Icon name="heroicons:user" class="w-5 h-5" />
              Обо мне
            </NuxtLink>
          </nav>

          <div class="mt-auto">
            <div class="border-t border-slate-200 dark:border-gray-800 my-6" />
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500 dark:text-gray-400">Сменить тему</span>
              <ClientOnly>
                <button
                  v-if="colorMode.value === 'light'"
                  class="p-2 rounded-full bg-slate-100 dark:bg-gray-800 hover:shadow-sm transition-colors"
                  @click="onClick('dark')"
                >
                  <Icon name="solar:moon-bold-duotone" class="text-slate-700 w-5 h-5" />
                </button>
                <button
                  v-if="colorMode.value === 'dark'"
                  class="p-2 rounded-full bg-gray-800 dark:border border-gray-700 transition-colors"
                  @click="onClick('light')"
                >
                  <Icon name="solar:sun-bold-duotone" class="text-gray-300 w-5 h-5" />
                </button>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.router-link-active {
  color: #4f46e5;
}
</style>
