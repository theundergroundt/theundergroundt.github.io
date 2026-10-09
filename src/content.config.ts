import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 문장 하나 또는 목록. 화면에서는 항상 목록으로 다룬다.
const textBlock = z
  .union([z.string(), z.array(z.string())])
  .transform((value) => (Array.isArray(value) ? value : [value]));

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // 정렬 기준 (YYYY-MM). 최신순으로 나열된다.
      start: z.string(),
      period: z.string(),
      // 진행 기간 길이 (예: 5주). 상세 페이지의 기간 옆에 붙는다.
      duration: z.string().optional(),
      team: z.string(),
      role: z.string(),
      category: z.string(),
      // true인 프로젝트만 메인 페이지에 나온다 (최신순 3개까지).
      featured: z.boolean().default(false),
      // 프로젝트 구분 색.
      color: z.string().default('#84cc16'),
      // 대표 이미지. 없으면 이름으로 만든 자리 표시가 나온다.
      cover: image().optional(),
      // contain: 로고처럼 잘리면 안 되는 이미지 / cover: 사진처럼 칸을 채우는 이미지
      coverFit: z.enum(['contain', 'cover']).default('contain'),
      repo: z.string().url().optional(),
      // 소개·시연 영상. public/ 아래 경로 (예: /videos/이름.mp4). videoPoster 는 재생 전 표시할 그림.
      video: z.string().optional(),
      videoPoster: z.string().optional(),
      // 카드에 보이는 대표 역할·기능. 2개를 넘으면 +n 으로 접힌다.
      highlights: z.array(z.string()).default([]),
      // 5개를 넘으면 +n 으로 접힌다.
      stack: z.array(z.string()).default([]),
      // 상세 페이지의 "담당 역할" 칸.
      // summary: 맨 윗줄 (예: 팀장 — Git 컨벤션 수립, 알림 자동화 구축) / items: 그 아래 목록
      duties: z
        .object({
          summary: z.string().optional(),
          items: z.array(z.string()).default([]),
        })
        .default({ items: [] }),
      // 상세 페이지의 프로젝트 성과 칸 (팀 전체 성과 등). items 가 비어 있으면 칸이 나오지 않는다.
      outcomes: z
        .object({
          title: z.string().default('프로젝트 성과'),
          items: z.array(z.string()).default([]),
        })
        .default({ title: '프로젝트 성과', items: [] }),
      // 상세 페이지의 "내가 한 일". 한 일 → 한 이유 → 결과 및 성과 순서로 보인다.
      // 각 칸은 문장 하나 또는 목록(여러 줄)으로 쓸 수 있다.
      works: z
        .array(
          z.object({
            title: z.string(),
            // 예: Trouble Shooting. 적으면 제목 옆에 태그로 붙는다.
            tag: z.string().optional(),
            // 카드 아래에 붙는 사진 (없어도 됨). imageCaption 은 사진 설명.
            image: image().optional(),
            imageCaption: z.string().optional(),
            did: textBlock,
            why: textBlock,
            result: textBlock,
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };
