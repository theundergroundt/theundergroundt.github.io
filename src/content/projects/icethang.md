---
title: 얼음땡 (Icethang)
summary: 온디바이스 AI가 감지한 학생의 집중 상태를 교사가 실시간으로 보고, 수업 후 집중도로 정산하는 Android 서비스
start: "2026-01"
period: 2026.01 ~ 2026.02
duration: 6주
team: 6명
role: BE / JiraOps
category: SSAFY 공통 프로젝트
featured: true
color: "#2f9be0"
cover: ../../assets/projects/icethang.png
highlights:
  - 이탈 횟수 대신 비집중 지속 시간을 누적하는 상태 머신 설계
  - STOMP 채널 인터셉터로 무인증 소켓 연결·구독 차단
repo: https://github.com/theundergroundt/Icethang/blob/develop/README.md
stack: [Java, Spring Boot, JPA, WebSocket (STOMP), MySQL, Redis]
duties:
  summary: 백엔드 팀장 (BE / JiraOps) — 인증·실시간·정산 백엔드 담당
  items:
    - 카카오·네이버·일반 로그인, JWT 인증 구현
    - 집중도 산출·수업 종료 정산 구현
    - 교사–학생 실시간 소켓 인증 구현
    - Jira 이슈·일정 관리, 이슈 자동화
works:
  - title: 집중도 산출 알고리즘
    did: 집중·비집중 전환 기록을 시간순으로 읽어 비집중 시간을 누적하는 상태 머신 설계, 집중도(%) 산출
    why: 이탈 횟수로 세면 30초 딴짓과 10분 딴짓이 같은 1회가 되고, 이 점수가 경험치·통계의 기준값이라 오차가 서비스 전체에 영향
    result:
      - 딴짓 길이를 반영한 집중도와 5분 단위 추이 산출
      - 정산 조회 쿼리 1+N회 → 2회 (30명 반 기준 31회 → 2회)
  - title: 인증 없이 열려 있던 실시간 소켓
    tag: Trouble Shooting
    did: 실시간 메시지 채널에 인터셉터를 추가해 연결 시 JWT 검증, 미인증 연결·발행·구독 거부
    why: 소켓 메시지는 JWT 검사를 거치지 않아, 토큰 없이 다른 반 채널을 구독하면 메시지가 수신됨을 재현
    result: 미인증 연결·발행·구독 차단, 동일 재현 방법으로 거부 확인
---
