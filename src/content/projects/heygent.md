---
title: HeyGent
summary: 사용자 요청을 여러 단계·도구로 실행하는 AI 오케스트레이션 플랫폼
start: "2026-04"
period: 2026.04 ~ 2026.05
duration: 5주
team: 7명
role: AI / BE / IoT / JiraOps
category: SSAFY 자율 프로젝트
featured: true
color: "#7c5cff"
cover: ../../assets/projects/heygent.png
highlights:
  - 기억의 회상·갱신·폐기를 LLM이 판단하는 장기기억 생애주기 설계
  - AI 작업 실행을 표시하는 MQTT 디스플레이 파이프라인 구현
repo: https://github.com/theundergroundt/HeyGent/blob/develop/README.md
stack: [Python, FastAPI, Spring Boot, PostgreSQL, Redis, MQTT]
duties:
  summary: 백엔드 팀장 (AI / BE / IoT / JiraOps) — 장기기억 시스템, IoT 디스플레이 담당
  items:
    - Python AI 서버와 Java 백엔드에 걸친 장기기억 저장·회상 구현
    - MQTT 기반 기기 표시 파이프라인 구현, ESP32 펌웨어 개발
    - 기기 외형 3D 모델 설계·출력
    - Jira 이슈·일정 관리, Git 컨벤션 수립
    - Notion–n8n–Mattermost 회고 자동화 구축
works:
  - title: 기억이 답변을 오염시키지 않게 넣기
    problem: DB 레코드를 그대로 프롬프트에 넣으면 과거 발화가 현재 지시처럼 동작하고, 관련 없는 기억까지 들어감
    concern: 기억을 "명령"이 아닌 "참고 컨텍스트"로만 쓰이게 하려면
    solution: 회상 여부를 먼저 판단한 뒤 pgvector 유사도 검색, 결과는 전용 태그 블록으로 격리하고 길이 제한
    result: 질문 18개 중 관련 있는 6개에만 주입, 만료 기억 노출 0건, 검색 평균 23.57ms
  - title: 불러온 기억이 실제로 쓰였는지 판정
    problem: 불러온 기억이 답변에 쓰였는지 알 수 없어 유용한 기억을 가려낼 수 없음
    concern: 토큰 겹침만으로는 표현이 바뀌면 놓치고, 주제어만 같아도 쓰인 것으로 판정
    solution: 휴리스틱 1차, LLM 검증 2차로 판정. 타임아웃 시 휴리스틱으로 폴백, 작업 ID 기준 멱등 처리. 판정 결과는 프론트 디버그 패널에 표시
    result: 답변마다 어떤 기억이 회상되고 쓰였는지 화면에서 확인, 기억별 사용 통계 확보와 중복 집계 차단
  - title: 기억 일괄 저장이 통째로 롤백되는 문제
    tag: Trouble Shooting
    problem: 여러 기억 후보가 같은 레코드를 수정 대상으로 지정해 정합성 오류 발생, 배치 트랜잭션 전체 롤백
    concern: 같은 대상을 수정하려는 후보 중 무엇을 반영할지
    solution: 먼저 처리된 후보만 반영하고 겹치는 후보는 건너뜀. AI 서버와 백엔드 양쪽에서 이중 방어
    result: 후보 1건의 충돌이 배치 전체 롤백으로 이어지지 않음
  - title: 화면 하나에 여러 작업 표시하기
    problem: 동시 작업은 여러 개인데 화면은 하나. 최신 상태만 표시하면 "입력 대기" 신호가 덮임
    concern: 여러 작업 중 지금 무엇을 보여줄지
    solution: 작업 상태별 우선순위와 TTL 지정, 중요한 신호만 MQTT QoS 1로 발행
    result: 작업이 몰려도 응답이 필요한 작업이 항상 화면에 표시됨
---
