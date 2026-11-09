import type { CaseStudy, Experience, TimelineEntry } from "./types";

export const experience: Experience = {
  company: "(주)아이티포워드",
  period: "2023.12 – 현재",
  role: "Java 웹 개발자 · 풀스택",
  project: "통행료플랫폼서비스 유지관리",
  client: "한국도로공사",
  intro:
    "전국 고속도로 통행료 관련 대국민 웹서비스의 개발과 운영을 맡고 있습니다. 실서비스 환경에서 신규 기능을 만들고, 장애·데이터 오류·보안 취약점에 대응하며 시스템을 안정적으로 유지하는 일을 합니다.",
  responsibilities: [
    "Java · Spring(전자정부프레임워크) · JSP · iBATIS 기반 신규 기능 개발 및 기존 기능 개선",
    "Oracle · PostgreSQL · Tibero 환경의 SQL 작성 및 튜닝, 대량 데이터 조회·처리 개선",
    "SQL Injection 등 보안 취약점 점검 및 대응, 카드번호 등 민감정보 암호화·마스킹",
    "오류 분석과 장애 대응, 정기 당직 근무를 통한 웹 애플리케이션 서버 모니터링",
  ],
  highlights: [
    { text: "월말 대량 조회로 반복되던 서버 장애·재기동을 SQL 구조 개선으로 해소", caseId: "case-bulk-query" },
    { text: "로그인 관련 민원을 하루 약 5건에서 주 1건 미만으로 줄인 누락 데이터 일괄 보완 기능 개발", caseId: "case-login-data" },
    { text: "반복 민원을 유형별로 정리해 원인을 하나씩 개선 — 민원 전화 약 25% 감소" },
    { text: "로그인 실패 임계치 기반 IP 자동 차단 (Filter · 메모리 캐시 · 스케줄러)", caseId: "case-ip-block" },
    { text: "보안 환경 내 SVN 서버 구축으로 소스 버전 관리 체계 정비", caseId: "case-svn" },
    { text: "화면 응답 데이터에서 카드번호 원본이 노출되지 않도록 마스킹 위치를 Controller로 이동", caseId: "case-masking" },
  ],
  stack: ["Java", "Spring", "전자정부프레임워크", "JSP", "iBATIS", "SQL", "Oracle", "PostgreSQL", "Tibero", "JavaScript", "jQuery", "AJAX", "Tomcat", "JEUS", "SVN"],
};

