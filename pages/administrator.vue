<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CommentSection from "~/components/blog/CommentSection.vue";


const adminId = 'admin-123'
const currentUserId = ref<string>('guest')
const isAdmin = computed(() => currentUserId.value === adminId)

function loadUserStatus() {
  const storedUserId = localStorage.getItem('userId')
  currentUserId.value = storedUserId || 'guest'
}

function enableAdminMode() {
  localStorage.setItem('userId', adminId)
  currentUserId.value = adminId
}

function disableAdminMode() {
  localStorage.setItem('userId', 'guest')
  currentUserId.value = 'guest'
}

onMounted(loadUserStatus)
</script>

<template>
  <div class="py-5">
    <div class="container max-w-5xl mx-auto px-6 sm:py-9">
      <h1 class="text-3xl font-bold pb-5">Режим администратора</h1>
      <p> Увы но тут пусто))</p>
      <div class="pb-5">
        <p v-if="isAdmin" class="text-lg text-green-600">Вы вошли как администратор.</p>
        <p v-else class="text-lg text-red-600">Вы не являетесь администратором.</p>
      </div>
<!--      <div class="space-x-4">-->
<!--        <button-->
<!--          v-if="!isAdmin"-->
<!--          @click="enableAdminMode"-->
<!--          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"-->
<!--        >-->
<!--          Включить режим администратора-->
<!--        </button>-->
<!--        <button-->
<!--          v-else-->
<!--          @click="disableAdminMode"-->
<!--          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"-->
<!--        >-->
<!--          Выключить режим администратора-->
<!--        </button>-->
<!--      </div>-->

      <!-- Передаем параметры isAdmin и currentUserId в CommentSection -->
<!--      <CommentSection :postId="'examplePostId'" :isAdmin="isAdmin" :userId="currentUserId" />-->
    </div>
  </div>
</template>

<style scoped>
/* Стили для страницы администратора */
</style>
