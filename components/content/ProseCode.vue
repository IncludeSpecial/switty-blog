<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
})

const copied = ref(false)
const codeBlockRef = ref<HTMLElement | null>(null)
const copySuccess = ref(false) // Для отслеживания успешного копирования

// Функция для копирования кода в буфер обмена
function copyCode(): void {
  if (!props.code && !codeBlockRef.value) 
    return

  const textToCopy = props.code || codeBlockRef.value?.textContent || ''

  navigator.clipboard.writeText(textToCopy.trim())
    .then(() => {
      copied.value = true
      copySuccess.value = true
      
      // Сброс состояния скопировано через 2 секунды
      setTimeout(() => {
        copied.value = false
      }, 2000)
      
      // Сброс состояния успеха через 2.5 секунды
      setTimeout(() => {
        copySuccess.value = false
      }, 2500)
    })
    .catch((err) => {
      console.error('Ошибка при копировании: ', err)
      copySuccess.value = false
    })
}

// Улучшенное отображение имени языка
function getLanguageName(lang: string | null): string {
  if (!lang) 
    return ''

  const languageMap: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    vue: 'Vue',
    jsx: 'React JSX',
    tsx: 'React TSX',
    md: 'Markdown',
    yaml: 'YAML',
    bash: 'Bash',
    sh: 'Shell',
    py: 'Python',
    php: 'PHP',
    go: 'Go',
    java: 'Java',
    c: 'C',
    cpp: 'C++',
    cs: 'C#',
    ruby: 'Ruby',
    rust: 'Rust',
    sql: 'SQL',
  }

  return languageMap[lang.toLowerCase()] || lang.toUpperCase()
}
</script>

<template>
  <div class="code-block group relative" ref="codeBlockRef">
    <!-- Заголовок блока кода (если указан язык или имя файла) -->
    <div v-if="language || filename" class="code-header flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 text-xs rounded-t-lg">
      <div class="flex items-center gap-2">
        <!-- Иконка языка программирования -->
        <div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Icon name="heroicons:code-bracket" class="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <span v-if="language" class="font-medium">{{ getLanguageName(language) }}</span>
        </div>
        
        <!-- Название файла если указано -->
        <div v-if="filename" class="flex items-center gap-1.5 ml-2 text-slate-600 dark:text-slate-400">
          <Icon name="heroicons:document-text" class="w-4 h-4 text-purple-500 dark:text-purple-400" />
          <span class="font-medium">{{ filename }}</span>
        </div>
      </div>
    </div>
    
    <!-- Содержимое кода -->
    <div class="code-content relative overflow-x-auto">
      <!-- Блок кода -->
      <div class="code-lines">
    <slot />
      </div>
      
      <!-- Кнопка копирования кода -->
      <button
        @click="copyCode"
        aria-label="Копировать код"
        class="copy-button absolute top-3 right-3 p-2 h-9 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:scale-105 shadow-sm"
        :class="[
          copied 
            ? 'bg-gradient-to-tr from-green-500/90 to-emerald-400/90 text-white ring-2 ring-green-400/30 dark:ring-green-500/30' 
            : 'bg-gradient-to-tr from-slate-100/90 to-white/90 dark:from-gray-800/90 dark:to-gray-700/90 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-gray-600/80'
        ]"
      >
        <div class="relative flex items-center justify-center w-5 h-5 overflow-hidden">
          <Icon
            name="heroicons:clipboard-document"
            class="w-5 h-5 absolute transition-all duration-300"
            :class="copied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'"
          />
          <Icon
            name="heroicons:check"
            class="w-5 h-5 absolute transition-all duration-300"
            :class="copied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
          />
        </div>
      </button>
      
      <!-- Уведомление "Скопировано" -->
      <div
        v-if="copied"
        class="copy-notification absolute top-14 right-3 py-1.5 px-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/60 dark:to-emerald-900/60 text-green-700 dark:text-green-300 text-xs font-medium rounded-lg shadow-md border border-green-200 dark:border-green-800 flex items-center gap-1.5 translate-y-0"
      >
        <Icon name="heroicons:check-circle" class="w-4 h-4" />
        <span>Код скопирован!</span>
      </div>
    </div>
  </div>
</template>

<style>
.code-block {
  @apply overflow-hidden rounded-lg border border-slate-200 dark:border-gray-700 mb-6 bg-slate-50 dark:bg-gray-900 shadow-sm;
}

.code-block:not(:has(.code-header)) .code-content {
  @apply rounded-t-lg;
}

.code-content pre {
  @apply overflow-x-auto p-4 m-0 text-sm;
  @apply bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-slate-200;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.code-content pre::-webkit-scrollbar {
  @apply h-1.5 w-1.5;
}

.code-content pre::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.code-content pre::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-gray-600 rounded-full;
}

.code-content pre::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-400 dark:bg-gray-500;
}

.code-content code {
  @apply font-mono text-sm leading-relaxed;
  tab-size: 2;
}

/* Подсветка строк кода */
.code-content .line.highlight {
  @apply bg-blue-50 dark:bg-blue-900/30 -mx-4 px-4 border-l-2 border-blue-500 dark:border-blue-400;
}

/* Анимация */
.copy-notification {
  animation: notification-slide 2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes notification-slide {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

/* Стили кнопки копирования с эффектом свечения */
.copy-button {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
}

.group:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  box-shadow: 0 0 15px 1px rgba(59, 130, 246, 0.3);
}

.copy-button:active {
  transform: scale(0.93) !important;
  transition-duration: 0.1s;
}

/* Стили для различных языков программирования */
.code-block[data-language="js"] .code-header,
.code-block[data-language="javascript"] .code-header {
  @apply border-l-2 border-l-yellow-500;
}

.code-block[data-language="ts"],
.code-block[data-language="typescript"] .code-header {
  @apply border-l-2 border-l-blue-500;
}

.code-block[data-language="html"] .code-header {
  @apply border-l-2 border-l-orange-500;
}

.code-block[data-language="css"] .code-header {
  @apply border-l-2 border-l-purple-500;
}

.code-block[data-language="json"] .code-header {
  @apply border-l-2 border-l-green-500;
}

.code-block[data-language="vue"] .code-header {
  @apply border-l-2 border-l-emerald-500;
}

.code-block pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
