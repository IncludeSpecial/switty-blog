import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const postId = event.context.params!.postId;
  const commentId = parseInt(event.context.params!.commentId);
  const isAdmin = event.context.user?.isAdmin;
  const filePath = path.resolve(`./data/comments-${postId}.json`);

  if (!isAdmin) throw new Error('Только администратор может удалять комментарии.');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const comments = JSON.parse(data).filter((comment: { id: number }) => comment.id !== commentId);
    await fs.writeFile(filePath, JSON.stringify(comments, null, 2));
    return { success: true };
  } catch {
    throw new Error('Не удалось удалить комментарий.');
  }
});
