<script setup lang="ts">
interface Props {
  title: string
  count: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No title available',
  count: 0,
})

// Цвета для категорий
const categoryColors: Record<string, {
  bg: string
  bgDark: string
  text: string
  textDark: string
  border: string
  borderDark: string
}> = {
  javascript: {
    bg: 'bg-amber-500',
    bgDark: 'dark:bg-amber-600',
    text: 'text-amber-900',
    textDark: 'dark:text-amber-100',
    border: 'border-amber-400',
    borderDark: 'dark:border-amber-700',
  },
  typescript: {
    bg: 'bg-blue-500',
    bgDark: 'dark:bg-blue-600',
    text: 'text-blue-900',
    textDark: 'dark:text-blue-100',
    border: 'border-blue-400',
    borderDark: 'dark:border-blue-700',
  },
  vue: {
    bg: 'bg-emerald-500',
    bgDark: 'dark:bg-emerald-600',
    text: 'text-emerald-900',
    textDark: 'dark:text-emerald-100',
    border: 'border-emerald-400',
    borderDark: 'dark:border-emerald-700',
  },
  nuxt: {
    bg: 'bg-green-500',
    bgDark: 'dark:bg-green-600',
    text: 'text-green-900',
    textDark: 'dark:text-green-100',
    border: 'border-green-400',
    borderDark: 'dark:border-green-700',
  },
  react: {
    bg: 'bg-cyan-500',
    bgDark: 'dark:bg-cyan-600',
    text: 'text-cyan-900',
    textDark: 'dark:text-cyan-100',
    border: 'border-cyan-400',
    borderDark: 'dark:border-cyan-700',
  },
}

// Базовые цвета для категорий без назначенного цвета
const fallbackColors = [
  {
    bg: 'bg-indigo-500',
    bgDark: 'dark:bg-indigo-600',
    text: 'text-indigo-900',
    textDark: 'dark:text-indigo-100',
    border: 'border-indigo-400',
    borderDark: 'dark:border-indigo-700',
  },
  {
    bg: 'bg-pink-500',
    bgDark: 'dark:bg-pink-600',
    text: 'text-pink-900',
    textDark: 'dark:text-pink-100',
    border: 'border-pink-400',
    borderDark: 'dark:border-pink-700',
  },
  {
    bg: 'bg-purple-500',
    bgDark: 'dark:bg-purple-600',
    text: 'text-purple-900',
    textDark: 'dark:text-purple-100',
    border: 'border-purple-400',
    borderDark: 'dark:border-purple-700',
  },
  {
    bg: 'bg-rose-500',
    bgDark: 'dark:bg-rose-600',
    text: 'text-rose-900',
    textDark: 'dark:text-rose-100',
    border: 'border-rose-400',
    borderDark: 'dark:border-rose-700',
  },
  {
    bg: 'bg-orange-500',
    bgDark: 'dark:bg-orange-600',
    text: 'text-orange-900',
    textDark: 'dark:text-orange-100',
    border: 'border-orange-400',
    borderDark: 'dark:border-orange-700',
  },
]

// Функция для получения цвета категории
function getCategoryColors(categoryName: string) {
  const normalizedName = categoryName.toLowerCase()
  // Проверяем, есть ли у нас предопределенный цвет для этой категории
  if (categoryColors[normalizedName])
    return categoryColors[normalizedName]
  // Если нет, выбираем цвет на основе хеша имени категории
  const hashCode = normalizedName.split('').reduce((acc: number, char: string) => {
    return acc + char.charCodeAt(0)
  }, 0)

  return fallbackColors[hashCode % fallbackColors.length]
}

// Получаем цвета для текущей категории
const colors = computed(() => getCategoryColors(props.title))
</script>

<template>
  <div class="group relative">
    <NuxtLink
      :to="`/categories/${title.toLocaleLowerCase()}`"
      class="block bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 rounded-t-xl transition-all duration-300 opacity-70 group-hover:opacity-100"
        :class="[colors.bg, colors.bgDark]"
      />

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-3 transition-all duration-300"
            :class="[`${colors.bg}/20`, `${colors.bgDark}/30`]"
          >
            <span
              class="text-xl font-bold"
              :class="[colors.text, colors.textDark]"
            >#</span>
          </div>

          <div>
            <h3
              class="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:underline decoration-2 underline-offset-2"
              :class="[`decoration-${colors.bg.replace('bg-', '')}`]"
            >
              {{ title }}
            </h3>
            <div class="flex items-center gap-1">
              <span class="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300">
                {{ count }} статей
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:translate-x-1"
          :class="[`${colors.bg}/20`, `${colors.bgDark}/30`]"
        >
          <Icon
            name="heroicons:arrow-right"
            class="w-4 h-4"
            :class="[colors.text, colors.textDark]"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
