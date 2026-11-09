import { renderToStaticMarkup } from "react-dom/server";
import { Page } from "./components/Layout";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { Career } from "./pages/Career";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { href } from "./lib/site";

export interface Route {
  /** 출력 경로 (dist 기준) */
  file: string;
  /** 정규 URL 경로 (base 제외) */
  path: string;
  title: string;
  description: string;
  image?: string;
  render: () => string;
  /** 검색 노출 제외 */
  noindex?: boolean;
}

export { profile };

export function getRoutes(now: Date): Route[] {
  const updated = now.toISOString().slice(0, 10).replaceAll("-", ".");
  const html = (el: React.ReactElement) => renderToStaticMarkup(el);

  const base: Route[] = [
    {
      file: "index.html",
      path: "",
      title: "박은진 | 풀스택 개발자 — Java/Spring · React",
      description:
        "Java/Spring 기반 대국민 웹서비스 운영 경험과 React/Next.js 서비스 개발 역량을 갖춘 풀스택 개발자 박은진의 이력서입니다. 월말 조회 장애 해소, 로그인 민원 하루 약 5건→주 1건 미만 등 실무 개선 사례를 소개합니다.",
      render: () => html(<Home now={now} updated={updated} />),
    },
    {
      file: "career/index.html",
      path: "career/",
      title: "경력기술서 | 박은진 — 풀스택 개발자",
      description:
        "(주)아이티포워드 한국도로공사 통행료 대국민 웹서비스 개발·운영 경력과 5가지 문제 해결 사례(대용량 조회 장애, 누락 데이터 자동 보완, IP 자동 차단, SVN 구축, 카드번호 마스킹)를 정리한 경력기술서.",
      render: () => html(<Career now={now} updated={updated} />),
    },
    ...projects.map<Route>((p) => ({
      file: `projects/${p.slug}/index.html`,
      path: `projects/${p.slug}/`,
      title: `${p.name} | 박은진 프로젝트`,
      description: `${p.tagline}. ${p.purpose}`.slice(0, 160),
      image: p.image?.src,
      render: () => html(<ProjectDetail p={p} updated={updated} />),
    })),
    {
      file: "404.html",
      path: "404.html",
      title: "페이지를 찾을 수 없습니다 | 박은진",
      description: "요청하신 페이지를 찾을 수 없습니다.",
      noindex: true,
      render: () =>
        html(
          <Page updated={updated}>
            <section className="section not-found">
              <div className="container">
                <p className="eyebrow">404</p>
                <h1 className="section-title">페이지를 찾을 수 없습니다.</h1>
                <p>
                  <a className="btn btn-primary" href={href("")}>
                    홈으로 이동
                  </a>
                </p>
              </div>
            </section>
          </Page>,
        ),
    },
  ];
  return base;
}
