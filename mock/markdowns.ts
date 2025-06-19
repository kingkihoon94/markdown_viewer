import type { MockMethod } from 'vite-plugin-mock';
import fs from 'fs';
import path from 'path';

const markdownDir = path.resolve(__dirname, '../public/markdowns');

export default [
  {
    url: '/api/markdowns',
    method: 'get',
    response: () => {
      const files = fs
        .readdirSync(markdownDir)
        .filter((file) => file.endsWith('.md'));

      return files.map((file) => {
        const content = fs.readFileSync(path.join(markdownDir, file), 'utf-8');
        return {
          id: file.replace(/\.md$/, ''),
          title: file,
          content,
        };
      });
    },
  },
  {
    url: '/api/markdowns',
    method: 'post',
    response: ({ body }: { body: { title: string; content: string } }) => {
      const filename = body.title.endsWith('.md') ? body.title : `${body.title}.md`;
      const filePath = path.join(markdownDir, filename);

      fs.writeFileSync(filePath, body.content, 'utf-8');

      return {
        message: '업로드 성공',
        item: {
          id: filename.replace(/\\.md$/, ''),
          title: filename,
          content: body.content,
        },
      };
    },
  },
  {
    url: '/api/markdowns/:id',
    method: 'put',
    response: ({ query, body }: { query: { id: string }, body: { title: string, content: string } }) => {
      const id = query.id;
      const oldPath = path.join(markdownDir, `${id}.md`);
      const newPath = path.join(markdownDir, body.title);

      if (!fs.existsSync(oldPath)) {
        return { message: '기존 파일을 찾을 수 없습니다.', status: 404 };
      }

      // 파일명이 바뀌었으면 rename
      if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
      }

      // 내용 덮어쓰기
      fs.writeFileSync(newPath, body.content, 'utf-8');

      return {
        message: '수정 성공',
        item: {
          id: body.title.replace(/\.md$/, ''),
          title: body.title,
          content: body.content,
        },
      };
    },
  },
  {
    url: '/api/markdowns/:id',
    method: 'delete',
    response: ({ query }: { query: { id: string } }) => {
      const id = query.id;
      const filePath = path.join(markdownDir, `${id}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { message: '삭제 성공' };
      } else {
        return { message: '파일을 찾을 수 없습니다.', status: 404 };
      }
    },
  },
] as MockMethod[];
