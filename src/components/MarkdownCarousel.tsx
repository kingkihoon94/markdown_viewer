import { useEffect, useState } from 'react';
import { MarkdownCard } from './MarkdownCard';
import type { MarkdownFile } from '../types/types';

type Props = {
  files: MarkdownFile[];
  focusId?: string;
};

export const MarkdownCarousel = ({ files, focusId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = files.length;

  // 마크다운 수정 기능으로 제목이 바뀌여서 files 내 정렬 상태가 변한다면 포커스 재정렬이 필요함.
  useEffect(() => {
    if (!focusId) return;
    const newIndex = files.findIndex((file) => file.id === focusId);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  }, [focusId, files]);

  // 👉 파일이 0개일 때 안내 메시지 출력
  if (length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-50 text-gray-500">
        <p className="text-lg">업로드된 마크다운 파일이 없습니다.</p>
      </div>
    );
  }

  // 👉 이전 버튼 핸들러 (무한 루프)
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // 👉 다음 버튼 핸들러 (무한 루프)
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  // 👉 현재 중심 인덱스 기준 상대 위치 계산 (-1, 0, +1 등)
  const getRelativeIndex = (i: number) => {
    const diff = (i - currentIndex + length) % length;
    return diff > length / 2 ? diff - length : diff;
  };

  return (
    <div className="w-full flex flex-col items-center bg-mint-100 py-10">
      <div className="relative w-[900px] overflow-hidden">
        <div className="flex justify-center items-center gap-20">
          
          {/* ← 이전 버튼 (아이템이 1개일 경우 비활성화) */}
          <button
            onClick={prev}
            disabled={length === 1}
            className={`text-xl px-3 py-1 border rounded transition ${
              length === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            ←
          </button>

          {/* 📦 캐러셀 카드 영역 */}
          <div className="relative w-[700px] h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute left-0 top-0 w-full h-full flex transition-transform duration-500 ease-in-out">
              {files.map((file, i) => {
                const rel = getRelativeIndex(i);

                // ✅ 아이템이 3개 이상일 경우에만 중심 기준 ±1까지만 보여줌
                if (length > 2 && Math.abs(rel) > 1) return null;

                // ✨ 중심 카드 강조, 양옆은 작게 & 흐릿하게
                const scale = rel === 0 ? 1 : 0.9;
                const opacity = rel === 0 ? 1 : 0.5;
                const translate = rel * 280;

                return (
                  <div
                    key={file.id}
                    className="absolute left-1/3 top-1/2"
                    style={{
                      transform: `
                        translateX(${translate}px)
                        translateY(-50%)
                        scale(${scale})
                      `,
                      opacity,
                      transition: 'all 0.3s ease',
                      zIndex: 10 - Math.abs(rel),
                    }}
                  >
                    {/* 🧩 카드 자체는 고정된 너비로 출력 */}
                    <div className="w-[280px]">
                      <MarkdownCard file={file} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* → 다음 버튼 (아이템이 1개일 경우 비활성화) */}
          <button
            onClick={next}
            disabled={length === 1}
            className={`text-xl px-3 py-1 border rounded transition ${
              length === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
