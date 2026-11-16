import type { Certification, SkillGroup } from "./types";

/** 숙련도 점수 대신 ‘어디서 썼는지’를 적는다. 실무 / 개인 프로젝트 / 학습을 구분한다. */
export const skillGroups: SkillGroup[] = [
  {
    id: "work",
    title: "실무",
    caption: "통행료 대국민 웹서비스에서 직접 사용",
    rows: [
      { name: "Java", where: "서버 기능 개발, 일괄 보완 기능, 접근 차단 Filter" },
      { name: "Spring MVC", where: "Controller · Service 개발, 스케줄러, 트랜잭션 처리" },
      { name: "JSP · JavaScript · jQuery", where: "화면 기능 구현과 비동기 처리" },
      { name: "iBATIS", where: "SQL 매핑, 조회 쿼리 분리" },
      { name: "Oracle · Tibero", where: "SQL 작성과 대량 조회 구조 개선" },
      { name: "Tomcat", where: "WAS 운영 환경, 당직 모니터링" },
    ],
  },
  {
    id: "project",
    title: "개인 프로젝트",
    caption: "별빛 초대장 · 이 홈페이지",
    rows: [
      { name: "Next.js · React", where: "App Router 화면, Route Handler API" },
      { name: "TypeScript", where: "별빛 초대장, 이 홈페이지" },
      { name: "Supabase", where: "PostgreSQL · Auth · Storage, RLS 정책" },
      { name: "Vercel", where: "배포, Cron으로 만료 데이터 정리" },
      { name: "Git · GitHub", where: "PR 단위 개발, GitHub Actions 배포" },
      { name: "Claude Code", where: "기능 단위 구현 지시와 결과 코드 검토" },
    ],
  },
  {
    id: "study",
    title: "학습 · 경험",
    caption: "교육과정과 학습 프로젝트",
    rows: [
      { name: "Spring Boot · MyBatis", where: "교육과정 팀 프로젝트" },
      { name: "Spring Security", where: "교육과정 팀 프로젝트의 로그인 처리" },
      { name: "WebSocket", where: "교육과정 팀 프로젝트의 실시간 채팅" },
      { name: "Three.js", where: "3D 화면 학습 프로젝트" },
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
