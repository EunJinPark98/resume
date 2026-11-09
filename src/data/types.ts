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

export interface Achievement {
  /** 큰 숫자/키워드 */
  figure: string;
  /** 숫자 앞의 비교 기준 (예: 하루 약 5건 →) */
  from?: string;
  unit?: string;
  label: string;
  detail: string;
  caseId?: string;
}

export interface CaseStudy {
  id: string;
  no: string;
  title: string;
  summary: string;
  featured: boolean;
  situation: string[];
  cause: string[];
  approach: string[];
  implementation: string[];
  result: string[];
  before: string;
  after: string;
  /** 설계상 감수한 점 · 면접에서 설명할 포인트 */
  note?: string;
  stack: string[];
  competencies: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  kind: "work" | "project" | "education";
  description: string;
  highlights?: string[];
  stack?: string[];
  current?: boolean;
}

export interface Experience {
  company: string;
  period: string;
  role: string;
  project: string;
  client: string;
  intro: string;
  responsibilities: string[];
  highlights: { text: string; caseId?: string }[];
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
  /** 역할 구분 (AI 활용 프로젝트에서 사람/AI 몫을 분리해 보여줌) */
  contribution?: { mine: string[]; ai?: string[]; note?: string };
  sections: ProjectSection[];
  retrospective?: string[];
  links: LinkItem[];
  image?: { src: string; srcSmall?: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number; caption: string }[];
  /** 이미지가 없을 때 보여줄 다이어그램 종류 */
  diagram?: "websocket" | "audio-pipeline";
}

export interface OtherProject {
  name: string;
  period: string;
  summary: string;
  stack: string[];
  links: LinkItem[];
}

export interface SkillGroup {
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
