export const profile = {
  name: '김상지',
  position: 'BE / AI Developer',
  tagline: '보이지 않는 곳에서 신뢰를 만드는 백엔드 개발자',
  about: [
    '성공하는 장면보다 실패하는 장면을 먼저 떠올리고, 그 예외를 미리 막아 두는 것을 당연하게 여깁니다. AI의 가능성은 살리되 그 불확실성은 백엔드가 감당하는 설계를 지향합니다.',
    '기능은 현장에서 쓰이기 시작할 때 비로소 완성된다고 생각합니다. 그래서 제가 만든 서비스가 현장에 직접 닿아 피드백을 받고, 그 피드백으로 성장하는 엔지니어가 되고 싶습니다.',
  ],
  github: 'https://github.com/theundergroundt',
  // Profile 칸에 표시되는 항목. 줄을 추가하면 그대로 늘어난다. href 를 채우면 링크가 된다.
  details: [
    { label: 'Name', value: '김상지 (Sangji Kim)', href: '' },
    { label: 'Birth', value: '2001.01.08', href: '' },
    { label: 'Hobby', value: '풋살', href: '' },
    { label: 'Email', value: 'sam010842@gmail.com', href: 'mailto:sam010842@gmail.com' },
    { label: 'GitHub', value: 'github.com/theundergroundt', href: 'https://github.com/theundergroundt' },
  ],
};

// 기술 이름을 누르면 desc 가 카드로 펼쳐진다. color 를 적으면 눌렀을 때 그 색으로 표시된다 (없으면 연두).
export const skills = [
  {
    category: 'Language',
    items: [
      {
        name: 'Java',
        desc: '알고리즘 문제 풀이의 주 언어. 객체지향 설계로 상태 머신, 정산 로직 같은 도메인 규칙을 직접 구현할 수 있음',
      },
      { name: 'C++', desc: 'ESP32 펌웨어를 작성해 센서 입력과 화면 출력, 서버 통신을 제어할 수 있음' },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'Spring Boot',
        desc: '도메인별 패키지 구조로 REST API를 설계하고, 전역 예외 처리·트랜잭션·비동기 처리를 적용할 수 있음',
      },
      {
        name: 'Spring Security',
        desc: 'OAuth2 로그인과 JWT 인증을 구성하고, 토큰 교체·로그아웃 블랙리스트로 탈취 경로를 막을 수 있음',
      },
      {
        name: 'JPA / QueryDSL',
        desc: '연관관계와 생성 순서를 고려해 엔티티를 설계하고, 일괄 조회·저장으로 N+1 문제를 해결할 수 있음',
      },
      {
        name: 'WebSocket (STOMP)',
        desc: '실시간 채널을 만들고, 채널 인터셉터로 연결 시점에 JWT 인증을 적용할 수 있음',
      },
      { name: 'FastAPI', desc: 'OCR, 장기기억 같은 AI 기능을 별도 서버로 만들어 Spring 백엔드와 연동할 수 있음' },
    ],
  },
  {
    category: 'Database',
    items: [
      {
        name: 'MySQL', color: '#38bdf8',
        desc: '서비스 도메인을 테이블로 모델링하고, 일괄 처리를 한 트랜잭션으로 묶어 정합성을 지킬 수 있음',
      },
      {
        name: 'PostgreSQL', color: '#38bdf8',
        desc: 'pgvector로 AI 장기기억을 벡터로 저장하고, 유사도 검색으로 관련 기억을 찾아올 수 있음',
      },
      {
        name: 'Redis', color: '#ef4444',
        desc: '토큰 저장, 로그아웃 블랙리스트, 기기 페어링 세션처럼 만료 시간이 필요한 데이터에 활용할 수 있음',
      },
    ],
  },
  {
    category: 'IoT / Embedded',
    items: [
      {
        name: 'ESP32',
        desc: 'ESP32-C3에 자이로 센서, 터치 센서, 부저, OLED, 배터리 전원을 연결해 넘어짐 감지와 상태 표시 기기를 만들 수 있음',
      },
      {
        name: 'Arduino',
        desc: 'Arduino 환경에서 Wi-Fi 설정, 기기 페어링, MQTT 수신까지 펌웨어를 단계별로 개발할 수 있음',
      },
      {
        name: 'MQTT',
        desc: 'Spring 백엔드와 ESP32 기기를 MQTT로 연결하고, 신호 중요도에 따라 QoS를 나눠 발행할 수 있음',
      },
    ],
  },
];

export const tools = [
  {
    category: 'Infra',
    items: [
      { name: 'Docker', color: '#38bdf8', desc: 'Docker Compose로 MQTT 브로커(Mosquitto) 등 개발 환경을 구성할 수 있음' },
      { name: 'AWS Lambda', desc: '작업자별 Jira 이슈를 정리해 매일 정해진 시간에 Mattermost로 보내는 자동화를 Lambda 함수로 구성할 수 있음' },
    ],
  },
  {
    category: 'Collaboration',
    items: [
      { name: 'Git', color: '#f97316', desc: '커밋 규칙을 정하고 브랜치 단위로 협업할 수 있음' },
      { name: 'GitLab', color: '#f97316', desc: 'MR 템플릿을 만들어 코드 리뷰 흐름을 정리할 수 있음' },
      {
        name: 'Jira', color: '#38bdf8',
        desc: '번다운 차트로 팀 일정을 관리하고, 자동화 기능을 직접 커스텀해 이슈 처리 흐름을 자동화할 수 있음',
      },
      { name: 'Notion', desc: '회의록과 회고를 문서로 정리하고 팀과 공유할 수 있음' },
      {
        name: 'Mattermost', color: '#38bdf8',
        desc: '자동화를 연결해 회고 알림뿐 아니라 pull 알림, merge 요청 알림까지 채널로 보내도록 구성할 수 있음',
      },
    ],
  },
  {
    category: 'CAD',
    items: [
      { name: 'SolidWorks', desc: '3D 모델을 설계하고 출력한 경험이 있음' },
      { name: 'Fusion 360', desc: 'HeyGent 봇의 외형을 설계하고 제작함' },
    ],
  },
];

export const education = [
  { period: '2025.07 ~ 2026.06', name: '삼성 청년 SW·AI 아카데미 (SSAFY) 14기', note: '수료' },
  { period: '2021.03 ~ 2025.08', name: '부경대학교 의공학IT융합전공', note: '🎓 졸업' },
  { period: '2017.03 ~ 2020.02', name: '거제고등학교', note: '🎓 졸업' },
];

export const certifications = [
  { kind: '자격증', name: 'SQLD', date: '2026.09' },
  { kind: '자격증', name: 'ADsP', date: '2024.09' },
  { kind: '영어', name: 'TOEIC Speaking (IH/150)', date: '2026.02' },
];

export const awards = [
  { period: '2026.03', name: 'SSAFY 14기 2차 프로젝트 (Piview)', result: '🏆 우수상 (1위)' },
  { period: '2025.07 ~ 2026.06', name: '삼성 청년 SW·AI 아카데미 (SSAFY) 14기', result: '활동' },
  { period: '2025.02', name: '지역현안 캡스톤디자인 경진대회', result: '🏆 장려상' },
  { period: '2022.11 ~ 2024.02', name: '지능형 로봇 분야 서포터즈', result: '활동' },
  { period: '2023.12', name: '부경대학교 LINC 3.0 캡스톤디자인 단과대학 경진대회', result: '🏆 우수상' },
  { period: '2023.11', name: '제11회 K-해커톤 대회', result: '🏆 우수상' },
  { period: '2022.12', name: '제2회 디지털 혁신공유대학 메타버스 콘테스트', result: '🏆 협의회장상' },
  { period: '2021.12', name: '부경대학교 첨단 바이오 메디컬 미래 기술 챌린지 공모전', result: '🏆 은상' },
];
