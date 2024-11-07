<script setup lang="ts">
import { ref, computed } from 'vue'

// Статический ID администратора
const adminId = 'admin-123'

// Состояние текущего пользователя, по умолчанию будет 'guest'
const currentUserId = ref<string>('guest')

// Проверка, является ли текущий пользователь администратором
const isAdmin = computed(() => currentUserId.value === adminId)

// Загрузка состояния из localStorage при монтировании компонента
const loadUserStatus = () => {
  const storedUserId = localStorage.getItem('userId')
  currentUserId.value = storedUserId || 'guest' // Если не найдено, то ставим 'guest'
}

const enableAdminMode = () => {
  localStorage.setItem('userId', adminId) // Устанавливаем ID администратора в localStorage
  currentUserId.value = adminId
}

const disableAdminMode = () => {
  localStorage.setItem('userId', 'guest') // Устанавливаем ID гостя в localStorage
  currentUserId.value = 'guest'
}

// Загружаем состояние пользователя при монтировании
onMounted(loadUserStatus)
</script>

<template>
  <div class="py-5">
    <div class="container max-w-5xl mx-auto px-6 sm:py-9">
      <h1 class="text-3xl font-bold pb-5">Режим администратора</h1>

      <!-- Информация о текущем статусе пользователя -->
      <div class="pb-5">
        <p v-if="isAdmin" class="text-lg text-green-600">Вы вошли как администратор.</p>
        <p v-else class="text-lg text-red-600">Вы не являетесь администратором.</p>
      </div>

      <!-- Кнопка для переключения на режим администратора -->
      <div class="space-x-4">
        <button
          v-if="!isAdmin"
          @click="enableAdminMode"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Включить режим администратора
        </button>
        <button
          v-else
          @click="disableAdminMode"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Выключить режим администратора
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили для страницы администратора */
</style>
