import { CaseStudy } from "../components/CaseStudy";
import { Page, Tags } from "../components/Layout";
import { caseStudies, experience } from "../data/experience";
import { profile, strengths } from "../data/profile";
import { otherProjects, projects } from "../data/projects";
import { certifications, skillGroups } from "../data/skills";
import { href, tenure } from "../lib/site";

/**
 * 경력기술서. 화면용이면서 인쇄(A4) 레이아웃을 겸한다 — 이력서 PDF도 이 페이지로 만든다.
 */
export function Career({ now, updated }: { now: Date; updated: string }) {
  return (
    <Page updated={updated}>
      <article className="doc" aria-labelledby="doc-title">
        <div className="container doc-container">
          <header className="doc-header">
            <p className="eyebrow">
              <span className="eyebrow-no">Résumé</span>
              <span aria-hidden="true" className="eyebrow-rule" />
              경력기술서
            </p>
            <h1 id="doc-title" className="doc-title">
              {profile.nameKo} <span className="doc-title-en">{profile.nameEn}</span>
            </h1>
            <p className="doc-role">{profile.role} · 실무 {tenure(profile.careerStart, now)} (2023.12 – 현재)</p>
            <ul className="doc-contact">
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </li>
              <li>
                <a href={profile.github}>github.com/EunJinPark98</a>
              </li>
              <li>
                <a href={profile.siteUrl}>{profile.siteUrl.replace("https://", "")}</a>
              </li>
            </ul>
            <p className="doc-actions no-print">
              <a className="btn btn-primary btn-small" href={href(profile.resumePdf)} download="">
                PDF 다운로드
              </a>
              <button type="button" className="btn btn-outline btn-small" data-print>
                인쇄하기
              </button>
            </p>
          </header>

          <section className="doc-section" aria-labelledby="doc-summary">
            <h2 id="doc-summary">요약</h2>
            <div>
              <p className="lead">{profile.summary}</p>
              <p>{profile.positioning} 울산 지역 정규직 Java/Spring 백엔드 · 풀스택 포지션을 희망합니다.</p>
              <ul className="doc-strengths">
                {strengths.map((s) => (
                  <li key={s.no}>
                    <strong>{s.title}</strong> — {s.body}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-exp">
            <h2 id="doc-exp">경력</h2>
            <div>
              <div className="doc-job">
                <h3>
                  {experience.company}
                  <span className="doc-period">{experience.period}</span>
                </h3>
                <p className="doc-sub">
                  {experience.role} · {experience.project} (발주처: {experience.client})
                </p>
                <p>{experience.intro}</p>
                <h4 className="mini-title">담당 업무</h4>
                <ul className="bullets">
                  {experience.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h4 className="mini-title">주요 성과</h4>
                <ul className="checks">
                  {experience.highlights.map((h) => (
                    <li key={h.text}>{h.caseId ? <a href={`#${h.caseId}`}>{h.text}</a> : h.text}</li>
                  ))}
                </ul>
                <Tags items={experience.stack} />
              </div>
            </div>
          </section>

          <section className="doc-section doc-section-stack" aria-labelledby="doc-cases">
            <h2 id="doc-cases">문제 해결 사례</h2>
            <div className="cases">
              {caseStudies.map((c) => (
                <CaseStudy key={c.id} data={c} />
              ))}
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-projects">
            <h2 id="doc-projects">프로젝트</h2>
            <div>
              {projects.map((p) => (
                <div className="doc-job" key={p.slug}>
                  <h3>
                    <a href={href(`projects/${p.slug}/`)}>{p.name}</a>
                    <span className="doc-period">{p.period}</span>
                  </h3>
                  <p className="doc-sub">
                    {p.team} · {p.role}
                  </p>
                  <p>{p.purpose}</p>
                  {p.contribution?.note ? <p className="muted">{p.contribution.note}</p> : null}
                  <ul className="bullets">
                    {p.problems.slice(0, 3).map((x) => (
                      <li key={x.title}>
                        <strong>{x.title}</strong> — {x.body}
                      </li>
                    ))}
                  </ul>
                  <p className="doc-stack">{p.stack.join(" · ")}</p>
                </div>
              ))}
              <h3 className="mini-title">기타 프로젝트</h3>
              <ul className="bullets">
                {otherProjects.map((o) => (
                  <li key={o.name}>
                    <strong>{o.name}</strong> ({o.period}) — {o.summary}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-skills">
            <h2 id="doc-skills">기술</h2>
            <div>
              {skillGroups.map((g) => (
                <div key={g.title} className="doc-skill">
                  <h3 className="mini-title">
                    {g.title} <span className="muted">— {g.caption}</span>
                  </h3>
                  <table className="doc-table">
                    <tbody>
                      {g.rows.map((r) => (
                        <tr key={r.name}>
                          <th scope="row">{r.name}</th>
                          <td>{r.where}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-certs">
            <h2 id="doc-certs">자격증</h2>
            <div>
              <ul className="bullets">
                {certifications.map((c) => (
                  <li key={c.name}>
                    {c.name} <span className="muted">· {c.issuer}</span>
                    {c.status === "in-progress" ? <span className="muted"> — {c.note}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </article>
    </Page>
  );
}
