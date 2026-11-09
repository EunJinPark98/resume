import { AudioPipelineDiagram, WebSocketDiagram } from "../components/Diagrams";
import { Icon } from "../components/Icon";
import { Page, Tags } from "../components/Layout";
import { SmartLink } from "../components/SmartLink";
import { projects } from "../data/projects";
import type { Project } from "../data/types";
import { href } from "../lib/site";

export function ProjectDetail({ p, updated }: { p: Project; updated: string }) {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <Page updated={updated}>
      <article className="detail" aria-labelledby="detail-title">
        <header className="detail-hero">
          <div className="container">
            <nav aria-label="현재 위치" className="breadcrumb">
              <a href={href("")}>홈</a>
              <span aria-hidden="true">/</span>
              <a href={href("#projects")}>프로젝트</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{p.name}</span>
            </nav>
            <p className="eyebrow">
              <span className="eyebrow-no">Project</span>
              <span aria-hidden="true" className="eyebrow-rule" />
              {p.status}
            </p>
            <h1 id="detail-title" className="detail-title">
              {p.name}
            </h1>
            <p className="detail-tagline">{p.tagline}</p>
            <dl className="detail-facts">
              <div>
                <dt>기간</dt>
                <dd>{p.period}</dd>
              </div>
              <div>
                <dt>구성</dt>
                <dd>{p.team}</dd>
              </div>
              <div>
                <dt>역할</dt>
                <dd>{p.role}</dd>
              </div>
              <div>
                <dt>링크</dt>
                <dd className="detail-links">
                  {p.links.map((l) => (
                    <SmartLink key={l.href} to={l.href} className="text-link">
                      {l.label}
                    </SmartLink>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="container detail-layout">
          <div className="detail-main">
            {p.image ? (
              <figure className="detail-figure">
                <img
                  src={href(p.image.src)}
                  srcSet={p.image.srcSmall ? `${href(p.image.srcSmall)} 800w, ${href(p.image.src)} 1600w` : undefined}
                  sizes="(min-width: 1100px) 760px, 100vw"
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  fetchPriority="high"
                  decoding="async"
                />
              </figure>
            ) : p.diagram === "websocket" ? (
              <WebSocketDiagram />
            ) : p.diagram === "audio-pipeline" ? (
              <AudioPipelineDiagram />
            ) : null}

            <section aria-labelledby="d-purpose">
              <h2 id="d-purpose">프로젝트 목적</h2>
              <p>{p.purpose}</p>
            </section>

            {p.contribution ? (
              <section aria-labelledby="d-role">
                <h2 id="d-role">역할 구분 — 제가 한 일과 AI가 한 일</h2>
                <div className="contribution">
                  <div>
                    <h3>직접 수행</h3>
                    <ul className="checks">
                      {p.contribution.mine.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  {p.contribution.ai ? (
                    <div className="contribution-ai">
                      <h3>AI 도구 활용</h3>
                      <ul className="bullets">
                        {p.contribution.ai.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                {p.contribution.note ? <p className="callout">{p.contribution.note}</p> : null}
              </section>
            ) : null}

            <section aria-labelledby="d-features">
              <h2 id="d-features">핵심 기능</h2>
              <ul className="bullets">
                {p.keyFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="d-problems">
              <h2 id="d-problems">해결한 문제</h2>
              <ol className="problems">
                {p.problems.map((x) => (
                  <li key={x.title}>
                    <h3>{x.title}</h3>
                    <p>{x.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            {p.sections.map((s) => (
              <section key={s.heading} aria-label={s.heading}>
                <h2>{s.heading}</h2>
                {s.body?.map((b) => <p key={b}>{b}</p>)}
                {s.items ? (
                  <ul className="bullets">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {p.gallery?.length ? (
              <section aria-labelledby="d-gallery">
                <h2 id="d-gallery">화면</h2>
                <div className="gallery">
                  {p.gallery.map((g) => (
                    <figure key={g.src}>
                      <img src={href(g.src)} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" />
                      <figcaption>{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {p.retrospective?.length ? (
              <section aria-labelledby="d-retro">
                <h2 id="d-retro">회고</h2>
                {p.retrospective.map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </section>
            ) : null}
          </div>

          <aside className="detail-aside" aria-label="사용 기술">
            <h2 className="mini-title">사용 기술</h2>
            <Tags items={p.stack} />
          </aside>
        </div>

        <nav className="container detail-nav" aria-label="프로젝트 이동">
          <a href={href("#projects")} className="text-link">
            <Icon name="arrow-left" size={16} />
            전체 프로젝트
          </a>
          {next.slug !== p.slug ? (
            <a href={href(`projects/${next.slug}/`)} className="detail-next">
              <span className="muted">다음 프로젝트</span>
              <strong>
                {next.name} <Icon name="arrow-right" size={16} />
              </strong>
            </a>
          ) : null}
        </nav>
      </article>
    </Page>
  );
}
