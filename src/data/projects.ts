import type { OtherProject, Project } from "./types";

export const projects: Project[] = [
  {
    slug: "starinvite",
    name: "별빛 초대장",
    tagline: "AI를 활용해 아이디어를 실제 운영 중인 웹서비스로 만든 경험",
    period: "2026.06 – 운영 중",
    status: "운영 중",
    team: "개인 프로젝트",
    role: "기획 · 요구사항 정의 · AI 활용 개발 · 코드 검토 · 테스트 · 배포 · 운영",
    purpose:
      "결혼식·백일·돌잔치·칠순·생일 초대장을 템플릿을 고르고 내용만 채우면 만들 수 있는 모바일 초대장 제작 서비스입니다. 하객은 앱 설치 없이 카카오톡 링크 하나로 초대장을 봅니다.",
    featured: true,
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Supabase Auth · Storage", "Vercel", "Vercel Cron", "Claude Code"],
    keyFeatures: [
      "4가지 초대장 종류 · 종류별 전용 템플릿 24종",
      "입력 즉시 반영되는 실시간 미리보기 (모바일은 미니 미리보기)",
      "대표 사진 + 갤러리 최대 19장, 브라우저에서 압축 후 업로드 · 드래그 정렬",
      "카카오 · 네이버 로그인, 마이페이지에서 수정 · 삭제 · 회원 탈퇴",
      "고유 짧은 링크 발급과 카카오톡 공유 미리보기(OG)",
      "네이버지도 · 카카오맵 길찾기, 계좌 안내, D-day 카운트다운, 배경음악",
      "행사 다음 날 비공개 → 매일 00:30(KST) DB 행과 사진 자동 삭제",
    ],
    problems: [
      {
        title: "Supabase가 지원하지 않는 네이버 로그인",
        body: "서버 라우트에서 네이버 OAuth 토큰으로 프로필을 조회하고, 서버 권한으로 사용자를 확보한 뒤 일회용 토큰을 검증해 Supabase 쿠키 세션을 만드는 흐름으로 연동했습니다. 실패 시 어느 단계에서 실패했는지 남기도록 했습니다.",
      },
      {
        title: "가족 사진과 개인정보를 오래 보관하지 않기",
        body: "게시 기간을 행사 당일까지로 자동 결정하고, Vercel Cron이 매일 만료 초대장의 DB 행과 사진을 삭제하게 했습니다. 이어서 작성할 수 있는 기간(7일)이 지난 미사용 사진만 지우도록 기준을 바로잡아, 작성 중인 사용자의 사진이 깨지는 문제를 막았습니다.",
      },
      {
        title: "운영 관점의 보안 · 안정성 점검",
        body: "업로드 API에 로그인 검사와 횟수 제한(10분 100장)을 추가하고, 스토리지 목록 조회 정책을 내려 파일 이름을 훑을 수 없게 했습니다. 정기 정리 작업의 실행 시각을 기록해 이틀 넘게 실행되지 않으면 운영 화면에 경고가 뜨게 했습니다.",
      },
      {
        title: "만들었는데 아무도 오지 않는 문제",
        body: "검색엔진에 사이트를 등록하고 canonical · 구조화 데이터 등 SEO를 개선했으며, 실제 검색할 만한 키워드로 블로그 콘텐츠를 작성했습니다. ‘팔순잔치 초대장 만들기’, ‘백일 초대장’ 등의 검색어에서 상위에 노출되기 시작했고, 한 달 만에 이용자 100명을 넘었습니다.",
      },
    ],
    contribution: {
      mine: [
        "서비스 기획과 요구사항 정의 — 초대장 종류, 입력 항목, 템플릿 구성, 데이터 보관 기간 정책",
        "UI/UX 방향 결정과 화면 흐름 설계, 문구 검수",
        "기능 단위로 작업을 쪼개 AI에 지시하고, 생성된 코드를 읽고 검토·수정",
        "실기기(모바일) 테스트와 버그 재현 · 수정 요청",
        "Supabase · Vercel · 카카오/네이버 개발자 설정, 도메인 연결과 배포",
        "SEO, 검색엔진 등록, 블로그 홍보 등 운영과 사용자 유입 개선",
      ],
      ai: [
        "구현 코드의 상당 부분 초안 작성 (Claude Code)",
        "리팩터링과 버그 수정 코드 제안",
      ],
      note: "구현 코드의 많은 부분은 AI가 작성했습니다. 저는 무엇을 왜 만들지 정하고, 결과물을 검토·테스트해 배포하고, 운영하며 생긴 문제를 다시 개선 과제로 만드는 역할을 했습니다. 약 190개 커밋 · 110여 개 PR 단위로 기능을 나눠 반영했습니다.",
    },
    sections: [
      {
        heading: "데이터 · 계정 정책",
        items: [
          "종류마다 1개씩, 계정당 최대 4개 제작",
          "행사 날짜는 오늘 이후만 — 입력 · 저장 · 서버에서 각각 검사",
          "브라우저를 닫거나 24시간이 지나면 자동 로그아웃",
          "임시저장은 서버로 보내지 않고 브라우저에 7일간만 보관",
        ],
      },
    ],
    retrospective: [
      "AI가 코드를 빠르게 만들어 줄수록, 요구사항을 정확히 정의하고 결과를 검증하는 사람의 몫이 더 커진다는 것을 배웠습니다.",
      "기능을 만드는 것만으로는 사용자가 오지 않았습니다. 사용자가 서비스에 도달하는 과정까지 설계해야 한다는 것을 운영하면서 알게 됐습니다.",
    ],
    links: [
      { label: "Live", href: "https://letter.byeolmamapapa.com/" },
      { label: "GitHub", href: "https://github.com/EunJinPark98/wedding-invite" },
    ],
    image: {
      src: "images/starinvite-editor.webp",
      srcSmall: "images/starinvite-editor-800.webp",
      alt: "별빛 초대장 편집 화면. 왼쪽에 템플릿 선택 폼, 오른쪽에 휴대폰 모양의 실시간 미리보기가 보인다.",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "images/starinvite-landing.webp", alt: "별빛 초대장 첫 화면", width: 1600, height: 1000, caption: "랜딩 — ‘무료로 제작하기’와 템플릿 둘러보기" },
      { src: "images/starinvite-categories.webp", alt: "결혼, 돌잔치, 칠순, 생일 초대장 템플릿 예시", width: 1600, height: 664, caption: "종류별 템플릿 — 클래식 · 색동 · 한지 · 네온 나이트" },
    ],
  },
  {
    slug: "greenmoa",
    name: "GREEN MOA",
    tagline: "WebSocket으로 같은 교실에 있는 듯한 실시간 커뮤니티",
    period: "2023.10 – 2023.11",
    status: "교육과정 팀 프로젝트",
    team: "4인 팀 (리더 1 · 프론트엔드 1 · 백엔드 2)",
    role: "팀 리더 · 기획 및 일정 관리 · 실시간 채팅/접속 상태/아바타 이동 구현",
    purpose:
      "그린아카데미 교육과정에서 진행한 메타버스형 학급 커뮤니티입니다. 같은 클래스룸에 접속한 사람들이 아바타(미니미)를 움직이고 채팅하며 쪽지·일정·과제·게시판을 함께 쓰도록 만들었습니다.",
    featured: true,
    stack: ["Java", "Spring Boot", "Spring WebSocket", "Spring Security", "MyBatis", "Oracle", "Thymeleaf", "JavaScript", "jQuery"],
    keyFeatures: [
      "클래스룸 — 아바타 이동, 실시간 채팅, 접속/비접속 표시, 쪽지, 일정, 과제",
      "마이룸 — 투두리스트, 상태 메시지, 북마크",
      "게시판 — 공지사항, 질문 · 자유게시판",
      "로그인 / 회원가입 (Spring Security)",
    ],
    problems: [
      {
        title: "여러 종류의 실시간 이벤트를 하나의 연결로",
        body: "채팅, 접속, 접속 해제, 아바타 이동을 각각 다른 연결로 두지 않고 하나의 WebSocket 연결에서 JSON 메시지의 키(content · connectId · disConnectId · moveId)로 구분해, 받은 쪽에서 종류별로 화면을 갱신하도록 했습니다.",
      },
      {
        title: "STOMP 브로커에서 WebSocketConfigurer로 전환",
        body: "처음에는 STOMP 메시지 브로커 방식으로 시작했지만, 단일 클래스룸에 필요한 기능 범위에서는 구조가 과하다고 보고 TextWebSocketHandler를 직접 등록하는 방식으로 바꿨습니다. 세션은 ConcurrentHashMap으로 관리했습니다.",
      },
      {
        title: "팀 리더로서의 협업 방식",
        body: "역할 분담과 진행 상황, 회의 내용을 노션에 모두 공유하고 GitHub PR로 코드를 합쳤습니다. 약 5주 동안 기획부터 발표까지 일정을 관리했습니다.",
      },
    ],
    sections: [],
    retrospective: [
      "지금 다시 만든다면, 모든 메시지를 전체 세션에 브로드캐스트하는 대신 클래스룸 단위로 세션을 나누고, 서버에서 메시지 형식과 발신자를 검증하겠습니다.",
      "접속 상태를 사용자 이벤트(스크롤 · 마우스 이동)마다 보내던 부분은 주기적인 heartbeat로 바꿔 불필요한 메시지를 줄이겠습니다.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/EunJinPark98/GREENMOA" },
      { label: "프로젝트 소개 (Notion)", href: "https://eunjin-park.notion.site/GREEN-MOA-1bf4f3c360d34e57af6f3a2c796e0664" },
    ],
    diagram: "websocket",
  },
  {
    slug: "eungaetalk",
    name: "응애톡",
    tagline: "브라우저 안에서만 동작하는 아기 울음 분석 실험 — 결과보다 검증을 먼저",
    period: "2026.10",
    status: "개인 프로젝트 · 실험",
    team: "개인 프로젝트",
    role: "기획 · 구현 · 검증 설계 · 결과 기반 의사결정",
    purpose:
      "카메라와 마이크로 아기를 지켜보며, 울음소리를 감지하면 실험적으로 울음 원인 후보를 보여주는 웹앱입니다. 영상과 소리는 브라우저 밖으로 나가지 않고, 녹음 파일로 저장되지도 않습니다.",
    featured: true,
    stack: ["TypeScript", "Web Audio (AudioWorklet)", "Web Worker", "MediaPipe YAMNet (WASM)", "esbuild", "Node.js 테스트 스크립트"],
    keyFeatures: [
      "AudioWorklet으로 3.072초 창 · 1.536초 간격의 오디오 수집",
      "16kHz 리샘플링, DC 제거, 품질 게이트, -23 dBFS 정규화",
      "YAMNet으로 울음 여부를 먼저 거르고, 울음일 때만 원인 분류 모델 실행",
      "전용 Worker에서 추론 — 이전 추론이 끝나지 않았으면 쌓지 않고 버림",
      "점수 · 1, 2위 차이가 기준 미달이면 ‘불확실’로 처리, 연속 2회 일치해야 결과 갱신",
    ],
    problems: [
      {
        title: "모델이 할 수 없는 일을 화면이 약속하지 않게",
        body: "모델이 개별 아기의 요구를 정확히 번역할 수 없다는 점을 문서와 화면에 명시했습니다. 낮은 확신의 결과는 보여주지 않고, 겹치는 두 구간이 같은 결과를 낼 때만 갱신해 화면이 깜빡이지 않게 했습니다.",
      },
      {
        title: "더 큰 모델이 항상 더 나은가",
        body: "공개 데이터셋(ESC-50)에서 울음 80구간 · 비울음 144구간을 고정해 탐지 모델을 비교했습니다. 큰 YAMNet은 울음을 57구간 감지했지만 고양이 소리를 울음으로 3번 오판했고, 현재 모델은 53구간 · 오판 0회였습니다. 오탐과 다운로드 크기를 고려해 교체를 보류하고 그 근거를 기록했습니다.",
      },
      {
        title: "개선처럼 보이는 변경을 운영에서 분리",
        body: "새 저역통과 필터는 합성 신호 시험은 통과했지만 실제 녹음에서 감지 수가 줄었습니다(55 → 53). 그래서 평가 스크립트로 격리하고 운영 Worker에는 넣지 않았습니다.",
      },
    ],
    sections: [
      {
        heading: "검증 방식",
        items: [
          "실제 배포용 Worker · WASM · 모델 가중치로 실행하는 런타임 테스트",
          "무음 · 잡음 · 불확실 · 오류 · 분석 끄기 · 종료 이후 상태 유지 라이프사이클 테스트",
          "모델 · 전처리 비교 결과와 입력 파일 해시를 JSON으로 남겨 재현 가능하게 기록",
          "임계값을 결과에 맞춰 조정하지 않음 — 표본 수치를 실사용 정확도로 일반화하지 않는다고 명시",
        ],
      },
    ],
    retrospective: [
      "정확도를 숫자 하나로 주장하기보다, 무엇을 측정했고 무엇을 측정하지 못했는지를 함께 남기는 것이 더 신뢰할 수 있는 결과물이라고 생각합니다.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/EunJinPark98/baby-crying-translator" }],
    diagram: "audio-pipeline",
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: "별별 작명소",
    period: "2026.08 –",
    summary: "부모 이름의 뜻을 이어받는 아이 이름 짓기 서비스. 공유용 결과 카드 이미지를 서버리스 함수에서 생성. AI 코딩 도구 활용.",
    stack: ["JavaScript", "Vercel Functions", "Canvas"],
    links: [
      { label: "Live", href: "https://naming.byeolmamapapa.com/" },
      { label: "GitHub", href: "https://github.com/EunJinPark98/star-naming" },
    ],
  },
  {
    name: "아기별 지도",
    period: "2026.09 –",
    summary: "생년월일로 월령을 계산해 시기별 발달 · 이유식 · 예방접종 정보를 보여주는 가이드. 콘텐츠는 관리자 페이지에서 DB로 관리, 핵심 로직은 Vitest로 테스트. AI 코딩 도구 활용.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vitest"],
    links: [{ label: "GitHub", href: "https://github.com/EunJinPark98/baby-dictionary" }],
  },
  {
    name: "3D 레이아웃 편집기 (Three.js)",
    period: "2025.06",
    summary: "3D 공간에 박스를 배치 · 연결 · 이동하고 라벨을 붙이는 편집기 프로토타입. React Three Fiber로 화면을, Spring Boot API로 데이터 연동을 시도.",
    stack: ["React", "Three.js", "React Three Fiber", "Spring Boot", "JPA"],
    links: [{ label: "GitHub", href: "https://github.com/EunJinPark98/threejs-app" }],
  },
  {
    name: "가족 성장 앨범",
    period: "2026.06 –",
    summary: "월별 사진 · 영상 앨범과 방명록. 관리자 업로드, 표시용 이미지를 서버에서 생성. AI 코딩 도구 활용.",
    stack: ["React", "Vite", "Cloudflare Workers", "R2", "KV"],
    links: [{ label: "GitHub", href: "https://github.com/EunJinPark98/inonestar" }],
  },
  {
    name: "별마마파파",
    period: "2026.08 –",
    summary: "위 서비스들을 묶는 브랜드 홈페이지. 정적 사이트 + GitHub Actions 배포, 구조화 데이터 등 SEO 적용.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Actions"],
    links: [{ label: "Live", href: "https://byeolmamapapa.com/" }],
  },
];
