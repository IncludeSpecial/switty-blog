<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Тип комментария
interface Comment {
  id: number;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  userActions: { [userId: string]: 'like' | 'dislike' | null } // Действие пользователя (лайк или дизлайк)
}

// Получаем пропсы через defineProps
const props = defineProps<{
  postId: string;  // Уникальный идентификатор поста
  isAdmin: boolean;
  userId: string;
}>()

const comments = ref<Comment[]>([]) // Инициализация массива комментариев
const newComment = ref('')
const newName = ref('')

const localStorageKey = computed(() => `comments-${props.postId}`)

// Загрузка комментариев из localStorage, привязанных к посту
function loadComments() {
  const storedComments = localStorage.getItem(localStorageKey.value)
  comments.value = storedComments ? JSON.parse(storedComments) : []
}

// Сохранение комментариев в localStorage, привязанных к посту
function saveComments() {
  localStorage.setItem(localStorageKey.value, JSON.stringify(comments.value))
}

// Функция добавления нового комментария
function addComment() {
  if (newComment.value.trim() && newName.value.trim()) {
    const newCommentObj: Comment = {
      id: comments.value.length + 1,
      name: newName.value,
      content: newComment.value,
      date: new Date().toISOString().split('T')[0], // Текущая дата
      likes: 0,
      dislikes: 0,
      userActions: {} // Изначально нет действия для пользователя
    }
    comments.value.push(newCommentObj)
    saveComments()
    newComment.value = ''
    newName.value = ''
  } else {
    alert('Имя и комментарий не могут быть пустыми!')
  }
}

// Функция удаления комментария
function deleteComment(commentId: number) {
  if (props.isAdmin) {
    comments.value = comments.value.filter(comment => comment.id !== commentId)
    saveComments()
  } else {
    alert('Только администратор может удалять комментарии.')
  }
}

// Функция для обработки лайка
function toggleLike(commentId: number) {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return

  if (comment.userActions[props.userId] === 'like') {
    comment.likes--
    comment.userActions[props.userId] = null
  } else {
    if (comment.userActions[props.userId] === 'dislike') {
      comment.dislikes--
    }
    comment.likes++
    comment.userActions[props.userId] = 'like'
  }

  saveComments()
}

// Функция для обработки дизлайка
function toggleDislike(commentId: number) {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return

  if (comment.userActions[props.userId] === 'dislike') {
    comment.dislikes--
    comment.userActions[props.userId] = null
  } else {
    if (comment.userActions[props.userId] === 'like') {
      comment.likes--
    }
    comment.dislikes++
    comment.userActions[props.userId] = 'dislike'
  }

  saveComments()
}

// Загружаем комментарии при монтировании компонента
onMounted(loadComments)
</script>

<template>
  <div class="mt-10">
    <h2 class="text-2xl font-semibold mb-4">Комментарии</h2>

    <!-- Список комментариев -->
    <div v-if="comments.length" class="space-y-4 mb-6">
      <div v-for="comment in comments" :key="comment.id" class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg relative">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ comment.date }} - <span class="font-bold">{{ comment.name }}</span>
        </p>
        <p class="mt-2 text-gray-700 dark:text-gray-300">{{ comment.content }}</p>

        <!-- Лайк/Дизлайк -->
        <div class="flex items-center space-x-4 mt-2">
          <button
            @click="toggleLike(comment.id)"
            :class="{ 'text-blue-500': comment.userActions[props.userId] === 'like' }"
            class="hover:text-blue-700"
          >
            <template v-if="comment.userActions[props.userId] === 'like'">
              <Icon name="mdi:like"/> {{ comment.likes }}
            </template>
            <template v-else>
              <Icon name="mdi:like-outline"/> {{ comment.likes }}
            </template>
          </button>
          <button
            @click="toggleDislike(comment.id)"
            :class="{ 'text-red-500': comment.userActions[props.userId] === 'dislike' }"
            class="hover:text-red-700"
          >
            <template v-if="comment.userActions[props.userId] === 'dislike'">
              <Icon name="mdi:dislike"/> {{ comment.dislikes }}
            </template>
            <template v-else>
              <Icon name="mdi:dislike-outline"/> {{ comment.dislikes }}
            </template>
          </button>
        </div>

        <!-- Кнопка удаления комментария, доступна только для администратора -->
        <button
          v-if="props.isAdmin"
          @click="deleteComment(comment.id)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Удалить комментарий"
        >
          Удалить
        </button>
      </div>
    </div>

    <!-- Форма добавления нового комментария -->
    <h3 class="text-lg font-semibold mb-2">Добавить комментарий</h3>
    <form @submit.prevent="addComment" class="space-y-4">
      <input
        v-model="newName"
        type="text"
        placeholder="Ваше имя"
        class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800"
      />
      <textarea
        v-model="newComment"
        rows="4"
        placeholder="Ваш комментарий"
        class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800"
      ></textarea>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Добавить
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Ваши стили */
</style>
