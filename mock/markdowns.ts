import type { MockMethod } from 'vite-plugin-mock';
import fs from 'fs';
import path from 'path';

const markdownDir = path.resolve(__dirname, '../public/markdowns');

const sanitizeFilename = (input: string) => {
  return path.basename(input) // 디렉토리 경로 제거
    .replace(/[^a-zA-Z0-9가-힣_\-\.]/g, '_') // 안전한 문자만 허용
    .replace(/\.{2,}/g, '.') // 점 두 개 이상 방지
    .replace(/^\.*/, '')     // 파일명이 점으로 시작하면 제거
    .slice(0, 100);          // 너무 긴 이름 자르기
};

// 파일 경로를 안전하게 가져오는 헬퍼 함수
const getSafeFilePath = (idOrFilename: string) => {
  const safeName = sanitizeFilename(idOrFilename.replace(/\.md$/, '')) + '.md';
  return path.join(markdownDir, safeName);
};

export default [

  {
    url: '/api/markdowns',
    method: 'get',
    response: () => {
      const files = fs
        .readdirSync(markdownDir)
        .filter((file) => file.endsWith('.md'));

      return files.map((file) => {
        const filePath = path.join(markdownDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const stat = fs.statSync(filePath); // 👈 파일 메타데이터

        return {
          id: file.replace(/\.md$/, ''),
          title: file,
          content,
          uploadedAt: stat.birthtimeMs || stat.ctimeMs // ms 단위 timestamp
        };
      });
    },
  },

  {
    url: '/api/markdowns',
    method: 'post',
    response: ({ body }: { body: { title: string; content: string } }) => {
      try {
        if (!body.title || !body.content) {
          return { message: '제목과 내용을 모두 입력해야 합니다.', status: 400 };
        }

        const filename = body.title.endsWith('.md') ? body.title : `${body.title}.md`;
        const filePath = getSafeFilePath(filename);

        if (fs.existsSync(filePath)) {
          return { message: '같은 이름의 파일이 이미 존재합니다.', status: 409 };
        }

        fs.writeFileSync(filePath, body.content, 'utf-8');

        return {
          message: '업로드 성공',
          item: {
            id: filename.replace(/\.md$/, ''),
            title: filename,
            content: body.content,
          },
        };
      } catch (err) {
        return { message: '파일 저장 중 오류가 발생했습니다.', status: 500 };
      }
    },
  },

  {
    url: '/api/markdowns/:id',
    method: 'put',
    response: ({ query, body }: { query: { id: string }, body: { title: string, content: string } }) => {
      try {
        if (!body.title || !body.content) {
          return { message: '제목과 내용을 모두 입력해야 합니다.', status: 400 };
        }

        const oldPath = getSafeFilePath(query.id);
        const newPath = getSafeFilePath(body.title);

        if (!fs.existsSync(oldPath)) {
          return { message: '기존 파일을 찾을 수 없습니다.', status: 404 };
        }

        // 파일명이 바뀌었으면 이름 변경
        if (oldPath !== newPath) {
          fs.renameSync(oldPath, newPath);
        }

        fs.writeFileSync(newPath, body.content, 'utf-8');

        return {
          message: '수정 성공',
          item: {
            id: body.title.replace(/\.md$/, ''),
            title: body.title,
            content: body.content,
          },
        };
      } catch (err) {
        return { message: '파일 수정 중 오류가 발생했습니다.', status: 500 };
      }
    },
  },

  {
    url: '/api/markdowns/:id',
    method: 'delete',
    response: ({ query }: { query: { id: string } }) => {
      try {
        const filePath = getSafeFilePath(query.id);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          return { message: '삭제 성공' };
        } else {
          return { message: '파일을 찾을 수 없습니다.', status: 404 };
        }
      } catch (err) {
        return { message: '파일 삭제 중 오류가 발생했습니다.', status: 500 };
      }
    },
  },

] as MockMethod[];
