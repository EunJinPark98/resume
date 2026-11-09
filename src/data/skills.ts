import type { Certification, SkillGroup } from "./types";

/** 숙련도 퍼센트·별점은 쓰지 않는다. 대신 ‘어디서 썼는지’를 적는다. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Core",
    caption: "실무에서 매일 쓰는 기술",
    rows: [
      { name: "Java", where: "통행료 웹서비스 서버 개발 · 일괄 보완 기능 · 접근제어 Filter" },
      { name: "Spring · 전자정부프레임워크", where: "Controller · Service 계층 개발, Filter · 스케줄러, 트랜잭션 처리" },
      { name: "SQL", where: "Oracle · PostgreSQL · Tibero 쿼리 작성과 튜닝, 대량 조회 구조 개선" },
      { name: "iBATIS", where: "SQL 매핑, 조회 쿼리 분리 작업" },
      { name: "JSP · JavaScript", where: "화면 기능 구현, jQuery · AJAX 비동기 처리" },
    ],
  },
  {
    title: "Project",
    caption: "개인 · 팀 프로젝트에서 사용",
    rows: [
      { name: "React · Next.js", where: "별빛 초대장(App Router, Route Handler), 아기별 지도" },
      { name: "TypeScript", where: "별빛 초대장, 응애톡(Worker · AudioWorklet), 이 홈페이지" },
      { name: "Spring Boot · WebSocket", where: "GREEN MOA 실시간 채팅 · 접속 상태 · 아바타 이동" },
      { name: "Supabase (PostgreSQL · Auth · Storage)", where: "별빛 초대장 데이터 저장, RLS 정책, 소셜 로그인, 사진 저장" },
      { name: "MyBatis · Spring Security", where: "GREEN MOA" },
    ],
  },
  {
    title: "Tools · Infra",
    caption: "개발 · 배포 · 협업",
    rows: [
      { name: "Git · GitHub", where: "개인 프로젝트 PR 단위 개발, 팀 프로젝트 협업" },
      { name: "SVN", where: "보안 환경 내 형상관리 서버 구축 및 운영" },
      { name: "Tomcat · JEUS", where: "실무 WAS 운영 환경, 당직 모니터링" },
      { name: "Vercel · Cloudflare · GitHub Pages", where: "개인 서비스 배포, Cron 작업, 정적 사이트 배포" },
      { name: "Claude Code (AI)", where: "요구사항을 작업 단위로 나눠 구현 지시, 결과 코드 검토 · 테스트" },
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
