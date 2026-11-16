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
    contribution: {
      mine: [
        "서비스 기획과 요구사항 정의",
        "기능 단위 작업 지시, AI가 만든 코드 검토·수정",
        "모바일 실기기 테스트, 배포와 운영",
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
