import type { Profile, Strength } from "./types";

export const profile: Profile = {
  nameKo: "박은진",
  nameEn: "Park Eunjin",
  role: "Backend · Full-stack Developer",
  headline: ["안정적인 운영을 넘어,", "더 나은 시스템을 만드는 개발자."],
  summary:
    "Java · Spring MVC로 대국민 웹서비스를 개발·운영하고, Next.js로 개인 서비스를 직접 만들어 운영하는 백엔드 중심 풀스택 개발자입니다.",
  positioning:
    "운영 중인 서비스에서 반복되는 문제를 발견하고, 원인을 분석해 구조적으로 개선합니다.",
  careerStart: "2023-12",
  company: "(주)아이티포워드",
  currentWork: "한국도로공사 통행료 대국민 웹서비스 개발·운영",
  coreStack: ["Java", "Spring MVC", "SQL (Oracle · Tibero)", "Next.js"],
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

/** About: 경력기술서의 사례를 반복하지 않고, 일하는 방식을 보여준다. */
export const strengths: Strength[] = [
  {
    no: "01",
    title: "반복되는 문제는 원인부터 확인합니다",
    body: "같은 장애나 민원이 되풀이되면 건별로 처리하기 전에 발생 흐름을 먼저 따라갑니다. 경력기술서의 사례 대부분이 이렇게 시작했습니다.",
    evidence: [{ label: "경력기술서 보기", href: "experience/" }],
  },
  {
    no: "02",
    title: "운영 중인 시스템을 안전하게 바꿉니다",
    body: "기존 구조를 먼저 파악하고 변경 범위를 좁힙니다. 데이터를 바꾸는 작업은 트랜잭션으로 묶고, 관리자가 확인한 시점에 실행되도록 만듭니다.",
    evidence: [],
  },
  {
    no: "03",
    title: "새 서비스를 직접 만들고 운영합니다",
    body: "모바일 초대장 서비스 ‘별빛 초대장’을 기획해 AI 코딩 도구와 함께 구현하고, 배포 이후의 보안 점검과 데이터 정리까지 맡고 있습니다.",
    evidence: [{ label: "별빛 초대장 보기", href: "projects/starinvite/" }],
  },
];
