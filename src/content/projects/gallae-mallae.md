---
title: 갈래말래 (Gallae-Mallae)
summary: 지도 탐색, AI 추천, 실시간 협업으로 친구들과 여행 계획을 함께 세우는 웹 서비스
start: "2025-11"
period: 2025.11 ~ 2025.12
duration: 6주
team: 4명
role: BE
category: SSAFY 관통 프로젝트
featured: false
color: "#ec4899"
cover: ../../assets/projects/gallae-mallae.png
repo: https://github.com/theundergroundt/Gallae-Mallae-Server/blob/develop/README.md
video: /videos/gallae-mallae-ucc.mp4
videoPoster: /videos/gallae-mallae-ucc-poster.jpg
highlights:
  - Redis 락과 WebSocket(STOMP)으로 여러 명이 동시에 고치는 일정표 실시간 동기화
  - 링크만 넣으면 제목·대표 이미지를 가져오는 스크랩 파이프라인 구현
stack: [Java, Spring Boot, JPA, WebSocket (STOMP), Redis, MySQL, AWS S3, Jsoup]
duties:
  summary: 백엔드 — 여행 계획, 실시간 일정 편집, 스크랩 담당
  items:
    - 도메인형 패키지 구조 설계, 전체 엔티티 초기 구축
    - 여행 계획·초대 코드·스케줄 블록·메모 API 구현
    - WebSocket(STOMP) 실시간 일정 동기화, Redis 락 기반 동시 편집 제어
    - 링크 스크랩 메타데이터 추출, 스크랩 폴더 관리와 소유자 권한 처리
    - 사용자 탈퇴(soft delete)와 재로그인 복구, S3 연동
works:
  - title: 실시간 일정 동시 편집
    did: 블록 생성·이동·크기 조절·삭제 시 여행 단위 Redis 락(TTL 3초) 획득 → DB 반영 → STOMP로 같은 여행 참여자에게 변경 이벤트 발행
    why: 여러 명이 같은 시간표를 동시에 고치면 서로의 변경이 덮이고, 참여자마다 다른 일정표를 보게 됨
    result: 여행 단위로 편집 순서 보장, 서버 장애 시에도 TTL로 락 자동 해제
  - title: 옮긴 블록이 원래 자리로 되돌아가는 문제
    tag: Trouble Shooting
    did:
      - 변경을 즉시 반영(saveAndFlush)하고, 알림 발행 시점을 트랜잭션 커밋 이후(afterCommit)로 이동
      - 락 해제도 트랜잭션 종료 시점(afterCompletion)으로 옮겨, 커밋 전에 다음 편집이 끼어들지 않도록 처리
    why: 두 명만 동시 접속해도 옮긴 블록이 화면에서 원래 자리로 되돌아감. 커밋 전에 소켓 알림이 먼저 발행돼, 알림을 받고 다시 조회한 쪽이 변경 전 데이터를 받은 것이 원인
    result: 알림 수신 후 조회 시 항상 변경 후 데이터 반환, 블록 되돌아감 해소
  - title: 링크 스크랩 파이프라인
    did: Jsoup으로 og → twitter → 일반 태그 순서로 제목·이미지·설명 추출. 유튜브는 영상 ID로 썸네일 주소 조합, 네이버 블로그는 iframe 안의 실제 본문 주소를 다시 요청
    why: 여행 정보의 주 출처인 네이버 블로그는 본문이 iframe 안에 있고 유튜브도 일반 방식으로 미리보기를 얻기 어려워, 빈 카드가 저장됨
    result: 링크만으로 미리보기 카드 생성, 추출 실패 시 기본 이미지로 저장
---
