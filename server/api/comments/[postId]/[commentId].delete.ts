import { readFile, writeFile } from 'fs/promises';
import { defineEventHandler, sendError, H3Error } from 'h3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { postId, commentId } = event.context.params!;
  const filePath = path.resolve(`./data/comments-${postId}.json`);
  const isAdmin = event.context.user?.isAdmin;  // Проверка, является ли пользователь администратором

  if (!isAdmin) {
    return sendError(event, new H3Error('Только администратор может удалять комментарии.'));
  }

  try {
    // Загружаем текущие комментарии
    const data = await readFile(filePath, 'utf-8');
    const comments = JSON.parse(data).filter((comment: { id: number }) => comment.id !== parseInt(commentId));

    // Сохранение обновленных комментариев
    await writeFile(filePath, JSON.stringify(comments, null, 2));
    return { success: true, message: 'Комментарий удален.' };
  } catch (error) {
    return sendError(event, new H3Error('Не удалось удалить комментарий.'));
  }
});
