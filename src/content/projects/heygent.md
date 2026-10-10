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
    solution:
      - "회상 판단: LLM이 회상 여부와 검색 필터(기억 종류, 범위)를 정하고, 타임아웃이나 실패 시 규칙 기반 판단으로 폴백"
      - "검색: pgvector 코사인 거리로 상위 5건 조회, SQL 조건으로 만료·비활성·저신뢰 기억 제외"
      - "주입: <memory-context> 태그 안에 종류·신뢰도·본문만 넣고(본문 500자, 요약 200자), \"현재 요청과 충돌하면 현재 요청 우선\" 규칙을 함께 명시"
    result: 질문 18개 중 관련 있는 6개에만 주입, 만료 기억 노출 0건, 검색 평균 23.57ms
  - title: 불러온 기억이 실제로 쓰였는지 판정
    problem: 불러온 기억이 답변에 쓰였는지 알 수 없어 유용한 기억을 가려낼 수 없음
    concern: 토큰 겹침만으로는 표현이 바뀌면 놓치고, 주제어만 같아도 쓰인 것으로 판정
    solution:
      - "1차 휴리스틱: 기억과 답변의 토큰이 2개 이상 겹치거나 문구가 그대로 들어가면 사용으로 판정"
      - "2차 LLM 검증: 기억과 답변을 주고 기억별 사용 점수를 JSON으로 받아, 두 판정 중 높은 점수 채택. 3초 타임아웃 시 1차 결과로 폴백"
      - "기록: (기억, 사용자, 작업 ID) 조합이 이미 있으면 건너뛰어 멱등 보장, 판정 결과는 프론트 디버그 패널에 표시"
    result: 답변마다 어떤 기억이 회상되고 쓰였는지 화면에서 확인, 기억별 사용 통계 확보와 중복 집계 차단
    image: ../../assets/projects/heygent-memory-usage.webp
    imageCaption: 사용 기억 추적 흐름과 디버깅 계층
  - title: 기억 일괄 저장이 통째로 롤백되는 문제
    tag: Trouble Shooting
    problem: 여러 기억 후보가 같은 레코드를 수정 대상으로 지정해 정합성 오류 발생, 배치 트랜잭션 전체 롤백
    concern: 같은 대상을 수정하려는 후보 중 무엇을 반영할지
    solution:
      - "AI 서버: 후보를 순서대로 처리하며 수정한 대상 ID를 Set에 기록, 대상이 겹치는 후보는 건너뛰고 건수를 로그로 남김"
      - "백엔드: 일괄 저장 API에서도 같은 방식으로 대상 ID를 확인해 중복 수정 요청 무시"
    result: 후보 1건의 충돌이 배치 전체 롤백으로 이어지지 않음
  - title: 화면 하나에 여러 작업 표시하기
    problem: 동시 작업은 여러 개인데 화면은 하나. 최신 상태만 표시하면 "입력 대기" 신호가 덮임
    concern: 여러 작업 중 지금 무엇을 보여줄지
    solution:
      - "표시 대상 선택: 입력 대기(30분) > 시작·완료(2~3초) > 버튼으로 고른 작업(15초) > 첫 진행 작업 순으로 우선순위 지정"
      - "우선권 해제: 표시 대상을 Redis에 TTL과 함께 저장해, 만료되면 우선권이 풀리고 다음 순위 적용"
      - "발행: 대기·완료·실패 신호는 MQTT QoS 1, 진행 신호는 QoS 0으로 차등 발행"
    result: 작업이 몰려도 응답이 필요한 작업이 항상 화면에 표시됨
---
