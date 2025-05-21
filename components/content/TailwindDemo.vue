<script setup lang="ts">
</script>

<template>
  <div class="tailwind-demo">
    <h3 class="demo-title">Простая демонстрация Tailwind CSS</h3>
    <div class="bg-gradient-to-r from-blue-500 to-red-600 p-4 rounded-lg text-white text-center my-4">
      Тестовый компонент для проверки интеграции
    </div>
  </div>
</template>

<style scoped>
.tailwind-demo {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.demo-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
}
</style>