<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.fullPath.replace('/', ''))

const socialLinks = [
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/' },
  { name: 'Twitter', icon: 'mdi:twitter', url: 'https://twitter.com/' },
  { name: 'Telegram', icon: 'mdi:telegram', url: 'https://telegram.org/' },
]

const currentYear = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="mt-auto bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800 shadow-sm">
    <div class="container max-w-5xl mx-auto py-10 px-6">
      <!-- Верхняя часть футера -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-200 dark:border-gray-800 pb-10 mb-8">
        <div v-if="path === 'about'">
          <FooterSite />
        </div>
        <div v-else>
          <FooterDeveloper />
        </div>
        <div>
          <FooterLink />
        </div>
        <div>
          <FooterConnect />
        </div>
      </div>

      <!-- Нижняя часть с копирайтом -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-slate-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
          © 2020-{{ currentYear }} Нет зарезервированных прав. Кого они волнуют‍?
        </div>

        <!-- Ссылки на соцсети -->
        <div class="flex items-center space-x-4">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all transform hover:scale-110 duration-300"
          >
            <Icon :name="link.icon" class="w-5 h-5" />
            <span class="sr-only">{{ link.name }}</span>
          </a>
        </div>

        <!-- Переключатель наверх -->
        <button
          class="hidden md:flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-300 group bg-slate-50 dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm hover:shadow"
          @click="scrollToTop"
        >
          Наверх
          <Icon name="heroicons:arrow-up" class="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