/** 날짜가 확인된 항목만 타임라인에 둔다. */
export const timeline: TimelineEntry[] = [
  {
    period: "2023.12 – 현재",
    title: "Java 웹 개발자 · 풀스택",
    org: "(주)아이티포워드 — 한국도로공사 통행료플랫폼서비스",
    kind: "work",
    current: true,
    description: "대국민 통행료 웹서비스 개발·운영. 장애 대응, SQL 개선, 보안 취약점 대응.",
    highlights: [
      "월말 반복 장애 해소",
      "로그인 민원 하루 약 5건 → 주 1건 미만",
      "로그인 실패 IP 자동 차단",
      "SVN 형상관리 구축",
    ],
    stack: ["Java", "Spring", "JSP", "iBATIS", "SQL"],
  },
  {
    period: "2026.06 – 운영 중",
    title: "별빛 초대장 기획 · 개발 · 운영",
    org: "개인 프로젝트 (업무 외)",
    kind: "project",
    description: "Next.js · Supabase 기반 모바일 초대장 제작 서비스. AI 코딩 도구를 활용해 구현하고 직접 배포·운영.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
  },
  {
    period: "2023.10 – 2023.11",
    title: "GREEN MOA 팀 리더",
    org: "그린아카데미 교육과정 팀 프로젝트 (4인)",
    kind: "education",
    description: "Spring Boot · WebSocket 기반 실시간 학급 커뮤니티. 기획·일정 관리와 실시간 채팅·접속 상태·아바타 이동 구현.",
    stack: ["Spring Boot", "WebSocket", "MyBatis", "Oracle"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-bulk-query",
    no: "01",
    title: "월말 대용량 조회 장애 개선",
    summary: "매월 말 반복되던 서버 장애와 재기동을 조회 구조 개선으로 끊어냈습니다.",
    featured: true,
    situation: [
      "월말이 되면 대규모 렌터카 업체가 한 달치 통행료 이용내역을 대량으로 조회했습니다.",
      "조회가 몰리는 시점마다 서버 부하가 급증해 장애가 발생했고, 서버를 재기동해야 서비스가 회복됐습니다.",
    ],
    cause: [
      "같은 원인으로 매월 같은 시점에 장애가 반복된다는 점에서 일시적 트래픽이 아니라 조회 로직 자체의 문제로 보고 분석을 시작했습니다.",
      "기존 조회 흐름과 SQL을 따라가 보니 하나의 쿼리에 여러 조회 조건과 처리가 복잡하게 얽혀 있었고, 화면에 당장 필요하지 않은 데이터까지 한 번에 조회·가공하고 있었습니다.",
      "이용내역이 많은 업체일수록 이 처리 비용이 그대로 커지는 구조였습니다.",
    ],
    approach: [
      "화면이 실제로 요구하는 데이터와 쿼리가 가져오는 데이터를 구분했습니다.",
      "하나의 복잡한 쿼리를 목적별로 나눠, 화면에 즉시 필요한 데이터부터 조회하는 구조로 바꾸기로 했습니다.",
    ],
    implementation: [
      "복잡하게 얽힌 조회 쿼리를 여러 개의 목적별 쿼리로 분리",
      "화면에 즉시 표시할 데이터 중심으로 조회 구조 재구성",
      "조회 조건을 정리하고 불필요한 처리를 걷어내 SQL 실행 비용 감소",
    ],
    result: [
      "개선 적용 이후, 해당 원인으로 매월 반복되던 서버 장애와 재기동이 더 이상 발생하지 않았습니다.",
      "대량 이용내역을 가진 업체의 조회가 안정적으로 처리되면서 월말 서비스 안정성이 개선됐습니다.",
    ],
    before: "한 쿼리가 모든 데이터를 한 번에 조회·가공 → 월말마다 장애와 재기동 반복",
    after: "목적별 쿼리 분리, 화면에 필요한 데이터 우선 조회 → 같은 원인의 장애 재발 없음",
    stack: ["SQL", "iBATIS", "Java", "Spring"],
    competencies: ["SQL Optimization", "Performance Tuning", "Root Cause Analysis", "Service Stability"],
  },
  {
    id: "case-login-data",
    no: "02",
    title: "로그인 누락 데이터 자동 보완",
    summary: "민원마다 손으로 고치던 데이터를, 관리자가 한 번에 보완할 수 있게 만들었습니다.",
    featured: true,
    situation: [
      "대량 데이터를 처리하는 과정에서 생긴 중복·누락 데이터 때문에 로그인 오류 민원이 하루 평균 약 5건 접수됐습니다.",
      "민원이 들어올 때마다 담당자가 해당 고객의 데이터를 확인하고 직접 수정하는 방식으로 처리하고 있었습니다.",
    ],
    cause: [
      "건별 수정은 증상만 없앨 뿐, 같은 상태의 데이터는 계속 남아 있다고 판단했습니다.",
      "데이터가 누락되는 흐름을 분석해 로그인에 필요한 데이터가 빠진 대상을 조건으로 정의할 수 있다는 것을 확인했습니다.",
    ],
    approach: [
      "민원이 접수되기 전에 누락 대상을 먼저 찾아 한꺼번에 보완하는 방향으로 전환했습니다.",
      "운영 데이터를 직접 바꾸는 작업이므로 중간에 실패해도 데이터가 어긋나지 않는 것을 최우선 조건으로 두었습니다.",
    ],
    implementation: [
      "로그인에 필요한 데이터가 누락된 대상을 찾는 조회 로직 작성",
      "관리자가 실행할 수 있는 일괄 보완 기능 개발",
      "대상 데이터를 반복 처리하며 필요한 데이터를 INSERT",
      "트랜잭션을 적용해 처리 도중 오류가 나도 일부만 반영되지 않도록 정합성 관리",
    ],
    result: [
      "로그인 관련 민원이 하루 약 5건에서 주 1건 미만으로 줄었습니다.",
      "민원마다 반복하던 수작업이 사라져 운영 업무 효율과 안정성이 함께 개선됐습니다.",
    ],
    before: "민원 접수 → 담당자가 고객 데이터를 건별로 수동 수정 (하루 약 5건)",
    after: "누락 대상 조회 → 관리자 일괄 보완 (트랜잭션 처리) → 민원 주 1건 미만",
    stack: ["Java", "Spring", "SQL", "iBATIS"],
    competencies: ["Automation", "Transaction Management", "Data Integrity", "Customer Orientation"],
  },
  {
    id: "case-ip-block",
    no: "03",
    title: "비정상 접근 IP 자동 차단",
    summary: "무차별 로그인 시도를 막으면서, 모든 요청이 DB를 거치지 않도록 설계했습니다.",
    featured: true,
    situation: [
      "반복적인 로그인 실패와 비정상 접근에 대응할 공통 접근제어 기능이 필요했습니다.",
      "차단 여부는 모든 요청에서 확인해야 하는데, 요청마다 DB를 조회하면 대국민 서비스 전체에 불필요한 부하가 생길 수 있었습니다.",
    ],
    cause: [
      "차단 여부 확인은 매 요청마다 일어나지만, 차단 목록 자체는 자주 바뀌지 않는다는 점에 주목했습니다.",
      "즉, 읽기는 매우 많고 쓰기는 드문 데이터이므로 요청 경로에서 DB를 분리할 수 있다고 판단했습니다.",
    ],
    approach: [
      "차단 판단 기준을 ‘5분 내 로그인 실패 20회’로 정하고, 차단 IP를 관리하는 테이블을 설계했습니다.",
      "요청 단계에서는 메모리에 올린 차단 목록만 확인하고, DB와의 동기화는 스케줄러가 맡도록 역할을 나눴습니다.",
    ],
    implementation: [
      "차단 IP 관리 테이블 설계, 5분 내 20회 로그인 실패 시 해당 IP 차단 등록",
      "Filter에서 요청 IP를 확인해 차단 대상이면 컨트롤러에 도달하기 전에 접근 차단",
      "차단 IP 목록을 메모리에 보관하고 요청 시에는 메모리에서만 조회",
      "1분 주기 스케줄러로 DB의 차단 목록을 메모리에 갱신",
    ],
    result: [
      "반복 로그인 실패 등 비정상 접근을 자동으로 차단하는 공통 기능을 갖췄습니다.",
      "차단 여부 확인 과정에서 요청마다 발생할 수 있었던 DB 조회를 없앴습니다.",
    ],
    before: "차단 여부를 확인하려면 요청마다 DB 조회가 필요한 구조",
    after: "요청은 메모리 목록만 확인, DB 동기화는 1분 주기 스케줄러가 담당",
    note: "새로 등록된 차단이 요청 경로에 반영되기까지 최대 1분의 지연이 생길 수 있습니다. 요청마다 DB를 조회하는 비용과 비교해 이 지연을 감수하는 쪽을 택했습니다.",
    stack: ["Java", "Spring", "Servlet Filter", "Scheduler", "SQL"],
    competencies: ["Security", "Caching", "Trade-off Design", "Access Control"],
  },
  {
    id: "case-svn",
    no: "04",
    title: "개발 협업 환경 개선 — SVN 구축",
    summary: "보안 환경 안에서도 최신 소스를 안정적으로 공유할 수 있는 체계를 만들었습니다.",
    featured: false,
    situation: [
      "개발자 간 최신 소스를 공유하고 버전을 관리하는 과정에서 비효율이 반복됐습니다.",
      "보안 환경 특성상 외부 형상관리 서비스를 그대로 쓸 수 없었습니다.",
    ],
    cause: [
      "공용 저장소와 버전 관리 규칙이 없으니 누가 어떤 버전을 기준으로 작업하는지 확인하기 어려웠습니다.",
    ],
    approach: ["보안 환경 내부에서 동작하는 형상관리 서버를 두고, 소스 관리 방식부터 정리하기로 했습니다."],
    implementation: [
      "보안 환경 내 SVN 서버 구축",
      "소스 관리 및 브랜치 운영 방식 정비",
      "협업 과정의 소스 버전 관리 체계 개선",
    ],
    result: ["최신 소스 공유 문제가 개선되고 개발 협업 효율이 높아졌습니다."],
    before: "공용 저장소 없이 소스를 주고받아 최신 버전 확인이 어려움",
    after: "내부 SVN 저장소와 브랜치 운영 방식으로 버전 기준 통일",
    stack: ["SVN"],
    competencies: ["Collaboration", "Configuration Management"],
  },
  {
    id: "case-masking",
    no: "05",
    title: "개인정보 노출 위험 개선 — 카드번호 마스킹",
    summary: "화면에서만 가리던 카드번호를, 서버 응답 단계에서부터 가리도록 바꿨습니다.",
    featured: false,
    situation: [
      "JSP 화면에서 카드번호를 마스킹해 보여주고 있었지만, 서버가 화면으로 전달하는 데이터에는 원본 카드번호가 그대로 포함돼 있었습니다.",
    ],
    cause: [
      "마스킹이 화면 렌더링 단계에서만 이뤄졌기 때문에, 화면에 보이지 않더라도 전달 데이터에는 원본이 남는 구조였습니다.",
    ],
    approach: ["민감정보는 화면에 도달하기 전에 처리해야 한다고 보고, 마스킹 위치를 서버로 옮겼습니다."],
    implementation: [
      "카드번호 마스킹 공통 함수 구현",
      "Controller 단계에서 마스킹한 데이터를 화면에 전달하도록 수정",
      "민감정보가 화면 데이터에 불필요하게 포함되지 않도록 개선",
    ],
    result: ["화면으로 전달되는 데이터에 원본 카드번호가 포함되지 않게 되어 개인정보 노출 위험을 줄였습니다."],
    before: "JSP에서만 마스킹 → 화면 전달 데이터에는 원본 카드번호 포함",
    after: "Controller에서 공통 함수로 마스킹 후 전달 → 원본이 화면 데이터에 포함되지 않음",
    stack: ["Java", "Spring MVC", "JSP"],
    competencies: ["Secure Coding", "Data Protection"],
  },
];

export const featuredCases = caseStudies.filter((c) => c.featured);
