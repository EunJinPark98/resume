import type { Experience, TimelineEntry } from "./types";

export const experience: Experience = {
  company: "(주)아이티포워드",
  period: "2023.12 – 현재",
  role: "Java 웹 개발자 · 풀스택",
  project: "통행료플랫폼서비스 유지관리",
  client: "한국도로공사",
  intro: "전국 고속도로 통행료 대국민 웹서비스의 개발과 운영을 맡고 있습니다.",
  responsibilities: [
    "Java · Spring(전자정부프레임워크) · JSP · iBATIS 기반 기능 개발 및 개선",
    "Oracle · PostgreSQL · Tibero SQL 작성 및 튜닝",
    "보안 취약점 대응, 장애 대응 및 서버 모니터링",
  ],
  highlights: [
    { text: "월말 반복 서버 장애·재기동을 SQL 구조 개선으로 해소" },
    { text: "로그인 민원 하루 약 5건 → 주 1건 미만" },
    { text: "로그인 실패 IP 자동 차단 기능 구현" },
  ],
  stack: ["Java", "Spring", "JSP", "iBATIS", "SQL", "Oracle", "PostgreSQL", "Tibero", "JavaScript"],
};

/** 날짜가 확인된 항목만 타임라인에 둔다. */
export const timeline: TimelineEntry[] = [
  {
    period: "2023.12 – 현재",
    title: "Java 웹 개발자 · 풀스택",
    org: "(주)아이티포워드 — 한국도로공사 통행료플랫폼서비스",
    kind: "work",
    current: true,
    description: "대국민 통행료 웹서비스 개발·운영.",
  },
  {
    period: "2026.06 – 운영 중",
    title: "별빛 초대장 기획 · 개발 · 운영",
    org: "개인 프로젝트 (업무 외)",
    kind: "project",
    description: "Next.js · Supabase 기반 모바일 초대장 제작 서비스.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
  },
];
