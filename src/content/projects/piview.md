---
title: Piview
summary: 사진 한 장으로 보유 화장품을 등록하고, 피부 고민에 맞춰 제품을 비교·추천하는 서비스
start: "2026-02"
period: 2026.02 ~ 2026.03
duration: 5주
team: 6명
role: AI / BE / JiraOps
category: SSAFY 특화 프로젝트
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
    did:
      - 사진 1장을 DB 제품 1건으로 연결하는 파이프라인을 Python 인식 서버와 Java 매칭 서버에 걸쳐 구현
      - 글자 크기 상위 7개 선별 → LLM 정제 → 단어 순서·길이 가중치와 레벤슈타인 거리로 후보 채점
    why: 포장은 영문(DR.G)인데 공식 판매명은 한글(닥터지)이고, 용량·홍보 문구와 OCR 오타가 섞여 단순 검색으로는 등록 불가
    result:
      - 테스트 사진 30장 중 28장 매칭 성공 (93%)
      - 오타 1~2개를 허용하되 감점 처리해 오매칭 억제
  - title: JWT 토큰 탈취 경로 차단
    did: 카카오 로그인·JWT 인증에 httpOnly 쿠키 저장, 재발급 시 토큰 교체, 로그아웃 블랙리스트, 리다이렉트 허용목록 적용
    why: 발급·검증만으로는 스크립트 접근, URL 노출, 탈취 토큰 재사용, 임의 주소 리다이렉트 등 탈취 경로가 열려 있음
    result: 탈취 경로 차단, 블랙리스트 보관 시간을 토큰 잔여 수명으로 제한해 저장 비용 최소화
---
