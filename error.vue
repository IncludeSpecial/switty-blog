<script setup lang="ts">
const error = useError()
const is404 = computed(() => error.value?.statusCode === 404)

useHead({
  title: () => (is404.value ? 'Страница не найдена' : 'Произошла ошибка'),
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="wrap">
      <a class="logo" href="/">Switty<span>.</span></a>
      <h1>{{ is404 ? 'Страница не найдена' : 'Произошла ошибка' }}</h1>
      <p>
        {{ is404
          ? 'Такой страницы нет.'
          : 'Не получилось открыть страницу.' }}
      </p>
      <button class="btn btn-accent" type="button" @click="goHome">
        На главную
      </button>
    </div>
  </div>
</template>
