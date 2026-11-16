/** 콘텐츠 데이터 타입. 문구 수정은 src/data/*.ts 만 고치면 된다. */

export interface LinkItem {
  label: string;
  href: string;
}

export interface Profile {
  nameKo: string;
  nameEn: string;
  role: string;
  /** 줄바꿈은 배열 원소로 구분 */
  headline: string[];
  summary: string;
  positioning: string;
  /** 실무 경력 시작 (YYYY-MM) — 경력 기간 자동 계산에 사용 */
  careerStart: string;
  company: string;
  currentWork: string;
  coreStack: string[];
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  github: string;
  devBlog: string;
  blog: string;
  siteUrl: string;
  resumePdf: string;
}

export interface Strength {
  no: string;
  title: string;
  body: string;
  evidence: { label: string; href: string }[];
}

export interface Experience {
  company: string;
  period: string;
  duty: string;
  system: string;
  project: string;
  client: string;
  /** 경력기술서 상단 소개 */
  overview: string;
  /** 메인 페이지용 한 줄 소개 */
  intro: string;
  coreTasks: string[];
  highlights: { text: string; caseId?: string }[];
  stack: string[];
}

export interface Achievement {
  label: string;
  /** 개선 전 (있을 때만) */
  from?: string;
  figure: string;
  detail: string;
  caseId: string;
}

/** 경력기술서 사례: 개요 → 문제 → 원인 → 역할 → 해결 → 결과 → 기술 → 의사결정 */
export interface CaseStudy {
  id: string;
  no: string;
  title: string;
  overview: string;
  /** 문제 → 해결 → 결과 요약 (한 줄씩) */
  flow: { problem: string; solution: string; result: string };
  problem: string[];
  cause: string[];
  role: string[];
  process: { title: string; body: string }[];
  result: string[];
  decision: { title: string; body: string }[];
  stack: string[];
}

export interface ProjectSection {
  heading: string;
  items?: string[];
  body?: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  status: string;
  team: string;
  role: string;
  purpose: string;
  featured: boolean;
  stack: string[];
  keyFeatures: string[];
  problems: { title: string; body: string }[];
  /** 해결하려는 사용자 문제 */
  userProblem?: string[];
  /** 서비스 구성 (계층별) */
  architecture?: { layer: string; items: string[] }[];
  /** 기술과 사용 목적 */
  techChoices?: { name: string; use: string }[];
  /** 운영하며 고친 문제 */
  operations?: { title: string; body: string }[];
  /** AI 도구 활용 방식 (순서) */
  aiWorkflow?: string[];
  /** 역할 구분 (AI 활용 프로젝트에서 사람/AI 몫을 분리해 보여줌) */
  contribution?: { mine: string[]; ai?: string[]; note?: string };
  sections: ProjectSection[];
  retrospective?: string[];
  links: LinkItem[];
  image?: { src: string; srcSmall?: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number; caption: string }[];
}

export interface SkillGroup {
  id: string;
  title: string;
  caption: string;
  rows: { name: string; where: string }[];
}

export interface Certification {
  name: string;
  issuer: string;
  status: "acquired" | "in-progress";
  note?: string;
}
