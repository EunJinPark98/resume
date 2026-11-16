import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "starinvite",
    name: "별빛 초대장",
    tagline: "AI를 활용해 아이디어를 실제 운영 중인 웹서비스로 만든 경험",
    period: "2026.06 – 운영 중",
    status: "운영 중",
    team: "개인 프로젝트",
    role: "기획 · AI 활용 개발 · 코드 검토 · 테스트 · 배포 · 운영",
    purpose:
      "결혼식·돌잔치·칠순·생일 초대장을 템플릿을 고르고 내용만 채우면 만들 수 있는 모바일 초대장 서비스입니다. 하객은 카카오톡 링크 하나로 초대장을 봅니다.",
    featured: true,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
    keyFeatures: [
      "종류별 템플릿 24종, 입력 즉시 반영되는 실시간 미리보기",
      "사진 업로드(브라우저 압축) · 카카오/네이버 로그인",
      "카카오톡 공유 링크 · 행사 다음 날 데이터 자동 삭제",
    ],
    problems: [
      {
        title: "Supabase가 지원하지 않는 네이버 로그인",
        body: "서버 라우트에서 네이버 OAuth로 사용자를 확인한 뒤 Supabase 세션을 만드는 방식으로 연동했습니다.",
      },
      {
        title: "개인정보를 오래 보관하지 않기",
        body: "Vercel Cron이 매일 행사가 끝난 초대장의 데이터와 사진을 삭제하도록 했습니다.",
      },
      {
        title: "운영 중 보안 점검",
        body: "업로드 API에 로그인 검사와 횟수 제한을 추가하고, 스토리지 목록 조회를 막았습니다.",
      },
      {
        title: "사용자 유입",
        body: "검색엔진 등록과 SEO 개선으로 주요 검색어 상위에 노출되었고, 한 달 만에 이용자 100명을 넘었습니다.",
      },
    ],
    userProblem: [
      "결혼식뿐 아니라 백일·돌잔치·칠순·생일 같은 가족 행사에도 쓸 수 있는 모바일 초대장을, 템플릿을 고르고 내용만 채워 만들 수 있어야 했습니다.",
      "초대받는 사람은 앱 설치 없이 카카오톡 링크 하나로 일정·장소·연락처를 바로 확인할 수 있어야 했습니다.",
      "가족 사진과 개인정보가 담기는 만큼, 행사가 끝난 뒤에도 데이터가 남아 있지 않아야 했습니다.",
    ],
    architecture: [
      { layer: "화면", items: ["Next.js App Router", "편집 화면 · 초대장 보기(/v/[slug]) · 마이페이지 · 운영 현황"] },
      { layer: "서버", items: ["Next.js Route Handler", "초대장 저장 · 사진 업로드 · 회원 탈퇴 · 네이버 로그인 콜백"] },
      { layer: "데이터", items: ["Supabase PostgreSQL (RLS)", "Supabase Auth", "Supabase Storage (사진)"] },
      { layer: "배포", items: ["Vercel", "Vercel Cron — 매일 00:30(KST) 만료 데이터 정리"] },
    ],
    techChoices: [
      { name: "Next.js", use: "화면과 서버 API를 한 프로젝트에서 관리하고, 초대장 링크마다 카카오톡 공유 미리보기(OG)를 서버에서 생성" },
      { name: "Supabase", use: "DB · 로그인 · 사진 저장소를 함께 사용하고, RLS로 본인 데이터만 접근하도록 제한" },
      { name: "Vercel", use: "GitHub 연동 배포와 Cron으로 만료 데이터 자동 삭제" },
      { name: "TypeScript", use: "초대장 종류별로 다른 입력 데이터를 타입으로 구분" },
    ],
    operations: [
      { title: "정리 작업이 작성 중인 사진까지 지우던 문제", body: "미사용 사진을 하루 만에 지우다 보니 ‘이어서 작성’ 시 사진이 깨졌습니다. 이어 쓸 수 있는 기간(7일)이 지난 사진만 지우도록 기준을 바꿨습니다." },
      { title: "정리 작업이 멈춰도 알 수 없던 문제", body: "정리 작업이 실행될 때마다 시각을 기록하고, 이틀 넘게 실행되지 않으면 운영 현황 화면에 경고가 뜨게 했습니다." },
      { title: "로그인 없이 가능하던 사진 업로드", body: "업로드 API에 로그인 검사와 횟수 제한(10분 100장)을 추가하고, 저장소의 파일 목록 조회를 막았습니다." },
      { title: "받침 없는 이름 뒤 조사 오류", body: "이름의 받침 유무에 따라 조사가 달라지도록 문구 처리를 고쳤습니다." },
    ],
    aiWorkflow: [
      "기능을 작은 단위로 나눠 요구사항과 제약을 정리",
      "Claude Code에 구현을 지시",
      "생성된 코드를 읽고 의도와 다른 부분을 수정 요청",
      "모바일 실기기로 동작 확인",
      "PR 단위로 반영 (PR #1 ~ #113)",
    ],
    contribution: {
      mine: [
        "서비스 기획과 요구사항 정의",
        "기능 단위 작업 지시, AI가 만든 코드 검토·수정",
        "모바일 실기기 테스트, 배포와 운영",
        "운영 중 보안 · 데이터 정리 문제 점검과 개선 방향 결정",
        "SEO와 사용자 유입 개선",
      ],
      ai: ["구현 코드의 상당 부분 작성 (Claude Code)"],
    },
    sections: [],
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
      { src: "images/starinvite-categories.webp", alt: "결혼, 돌잔치, 칠순, 생일 초대장 템플릿 예시", width: 1600, height: 664, caption: "종류별 템플릿" },
    ],
  },
];
