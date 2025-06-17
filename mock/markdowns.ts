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
          id: filename.replace(/\.md$/, ''),
          title: filename,
          content: body.content,
        },
      };
    },
  },
] as MockMethod[];
