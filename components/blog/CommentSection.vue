<!--components/CommentSection-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

interface Comment {
  id: number;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  userActions: { [userId: string]: 'like' | 'dislike' | null }
}

const props = defineProps<{
  postId: string;
  isAdmin: boolean;
  userId: string;
}>()

const comments = ref<Comment[]>([])
const newComment = ref('')
const newName = ref('')

// Загрузка комментариев из API
async function loadComments() {
  const { data } = await useFetch(`/api/comments/${props.postId}`)
  comments.value = data.value || []
}

// Добавление комментария через API
async function addComment() {
  if (newComment.value.trim() && newName.value.trim()) {
    const newCommentObj = {
      name: newName.value,
      content: newComment.value
    }
    const { data: {value} } = await useFetch(`/api/comments/${props.postId}`, {
      method: 'POST',
      body: newCommentObj
    })
    comments.value.push(value)
    newComment.value = ''
    newName.value = ''
  } else {
    alert('Имя и комментарий не могут быть пустыми!')
  }
}

// Удаление комментария через API
async function deleteComment(commentId: number) {
  if (props.isAdmin) {
    await useFetch(`/api/comments/${props.postId}/${commentId}`, { method: 'DELETE' })
    comments.value = comments.value.filter(comment => comment.id !== commentId)
  } else {
    alert('Только администратор может удалять комментарии.')
  }
}

// Обработка лайка
async function toggleLike(commentId: number) {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return

  // Изменяем только состояние на клиенте
  if (comment.userActions[props.userId] === 'like') {
    comment.likes--;
    comment.userActions[props.userId] = null;
  } else {
    if (comment.userActions[props.userId] === 'dislike') {
      comment.dislikes--;
    }
    comment.likes++;
    comment.userActions[props.userId] = 'like';
  }

  // Отправляем изменения на сервер
  await updateCommentActions(commentId, comment.likes, comment.dislikes, comment.userActions);
}

// Обработка дизлайка
async function toggleDislike(commentId: number) {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return

  // Изменяем только состояние на клиенте
  if (comment.userActions[props.userId] === 'dislike') {
    comment.dislikes--;
    comment.userActions[props.userId] = null;
  } else {
    if (comment.userActions[props.userId] === 'like') {
      comment.likes--;
    }
    comment.dislikes++;
    comment.userActions[props.userId] = 'dislike';
  }

  // Отправляем изменения на сервер
  await updateCommentActions(commentId, comment.likes, comment.dislikes, comment.userActions);
}

// Отправка данных на сервер
async function updateCommentActions(commentId: number, likes: number, dislikes: number, userActions: { [userId: string]: 'like' | 'dislike' | null }) {
  const { data } = await useFetch(`/api/comments/${props.postId}/${commentId}/actions`, {
    method: 'PATCH',
    body: { likes, dislikes, userActions }
  })

  // Обновляем данные комментариев после того как сервер вернет результат
  if (data.value) {
    const updatedComment = comments.value.find(c => c.id === commentId)
    if (updatedComment) {
      updatedComment.likes = likes
      updatedComment.dislikes = dislikes
      updatedComment.userActions = userActions
    }
  }
}

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return new Date(date).toLocaleDateString('ru-RU', options);
}


// Загружаем комментарии при монтировании
onMounted(loadComments)
</script>

<template>
  <div class="mt-10 max-w-3xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Комментарии</h2>
    <span class="text-sm text-red-500">Внимание, раздел комментариев находится в стадии разработки и может работать некорректно</span>

    <!-- Комментарии -->
    <div v-if="comments.length" class="space-y-4 mt-6">
      <div v-for="comment in comments" :key="comment.id" class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 relative">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{formatDate( comment.date) }} - <span class="font-semibold">{{ comment.name }}</span>
        </p>
        <p class="mt-2 text-gray-800 dark:text-gray-300">{{ comment.content }}</p>

        <div class="flex items-center space-x-6 mt-4">
          <!-- Лайк -->
          <button
            @click="toggleLike(comment.id)"
            :class="{ 'text-blue-500': comment.userActions[props.userId] === 'like', 'hover:text-blue-700': comment.userActions[props.userId] !== 'like' }"
            class="flex items-center space-x-1 transition-colors duration-200"
          >
            <Icon :name="comment.userActions[props.userId] === 'like' ? 'mdi:like' : 'mdi:like-outline'" />
            <span class="text-sm">{{ comment.likes }}</span>
          </button>

          <!-- Дизлайк -->
          <button
            @click="toggleDislike(comment.id)"
            :class="{ 'text-red-500': comment.userActions[props.userId] === 'dislike', 'hover:text-red-700': comment.userActions[props.userId] !== 'dislike' }"
            class="flex items-center space-x-1 transition-colors duration-200"
          >
            <Icon :name="comment.userActions[props.userId] === 'dislike' ? 'mdi:dislike' : 'mdi:dislike-outline'" />
            <span class="text-sm">{{ comment.dislikes }}</span>
          </button>
        </div>

        <!-- Кнопка удаления (только для админа) -->
        <button v-if="props.isAdmin" @click="deleteComment(comment.id)" class="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200">
          Удалить
        </button>
      </div>
    </div>

    <!-- Форма добавления комментария -->
    <h3 class="text-lg font-semibold mt-8 mb-4 text-gray-800 dark:text-white">Добавить комментарий</h3>
    <form @submit.prevent="addComment" class="space-y-4">
      <div>
        <input
          v-model="newName"
          type="text"
          placeholder="Ваше имя"
          class="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          v-model="newComment"
          rows="4"
          placeholder="Ваш комментарий"
          class="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
        Добавить комментарий
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Custom styles can be added here if necessary */
</style>
