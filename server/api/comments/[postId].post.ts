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
  const body = await readBody(event);
  const filePath = path.resolve(`./data/comments-${postId}.json`);

  // Проверка данных комментария
  if (!body.name || !body.content) throw new Error('Имя и содержание комментария обязательны.');

  const newComment: Comment = {
    id: Date.now(),
    name: body.name,
    content: body.content,
    date: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    userActions: {}
  };

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const comments = JSON.parse(data);
    comments.push(newComment);
    await fs.writeFile(filePath, JSON.stringify(comments, null, 2));
    return newComment;
  } catch {
    await fs.writeFile(filePath, JSON.stringify([newComment], null, 2));
    return newComment;
  }
});
