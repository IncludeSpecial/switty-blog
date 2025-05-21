<script setup lang="ts">
import MyLogo from '~/components/logo/myLogo.vue'
import { homePage } from '~/data'
</script>

<template>
  <div class="relative overflow-hidden py-10 sm:py-16">
    <div class="absolute inset-0 bg-grid-pattern opacity-5" />
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="px-6 space-y-6">
          <div class="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300 text-sm font-medium shadow-sm">
            Веб-разработка и не только
          </div>
          <h1 class="text-slate-800 dark:text-white font-semibold leading-tight text-4xl md:text-5xl">
            {{ homePage.title }}
          </h1>
          <p class="text-slate-600 dark:text-gray-300 text-lg">
            {{ homePage.description }}
          </p>
          <div class="flex gap-4 pt-2">
            <NuxtLink
              to="/blogs"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/50"
            >
              Начать чтение
            </NuxtLink>
            <NuxtLink
              to="/categories"
              class="px-6 py-3 border border-slate-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-slate-50 text-slate-800 dark:text-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow"
            >
              Категории
            </NuxtLink>
          </div>
        </div>
        <div class="px-6 justify-self-center relative">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div class="relative bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-xl">
            <MyLogo class="transform hover:scale-105 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
    linear-gradient(to bottom, #6366f1 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
