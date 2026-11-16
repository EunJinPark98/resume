import type { Certification, SkillGroup } from "./types";

/** 숙련도 퍼센트·별점은 쓰지 않는다. 대신 ‘어디서 썼는지’를 적는다. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Core",
    caption: "실무에서 사용",
    rows: [
      { name: "Java · Spring", where: "통행료 웹서비스 서버 개발, Filter · 스케줄러, 트랜잭션" },
      { name: "SQL · iBATIS", where: "Oracle · PostgreSQL · Tibero 쿼리 작성과 튜닝" },
      { name: "JSP · JavaScript", where: "화면 기능 구현, jQuery · AJAX" },
    ],
  },
  {
    title: "Project",
    caption: "개인 프로젝트에서 사용",
    rows: [
      { name: "React · Next.js · TypeScript", where: "별빛 초대장, 이 홈페이지" },
      { name: "Supabase", where: "PostgreSQL · Auth · Storage, RLS 정책" },
    ],
  },
  {
    title: "Tools",
    caption: "개발 · 배포",
    rows: [
      { name: "Git · GitHub", where: "PR 단위 개발과 버전 관리" },
      { name: "Tomcat · JEUS", where: "실무 WAS 운영, 당직 모니터링" },
      { name: "Vercel · GitHub Pages", where: "개인 서비스 배포" },
    ],
  },
];

export const certifications: Certification[] = [
  { name: "SQLD (SQL 개발자)", issuer: "한국데이터산업진흥원", status: "acquired" },
  { name: "컴퓨터활용능력 1급", issuer: "대한상공회의소", status: "acquired" },
  { name: "한국사능력검정시험 1급", issuer: "국사편찬위원회", status: "acquired" },
  { name: "운전면허 1종 보통", issuer: "도로교통공단", status: "acquired" },
  { name: "정보처리기사", issuer: "한국산업인력공단", status: "in-progress", note: "필기 합격 — 최종 자격 취득 전" },
];
