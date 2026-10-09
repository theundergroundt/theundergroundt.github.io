# theundergroundt.github.io

김상지 포트폴리오 사이트. [Astro](https://astro.build)로 만들고 GitHub Pages로 배포한다.

## 내용 수정

| 바꿀 것 | 파일 |
|:--|:--|
| 소개, 스킬, 학력, 자격증, 수상 | `src/data/profile.ts` |
| 프로젝트 (파일 하나가 프로젝트 하나) | `src/content/projects/*.md` |

프로젝트 파일의 `works`에 `principle`(원칙) / `situation`(상황) / `conclusion`(결론)을 적으면 상세 페이지에 카드로 표시된다. `works`가 비어 있으면 "내용 준비 중"으로 표시된다.

## 실행

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist 에 빌드
```

`main` 브랜치에 push하면 GitHub Actions가 자동으로 배포한다.
