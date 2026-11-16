import type { Profile, Strength } from "./types";

export const profile: Profile = {
  nameKo: "박은진",
  nameEn: "Park Eunjin",
  role: "Full-stack Web Developer",
  headline: ["안정적인 운영을 넘어,", "더 나은 시스템을 만드는 개발자."],
  summary:
    "Java/Spring 기반 대국민 웹서비스 운영 경험과 React/Next.js 기반 서비스 개발 역량을 갖춘 풀스택 개발자입니다.",
  positioning:
    "운영 중인 서비스에서 반복되는 문제를 발견하고, 원인을 분석해 구조적으로 개선합니다.",
  careerStart: "2023-12",
  company: "(주)아이티포워드",
  currentWork: "한국도로공사 통행료 대국민 웹서비스 개발·운영",
  coreStack: ["Java", "Spring", "SQL", "React"],
  location: "울산 지역 정규직 희망",
  email: "obliviscor29@naver.com",
  phone: "010-5512-4219",
  phoneHref: "tel:01055124219",
  github: "https://github.com/EunJinPark98",
  devBlog: "https://bagun-coding.tistory.com/",
  blog: "https://blog.naver.com/obliviscor29",
  siteUrl: "https://eunjinpark98.github.io/resume/",
  resumePdf: "park-eunjin-resume.pdf",
};

export const strengths: Strength[] = [
  {
    no: "01",
    title: "증상이 아니라 원인을 고칩니다",
    body: "민원마다 데이터를 손으로 고치는 대신, 누락 흐름을 찾아 자동 보완 기능을 만들었습니다.",
    evidence: [],
  },
  {
    no: "02",
    title: "Java · Spring · SQL로 운영 시스템을 다룹니다",
    body: "기능 개발, SQL 튜닝, 장애·보안 대응을 맡고 있으며, 월말 반복 장애를 쿼리 구조 개선으로 해소했습니다.",
    evidence: [],
  },
  {
    no: "03",
    title: "새 서비스를 기획부터 운영까지 만듭니다",
    body: "모바일 초대장 서비스 ‘별빛 초대장’을 AI 코딩 도구를 활용해 Next.js·Supabase로 구현하고 직접 운영하고 있습니다.",
    evidence: [{ label: "별빛 초대장 보기", href: "projects/starinvite/" }],
  },
];
