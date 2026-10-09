---
title: HeyGent
summary: 사용자 요청을 여러 단계·도구로 실행하는 AI 오케스트레이션 플랫폼
start: "2026-04"
period: 2026.04 ~ 2026.05
duration: 5주
team: 7명
role: AI / IoT / JiraOps
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
  summary: 백엔드 팀장 (AI / IoT / JiraOps) — 장기기억 시스템, IoT 디스플레이 담당
  items:
    - Python AI 서버와 Java 백엔드에 걸친 장기기억 저장·회상 구현
    - MQTT 기반 기기 표시 파이프라인 구현, ESP32 펌웨어 개발
    - 기기 외형 3D 모델 설계·출력
    - Jira 이슈·일정 관리, Git 컨벤션 수립
    - Notion–n8n–Mattermost 회고 자동화 구축
works:
  - title: 장기기억 시스템
    did:
      - 기억 저장 흐름(추출 → 중복 시 갱신, 만료 시 폐기)과 회상 흐름(선별 → 답변 반영 → 사용 여부 기록) 설계
      - Python AI 서버와 Java 백엔드에 걸쳐 구현, 저장소는 PostgreSQL + pgvector 사용
    why: 대화를 쌓아 두기만 하면 낡은 기억이 오답을 만들고, 회상한 기억이 실제로 쓰였는지 확인할 수 없음
    result:
      - 기억 검색 API 평균 23.57ms, 기억 활성화에 따른 응답 시간 차이 1% 미만
      - 질문 18개 중 관련 있는 6개에만 기억 주입, 만료 기억 노출 0건
  - title: IoT 디스플레이 파이프라인
    did: AI 작업 상태를 MQTT로 ESP32 기기 화면에 표시하는 파이프라인 구현, 우선순위와 유지 시간으로 표시 대상을 정하는 규칙 설계
    why: 동시 작업은 여러 개인데 화면은 1개라, 최신 상태만 표시하면 "입력 대기" 신호가 덮여 작업이 멈춘 채 방치됨
    result: 입력 대기를 최우선으로 표시하고, 표시 실패가 AI 실행에 영향을 주지 않도록 분리
  - title: 대화가 몰릴 때 기억 추출이 누락되는 문제
    tag: Trouble Shooting
    did: 기억용 LLM 호출에 지수 백오프 재시도 적용, 기억 장애가 답변 실패로 번지지 않도록 분리
    why: 대화량 증가 시 기억 추출 실패 반복. 로그 추적 결과 외부 LLM API의 요청 한도 초과(429)가 원인
    result: 한도 초과 시 재시도로 추출 지속, 외부 API 중단 시에도 답변 정상 반환
  - title: 기억 일괄 저장이 통째로 롤백되는 문제
    tag: Trouble Shooting
    did: AI 서버에서 수정 대상이 겹치는 후보를 사전 제외하고, 백엔드에서도 중복 수정을 무시하도록 이중 방어
    why: 여러 기억 후보가 같은 기존 기억을 수정 대상으로 지정해 정합성 오류 발생, 묶음 전체 저장 실패
    result: 후보 1건의 충돌이 묶음 전체 저장 실패로 이어지지 않음
---
