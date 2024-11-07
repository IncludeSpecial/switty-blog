import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const postId = event.context.params!.postId;
  const filePath = path.resolve(`./data/comments-${postId}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Если файл не найден, возвращаем пустой массив
  }
});
