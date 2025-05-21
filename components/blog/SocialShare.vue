<script setup lang="ts">
const props = defineProps({
  network: {
    type: String,
    required: true,
    validator: (value: string) => ['twitter', 'facebook', 'linkedin', 'telegram', 'whatsapp', 'email'].includes(value),
  },
  styled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.siteUrl || 'https://switty.ru'
const currentUrl = computed(() => `${baseUrl}${route.path}`)
const title = computed(() => document.title)
const description = computed(() => {
  const metaDesc = document.querySelector('meta[name="description"]')
  return metaDesc ? metaDesc.getAttribute('content') : ''
})

type NetworkType = 'twitter' | 'facebook' | 'linkedin' | 'telegram' | 'whatsapp' | 'email'

const networkIcons: Record<NetworkType, string> = {
  twitter: 'ri:twitter-x-fill',
  facebook: 'ri:facebook-fill',
  linkedin: 'ri:linkedin-fill',
  telegram: 'ri:telegram-fill',
  whatsapp: 'ri:whatsapp-fill',
  email: 'heroicons:envelope',
}

// Более современные и читабельные названия
const networkLabels: Record<NetworkType, string> = {
  twitter: 'Twitter',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  email: 'Email',
}

// Добавляем градиентные стили для более современного вида
const networkGradients: Record<NetworkType, string> = {
  twitter: 'bg-gradient-to-r from-zinc-800 to-zinc-900',
  facebook: 'bg-gradient-to-r from-blue-600 to-blue-700',
  linkedin: 'bg-gradient-to-r from-blue-600 to-blue-800',
  telegram: 'bg-gradient-to-r from-sky-400 to-sky-600',
  whatsapp: 'bg-gradient-to-r from-green-400 to-green-600',
  email: 'bg-gradient-to-r from-purple-500 to-purple-700',
}

const shareUrl = computed(() => {
  const network = props.network as NetworkType
  switch (network) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(title.value)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
    case 'telegram':
      return `https://t.me/share/url?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(title.value)}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${title.value} ${currentUrl.value}`)}`
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title.value)}&body=${encodeURIComponent(`${description.value}\n\n${currentUrl.value}`)}`
    default:
      return '#'
  }
})
</script>

<template>
  <a
    :href="shareUrl"
    class="inline-flex items-center transition-all duration-300 font-medium rounded-md shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-transparent"
    :class="[
      styled ? networkGradients[network as NetworkType] : '',
      compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm',
      label ? 'gap-2' : 'gap-1',
      !styled ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700' : 'text-white',
    ]"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Поделиться"
  >
    <Icon :name="networkIcons[network as NetworkType]" class="flex-shrink-0" :class="compact ? 'h-4 w-4' : 'h-5 w-5'" />
    <span v-if="label" class="whitespace-nowrap font-medium">{{ networkLabels[network as NetworkType] }}</span>
  </a>
</template>
 