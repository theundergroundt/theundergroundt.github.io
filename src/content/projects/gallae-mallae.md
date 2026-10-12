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
    problem: 여러 명이 같은 시간표를 동시에 고치면 서로의 변경이 덮이고, 참여자마다 다른 일정표를 보게 됨
    concern: 동시에 들어온 편집을 어떻게 순서대로 처리하고, 모두에게 같은 결과를 보여줄지
    solution:
      - "락: 블록 생성·이동·크기 조절·삭제 시 여행 단위 Redis 락 획득, TTL 3초로 서버 장애 시에도 자동 해제"
      - "반영: 락을 잡은 요청만 DB에 반영하고, 잡지 못한 요청은 재시도 안내"
      - "전파: 변경 내용을 STOMP로 같은 여행을 구독 중인 참여자에게 발행"
    result: 여행 단위로 편집 순서 보장, 모든 참여자가 같은 일정표 확인
  - title: 옮긴 블록이 원래 자리로 되돌아가는 문제
    tag: Trouble Shooting
    problem: 두 명만 동시 접속해도 옮긴 블록이 상대 화면에서 원래 자리로 되돌아감
    concern: 변경을 DB에 즉시 반영했는데도, 알림을 받고 다시 조회한 쪽에 왜 변경 전 데이터가 내려오는지
    solution:
      - "원인: 트랜잭션 커밋 전에 소켓 알림이 먼저 발행됨. 즉시 반영(saveAndFlush)만으로는 커밋 전이라 다른 요청에서 보이지 않음"
      - "알림 시점: 알림 발행을 트랜잭션 커밋 이후(afterCommit)로 이동"
      - "락 해제: 락 해제도 트랜잭션 종료 시점(afterCompletion)으로 옮겨, 커밋 전에 다음 편집이 끼어들지 않도록 처리"
    result: 알림 수신 후 조회 시 항상 변경 후 데이터 반환, 블록 되돌아감 해소
---
