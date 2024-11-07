// api/comments/[postId]/[commentId]/actions.patch.ts

import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

interface Comment {
  id: number;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  userActions: Record<string, 'like' | 'dislike' | null>;
}

export default defineEventHandler(async (event) => {
  const postId = event.context.params!.postId;
  const commentId = parseInt(event.context.params!.commentId);
  const filePath = path.resolve(`./data/comments/${postId}.json`);
  const body = await readBody(event);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const comments: Comment[] = JSON.parse(data);
    const comment = comments.find(c => c.id === commentId);

    if (!comment) {
      throw new Error('Комментарий не найден');
    }

    // Обновление лайков и дизлайков
    comment.likes = body.likes || comment.likes;
    comment.dislikes = body.dislikes || comment.dislikes;
    comment.userActions = body.userActions || comment.userActions;

    // Сохранение обратно в файл
    await fs.writeFile(filePath, JSON.stringify(comments, null, 2));

    return { success: true, comment };
  } catch ({message: message}) {
    return { success: false, message: message };
  }
});
