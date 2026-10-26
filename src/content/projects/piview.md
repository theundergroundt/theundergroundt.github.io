---
title: Piview
summary: 사진 한 장으로 보유 화장품을 등록하고, 피부 고민에 맞춰 제품을 비교·추천하는 서비스
start: "2026-02"
period: 2026.02 ~ 2026.03
duration: 5주
team: 6명
role: AI / BE / JiraOps
category: SSAFY 2차 프로젝트
featured: true
color: "#c8794a"
cover: ../../assets/projects/piview.png
highlights:
  - FastAPI와 Spring 2서버로 OCR 인식·정제·매칭 파이프라인 구현
  - 토큰 교체·블랙리스트·httpOnly 쿠키로 JWT 탈취 경로 차단
repo: https://github.com/theundergroundt/Piview/blob/develop/README.md
stack: [Java, Spring Boot, Spring Security, FastAPI, EasyOCR, Gemini, MySQL, Redis]
duties:
  summary: 백엔드 팀장 (AI / BE / JiraOps) — OCR 파이프라인, 루틴 편집 기능 담당
  items:
    - OCR 인식·정제·매칭 파이프라인 구현 (FastAPI + Spring)
    - 카카오 로그인·JWT 인증 구현
    - Redis 기반 루틴 임시 저장, 루틴 구성 시 AI 요약·비교 분석 API 구현
    - Jira 이슈·일정 관리
    - AWS Lambda로 작업자별 Jira 이슈 현황을 Mattermost에 정기 전송
works:
  - title: OCR 화장품 매칭 파이프라인
    problem: 포장은 영문(DR.G)인데 공식 판매명은 한글(닥터지)이고, 용량·홍보 문구와 OCR 오타가 섞여 단순 검색으로는 등록 불가
    concern: 읽은 글자를 그대로 믿을 수 없는데, 어떻게 맞는 제품 1건을 고를지
    solution:
      - "선별: EasyOCR 결과에서 신뢰도 0.3 초과, 글자 높이 상위 7개만 사용 (제품명은 크게 인쇄됨)"
      - "정제: LLM으로 용량·홍보 문구를 제거하고 영문 표기를 한글 공식명으로 변환. 응답 형식이 어긋나면 배열 부분만 추출해 사용"
      - "매칭: 앞 단어일수록 높은 가중치와 단어 길이 가산점 부여, 레벤슈타인 거리로 오타 1~2자를 허용하되 점수 80%로 감점"
    result: 테스트 사진 30장 중 28장 매칭 성공 (93%)
  - title: 로그아웃한 토큰이 계속 통하는 문제
    problem: JWT는 서버가 상태를 갖지 않아, 로그아웃해도 만료 전까지 토큰이 계속 유효
    concern: 즉시 무효화하려면 서버가 토큰 상태를 기억해야 하는데, 그러면 무상태의 장점이 줄어듦
    solution:
      - 로그아웃 시 access 토큰을 Redis에 등록, TTL은 토큰의 남은 수명
      - 인증 필터에서 요청마다 Redis를 조회해 등록된 토큰이면 거부
      - refresh 토큰은 Redis에서 삭제해 재발급 차단
    result: 로그아웃 즉시 토큰 무효화, 등록 정보는 만료 시각에 자동 삭제되어 누적되지 않음
---
