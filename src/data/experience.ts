import type { CaseStudy, Experience, TimelineEntry } from "./types";

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
    { text: "월말 반복 서버 장애·재기동을 SQL 구조 개선으로 해소", caseId: "case-bulk-query" },
    { text: "로그인 민원 하루 약 5건 → 주 1건 미만", caseId: "case-login-data" },
    { text: "로그인 실패 IP 자동 차단 기능 구현", caseId: "case-ip-block" },
    { text: "카드번호 마스킹을 Controller 단계로 옮겨 개인정보 노출 위험 개선", caseId: "case-masking" },
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

export const caseStudies: CaseStudy[] = [
  {
    id: "case-bulk-query",
    no: "01",
    title: "월말 대용량 조회 장애 개선",
    summary: "매월 말 반복되던 서버 장애와 재기동을 조회 구조 개선으로 해결했습니다.",
    featured: true,
    situation: ["월말마다 대규모 렌터카 업체의 통행료 이용내역 대량 조회로 서버 장애와 재기동이 반복됐습니다."],
    cause: ["하나의 쿼리에 여러 조건과 처리가 얽혀, 화면에 당장 필요 없는 데이터까지 한 번에 조회·가공하고 있었습니다."],
    approach: ["쿼리를 목적별로 나누고, 화면에 즉시 필요한 데이터부터 조회하는 구조로 바꿨습니다."],
    implementation: [
      "복잡한 조회 쿼리를 목적별 쿼리로 분리",
      "화면에 필요한 데이터 중심으로 조회 구조 재구성",
      "불필요한 조건·처리 제거로 SQL 실행 비용 감소",
    ],
    result: ["적용 이후 같은 원인의 월말 장애·재기동이 재발하지 않았습니다."],
    before: "한 쿼리가 모든 데이터를 한 번에 조회 → 월말마다 장애·재기동",
    after: "목적별 쿼리 분리, 필요한 데이터 우선 조회 → 재발 없음",
    stack: ["SQL", "iBATIS", "Java", "Spring"],
  },
  {
    id: "case-login-data",
    no: "02",
    title: "로그인 누락 데이터 자동 보완",
    summary: "민원마다 손으로 고치던 데이터를 관리자가 한 번에 보완할 수 있게 만들었습니다.",
    featured: true,
    situation: ["중복·누락 데이터로 로그인 오류 민원이 하루 평균 약 5건 접수됐고, 매번 수동으로 수정하고 있었습니다."],
    cause: ["데이터 누락 흐름을 분석해, 로그인에 필요한 데이터가 빠진 대상을 조건으로 찾을 수 있음을 확인했습니다."],
    approach: ["민원 접수 전에 누락 대상을 찾아 한꺼번에 보완하고, 실패해도 데이터가 어긋나지 않게 하는 것을 목표로 했습니다."],
    implementation: [
      "누락 대상 조회 로직 작성",
      "관리자용 일괄 보완 기능 개발 (대상 반복 처리 · INSERT)",
      "트랜잭션으로 부분 반영 방지",
    ],
    result: ["로그인 관련 민원이 하루 약 5건에서 주 1건 미만으로 줄었습니다."],
    before: "민원마다 고객 데이터를 수동 수정 (하루 약 5건)",
    after: "누락 대상 일괄 보완 (트랜잭션 처리) → 주 1건 미만",
    stack: ["Java", "Spring", "SQL"],
  },
  {
    id: "case-ip-block",
    no: "03",
    title: "비정상 접근 IP 자동 차단",
    summary: "반복 로그인 실패를 차단하면서, 요청마다 DB를 조회하지 않도록 설계했습니다.",
    featured: true,
    situation: ["비정상 접근 차단이 필요했지만, 모든 요청에서 DB로 차단 여부를 확인하면 부하가 생길 수 있었습니다."],
    cause: ["차단 확인은 매 요청마다 일어나지만, 차단 목록은 자주 바뀌지 않는다는 점에 주목했습니다."],
    approach: ["요청 단계에서는 메모리의 차단 목록만 확인하고, DB 동기화는 스케줄러가 맡도록 나눴습니다."],
    implementation: [
      "차단 IP 관리 테이블 설계, 5분 내 20회 로그인 실패 시 차단 등록",
      "Filter에서 요청 IP 확인 후 차단",
      "차단 목록을 메모리에 보관, 1분 주기 스케줄러로 갱신",
    ],
    result: ["비정상 접근을 자동 차단하고, 요청별 DB 조회를 없앴습니다."],
    before: "차단 확인을 위해 요청마다 DB 조회 필요",
    after: "메모리 목록만 확인, 1분 주기로 DB와 동기화",
    note: "새 차단이 반영되기까지 최대 1분 지연을 감수하는 대신 요청별 DB 조회를 없앴습니다.",
    stack: ["Java", "Spring", "Filter", "Scheduler"],
  },
  {
    id: "case-masking",
    no: "04",
    title: "카드번호 마스킹 개선",
    summary: "화면에서만 가리던 카드번호를 서버 응답 단계에서부터 가리도록 바꿨습니다.",
    featured: false,
    situation: ["JSP에서 카드번호를 마스킹했지만, 화면으로 전달되는 데이터에는 원본이 포함돼 있었습니다."],
    cause: ["마스킹이 화면 렌더링 단계에서만 이뤄지는 구조였습니다."],
    approach: ["민감정보는 화면에 도달하기 전에 처리하도록 마스킹 위치를 서버로 옮겼습니다."],
    implementation: ["카드번호 마스킹 공통 함수 구현", "Controller에서 마스킹한 데이터를 화면에 전달"],
    result: ["화면 전달 데이터에 원본 카드번호가 포함되지 않게 됐습니다."],
    before: "JSP에서만 마스킹 → 전달 데이터에 원본 포함",
    after: "Controller에서 마스킹 후 전달 → 원본 미포함",
    stack: ["Java", "Spring MVC", "JSP"],
  },
];

export const featuredCases = caseStudies.filter((c) => c.featured);
