---
title: 얼음땡 (Icethang)
summary: 온디바이스 AI가 감지한 학생의 집중 상태를 교사가 실시간으로 보고, 수업 후 집중도로 정산하는 Android 서비스
start: "2026-01"
period: 2026.01 ~ 2026.02
duration: 6주
team: 6명
role: BE / JiraOps
category: SSAFY 1차 프로젝트
featured: true
color: "#2f9be0"
cover: ../../assets/projects/icethang.png
youtube: 5AmrbxufGHA
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
  - title: 집중도를 횟수가 아닌 시간으로 계산
    problem: 이탈 횟수로 집중도를 계산하면 30초 딴짓과 10분 딴짓이 같은 1회. 이 점수가 경험치와 통계의 기준값이라 오차가 서비스 전체로 번짐
    concern: 전환 시점만 기록된 이벤트 로그에서 "얼마나 오래" 집중하지 못했는지를 어떻게 구할지
    solution:
      - "구간 누적: 이벤트를 시간순으로 읽으며 비집중 시작 시각을 기억해 두고, 집중으로 돌아온 시점과의 차이를 누적하는 상태 머신"
      - "산출: (전체 시간 − 비집중 시간) ÷ 전체 시간을 0~100으로 보정해 집중도와 경험치로 반영"
    result: "딴짓의 길이가 점수에 반영됨. 예: 40분 수업에서 30초 딴짓 4회는 95%, 10분 딴짓 1회는 75% (횟수 기준으로는 뒤쪽이 더 집중한 것으로 보임)"
  - title: 먼저 쌓이는 로그를 나중에 생기는 성적표에 연결
    problem: 집중 이벤트는 수업 중에 계속 쌓이는데, 이 로그가 속할 성적표는 수업이 끝나야 생김. 가리킬 대상이 없어 로그를 저장할 수 없음
    concern: 성적표를 미리 만들어 둘지, 로그를 주인 없이 먼저 저장할지
    solution:
      - "저장: 로그의 성적표 외래 키를 nullable로 두어, 수업 중에는 성적표 없이 즉시 저장"
      - "연결: 수업 종료 시 성적표를 생성한 뒤, 해당 학생의 로그에 한꺼번에 연결"
      - "정산 범위: 성적표가 아직 연결되지 않은 로그만 정산 대상으로 조회하고, 전체를 하나의 트랜잭션으로 처리"
    result: 수업 중 로그 유실 없이 저장, 이미 정산된 로그는 다시 집계되지 않아 중복 정산 차단
  - title: 인증 없이 열려 있던 실시간 소켓
    tag: Trouble Shooting
    problem: 일반 요청은 JWT 필터가 막고 있었지만 소켓 메시지는 그 필터를 거치지 않음. 토큰 없이 접속해 다른 반 채널을 구독하니 메시지가 수신되는 것을 재현
    concern: HTTP 필터가 닿지 않는 소켓 메시지에 인증을 어디에 걸지
    solution:
      - "위치: STOMP 인바운드 채널에 인터셉터를 등록해 모든 메시지가 통과하도록 구성"
      - "연결 시: CONNECT 단계에서 JWT를 검증하고, 인증 주체를 소켓 세션에 저장"
      - "이후: 인증 주체가 없는 세션의 발행(SEND)과 구독(SUBSCRIBE)을 거부"
    result: 미인증 연결·발행·구독 차단, 같은 재현 방법으로 거부 확인
---
