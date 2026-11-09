# 박은진 | 풀스택 개발자 이력서 홈페이지

> 안정적인 운영을 넘어, 더 나은 시스템을 만드는 개발자.

Java/Spring 기반 대국민 웹서비스 운영 경험과 React/Next.js 서비스 개발 역량을 보여주기 위한 경력직 이력서 사이트입니다.

- 배포 예정 주소: `https://eunjinpark98.github.io/resume/` (기존 `eunjinpark98.github.io` 사이트는 건드리지 않음)
- 페이지: 홈 · 경력기술서(`/career/`) · 프로젝트 상세 3종(`/projects/<slug>/`) · 404
- 이력서 PDF: `public/park-eunjin-resume.pdf` (경력기술서 페이지의 인쇄 레이아웃으로 생성)

## 기술 선택

| 항목 | 선택 | 이유 |
| --- | --- | --- |
| UI 작성 | React 19 + TypeScript | 컴포넌트·타입으로 콘텐츠 구조를 안전하게 관리 |
| 빌드 | Vite 6 + 빌드 시 정적 생성(SSG) | 모든 페이지가 완성된 HTML로 배포 → 검색엔진·카카오톡 미리보기·JS 미동작 환경에서도 내용이 보임 |
| 클라이언트 JS | 약 1KB(gzip) | 메뉴, 스크롤 효과, 이메일 복사만 담당. React 런타임은 브라우저로 보내지 않음 |
| 스타일 | 순수 CSS + 디자인 토큰 | Tailwind도 검토했으나 화면 수가 적고, 토큰 한 곳에서 색·간격을 관리하는 편이 의존성과 결과물 크기 모두 작음 |
| 글꼴 | Pretendard Variable 동적 서브셋(자체 호스팅) | 필요한 글자 묶음만 내려받음, 외부 CDN 의존 없음 |

런타임 의존성은 0개입니다. (`react`, `vite` 등은 모두 빌드용 devDependencies)

## 콘텐츠 수정

문구는 컴포넌트가 아니라 `src/data/` 에서만 고칩니다.

| 파일 | 내용 |
| --- | --- |
| `src/data/profile.ts` | 이름, 한 줄 소개, 연락처, 강점 3가지, 핵심 성과 수치 |
| `src/data/experience.ts` | 회사 경력, 타임라인, 문제 해결 사례 5건 (`featured: true` 인 사례가 홈에 노출) |
| `src/data/projects.ts` | 대표 프로젝트(상세 페이지 자동 생성), 기타 프로젝트 |
| `src/data/skills.ts` | 기술 스택(어디서 썼는지), 자격증 |

실무 경력 기간(예: 2년 11개월)은 `careerStart` 기준으로 빌드 시점과 방문 시점에 자동 계산됩니다.

## 명령어

```bash
npm ci                # 설치
npm run build         # 타입 검사 → 클라이언트 번들 → SSR 번들 → 정적 HTML 생성 (dist/)
npm run preview       # dist/ 를 http://localhost:4173/resume/ 로 확인
npm run check         # 타입 검사 + 내부 링크·앵커·alt·h1·중복 id 검사 (build 이후)
node scripts/check-links.mjs --external   # 외부 링크까지 확인

# 콘텐츠를 바꿨다면 PDF·공유 이미지도 다시 만든다 (Playwright 필요)
npm run build && npm run assets && npm run build
```

## 배포

`.github/workflows/deploy.yml` 이 **main 브랜치에 병합될 때만** GitHub Pages로 배포합니다.

1. 저장소 **Settings → Pages → Source** 를 `GitHub Actions` 로 설정
2. 작업 브랜치 내용을 확인한 뒤 main에 병합
3. `https://eunjinpark98.github.io/resume/` 에서 확인

나중에 이 사이트를 루트 주소(`eunjinpark98.github.io`)로 옮기려면 `BASE_PATH=/` 로 빌드하고 `src/data/profile.ts` 의 `siteUrl` 을 바꾸면 됩니다.

## 폴더 구조

```
src/
  data/          콘텐츠 (여기만 고치면 됨)
  components/    Layout, CaseStudy(문제→원인→접근→구현→결과), Diagrams, Icon …
  pages/         Home, Career(경력기술서·PDF 원본), ProjectDetail
  client/main.ts 브라우저에서 도는 유일한 스크립트
  styles/main.css 디자인 토큰 + 전체 스타일 + 인쇄(A4) 스타일
  entry-server.tsx 경로 목록과 페이지별 메타 정보
scripts/
  prerender.mjs        정적 HTML·sitemap·robots 생성
  generate-assets.mjs  이력서 PDF, OG 이미지, 아이콘 생성
  check-links.mjs      링크·접근성 기본 검사
  serve.mjs            미리보기 서버
docs/REVIEW.md         콘텐츠 설계 근거, 채용담당자 관점 검토, 확인 필요 항목
```
