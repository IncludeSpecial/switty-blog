<script setup lang="ts">
const { path } = useRoute()
const articles = await queryContent(path).findOne()

const links = articles?.body?.toc?.links || []
const activeLink = ref('')
const tocVisible = ref(true)

// Функция для отслеживания активного раздела при прокрутке
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          activeLink.value = entry.target.id
      })
    },
    { rootMargin: '-10% 0px -85% 0px' },
  )

  // Наблюдение за всеми заголовками
  setTimeout(() => {
    links.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element)
        observer.observe(element)
    })
  }, 500)
})

// Индикатор уровня заголовка (отступ)
function getIndentClass(depth: number): string {
  switch (depth) {
    case 2:
      return 'ml-0'
    case 3:
      return 'ml-3'
    case 4:
      return 'ml-6'
    default:
      return 'ml-0'
  }
}

// Переключатель видимости оглавления
function toggleToc(): void {
  tocVisible.value = !tocVisible.value
}
</script>

<template>
  <div class="toc-container">
    <!-- Заголовок с кнопкой сворачивания/разворачивания -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <Icon name="heroicons:list-bullet" class="w-4 h-4 text-blue-500 dark:text-blue-400" />
        <span class="text-sm font-medium">Оглавление</span>
      </div>
      <button 
        @click="toggleToc" 
        class="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors duration-200"
        :aria-label="tocVisible ? 'Свернуть оглавление' : 'Развернуть оглавление'"
      >
        <Icon 
          :name="tocVisible ? 'heroicons:minus-small' : 'heroicons:plus-small'" 
          class="w-5 h-5"
        />
      </button>
    </div>
    
    <Transition 
      name="slide-fade"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[500px]"
      leave-from-class="opacity-100 max-h-[500px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="tocVisible">
        <div v-if="links.length">
          <nav class="toc-nav max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
            <ul class="space-y-1.5">
              <li v-for="link in links" :key="link.id" class="relative">
                <NuxtLink
                  :to="`#${link.id}`"
                  class="block py-2 text-sm rounded-lg transition-all duration-300 relative overflow-hidden group flex items-center"
                  :class="[
                    getIndentClass(link.depth),
                    link.id === activeLink
                      ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/70 dark:bg-blue-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white',
                  ]"
                >
                  <!-- Активная линия слева -->
                  <div 
                    class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r transition-transform duration-300 transform"
                    :class="link.id === activeLink ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'"
                  ></div>
                  
                  <!-- Маркер пункта -->
                  <span
                    class="mr-2.5 h-2 w-2 rounded-full transition-all duration-300 flex-shrink-0"
                    :class="link.id === activeLink 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 ring-2 ring-blue-100 dark:ring-blue-900/30' 
                      : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500'"
                  ></span>

                  <!-- Текст ссылки с анимацией -->
                  <span class="truncate transition-transform duration-300 transform group-hover:translate-x-1">
                    {{ link.text }}
                  </span>

                  <!-- Фоновый эффект при наведении -->
                  <span
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    :class="link.id === activeLink 
                      ? 'bg-blue-50/0 dark:bg-blue-900/0' 
                      : 'bg-slate-100/80 dark:bg-slate-700/30'"
                  ></span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Пустое состояние -->
        <div v-else class="text-sm text-slate-500 dark:text-slate-400 py-5 text-center bg-slate-50 dark:bg-slate-800/40 rounded-lg">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3">
              <Icon name="heroicons:document-text" class="w-5 h-5 text-slate-400" />
            </div>
            <p>Оглавление отсутствует</p>
            <p class="text-xs mt-1 text-slate-400 dark:text-slate-500">Возможно, в статье нет заголовков</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.toc-container {
  position: relative;
}

.toc-nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.toc-nav::-webkit-scrollbar {
  width: 3px;
}

.toc-nav::-webkit-scrollbar-track {
  background: transparent;
}

.toc-nav::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark .toc-nav::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Тень при прокрутке */
.toc-nav {
  position: relative;
}

.toc-nav::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.toc-nav:hover::after {
  opacity: 1;
}

.dark .toc-nav::after {
  background: linear-gradient(to top, rgba(31, 41, 55, 1), rgba(31, 41, 55, 0));
}
</style>
