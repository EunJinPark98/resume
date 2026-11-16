import { AchievementCards, CaseStudy } from "../components/CaseStudy";
import { Page, Tags } from "../components/Layout";
import { achievements, caseStudies, experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { certifications, skillGroups } from "../data/skills";
import { href, tenure } from "../lib/site";

/**
 * 상세 경력기술서 (/experience/).
 * 화면용이면서 인쇄(A4) 레이아웃을 겸한다 — 이력서 PDF도 이 페이지로 만든다.
 */
export function Experience({ now, updated }: { now: Date; updated: string }) {
  return (
    <Page updated={updated}>
      <article className="doc" aria-labelledby="doc-title">
        <div className="container doc-container">
          <header className="doc-header">
            <nav aria-label="현재 위치" className="breadcrumb no-print">
              <a href={href("")}>홈</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">경력기술서</span>
            </nav>
            <p className="eyebrow">
              <span className="eyebrow-no">Résumé</span>
              <span aria-hidden="true" className="eyebrow-rule" />
              경력기술서
            </p>
            <h1 id="doc-title" className="doc-title">
              {profile.nameKo} <span className="doc-title-en">{profile.nameEn}</span>
            </h1>
            <p className="doc-role">
              {profile.role} · 실무 <span data-tenure-since={profile.careerStart}>{tenure(profile.careerStart, now)}</span> (2023.12 – 현재)
            </p>
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
            <nav className="doc-toc no-print" aria-label="경력기술서 목차">
              <ol>
                <li>
                  <a href="#overview">Career Overview</a>
                </li>
                <li>
                  <a href="#key-achievements">Key Achievements</a>
                </li>
                <li>
                  <a href="#case-studies">Technical Case Studies</a>
                  <ol>
                    {caseStudies.map((c) => (
                      <li key={c.id}>
                        <a href={`#${c.id}`}>
                          {c.no}. {c.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </li>
                <li>
                  <a href="#doc-projects">개인 프로젝트</a>
                </li>
                <li>
                  <a href="#doc-skills">기술 · 자격증</a>
                </li>
              </ol>
            </nav>
          </header>

          {/* A. Career Overview */}
          <section className="doc-section doc-section-stack" aria-labelledby="overview">
            <h2 id="overview">
              <span className="doc-section-no">A</span> Career Overview
            </h2>
            <div className="overview">
              <dl className="overview-facts">
                <div>
                  <dt>회사</dt>
                  <dd>{experience.company}</dd>
                </div>
                <div>
                  <dt>재직</dt>
                  <dd>{experience.period}</dd>
                </div>
                <div>
                  <dt>직무</dt>
                  <dd>{experience.duty}</dd>
                </div>
                <div>
                  <dt>담당</dt>
                  <dd>
                    {experience.system}
                    <span className="muted block">
                      {experience.project} · 발주처 {experience.client}
                    </span>
                  </dd>
                </div>
              </dl>
              <div>
                <p className="lead">{experience.overview}</p>
                <h3 className="mini-title">핵심 업무</h3>
                <ul className="bullets">
                  {experience.coreTasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <h3 className="mini-title">주요 기술</h3>
                <Tags items={experience.stack} />
              </div>
            </div>
          </section>

          {/* B. Key Achievements */}
          <section className="doc-section doc-section-stack" aria-labelledby="key-achievements">
            <h2 id="key-achievements">
              <span className="doc-section-no">B</span> Key Achievements
            </h2>
            <AchievementCards items={achievements} />
          </section>

          {/* C. Technical Case Studies */}
          <section className="doc-section doc-section-stack" aria-labelledby="case-studies">
            <h2 id="case-studies">
              <span className="doc-section-no">C</span> Technical Case Studies
            </h2>
            <p className="section-note">
              각 사례는 개요 → 문제 → 원인 → 역할 → 해결 과정 → 결과 → 기술적 의사결정 순서로 정리했습니다. 회사 내부 코드와 보안 정책의 세부 구현은 공개하지 않았습니다.
            </p>
            <div className="cases">
              {caseStudies.map((c) => (
                <CaseStudy key={c.id} data={c} />
              ))}
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-projects">
            <h2 id="doc-projects">개인 프로젝트</h2>
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
                  <ul className="bullets">
                    {p.problems.slice(0, 3).map((x) => (
                      <li key={x.title}>
                        <strong>{x.title}</strong> — {x.body}
                      </li>
                    ))}
                  </ul>
                  {p.contribution?.ai ? (
                    <p className="muted">
                      구현 코드의 상당 부분은 AI 코딩 도구(Claude Code)로 작성했고, 기획 · 코드 검토 · 테스트 · 배포 · 운영을 직접 맡았습니다.
                    </p>
                  ) : null}
                  <p className="doc-stack">{p.stack.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="doc-section" aria-labelledby="doc-skills">
            <h2 id="doc-skills">기술</h2>
            <div>
              {skillGroups.map((g) => (
                <div key={g.id} className="doc-skill">
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

          <p className="doc-back no-print">
            <a className="text-link" href={href("")}>
              ← 홈으로
            </a>
          </p>
        </div>
      </article>
    </Page>
  );
}
