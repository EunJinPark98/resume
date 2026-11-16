import { CaseStudy } from "../components/CaseStudy";
import { Icon } from "../components/Icon";
import { Page, SectionHead, Tags } from "../components/Layout";
import { SmartLink } from "../components/SmartLink";
import { caseStudies, experience, featuredCases, timeline } from "../data/experience";
import { achievements, profile, strengths } from "../data/profile";
import { projects } from "../data/projects";
import { certifications, skillGroups } from "../data/skills";
import type { Project } from "../data/types";
import { href, tenure } from "../lib/site";

/** 홈에 펼친 사례는 #id, 나머지는 경력기술서로 연결 */
const caseHref = (id: string) => (featuredCases.some((c) => c.id === id) ? `#${id}` : `career/#${id}`);

function Hero({ now }: { now: Date }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <p className="hero-kicker">
          {profile.nameKo} <span aria-hidden="true">|</span> {profile.role}
        </p>
        <h1 id="hero-title" className="hero-title">
          {profile.headline.map((line) => (
            <span key={line} className="hero-line">
              {line}
            </span>
          ))}
        </h1>
        <div className="hero-body">
          <div className="hero-intro">
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={href("#cases")}>
                경력 및 성과 보기
                <Icon name="arrow-right" size={16} />
              </a>
              <a className="btn btn-outline" href={href(profile.resumePdf)} download="">
                <Icon name="download" size={16} />
                이력서 PDF
              </a>
            </div>
          </div>
          <dl className="fact-sheet" aria-label="프로필 요약">
            <div>
              <dt>실무 경력</dt>
              <dd>
                2023.12 – 현재{" "}
                <span className="muted">
                  (<span data-tenure-since={profile.careerStart}>{tenure(profile.careerStart, now)}</span>)
                </span>
              </dd>
            </div>
            <div>
              <dt>현 직장</dt>
              <dd>{profile.company}</dd>
            </div>
            <div>
              <dt>주력 기술</dt>
              <dd>{profile.coreStack.join(" · ")}</dd>
            </div>
            <div>
              <dt>희망 근무</dt>
              <dd>울산 지역 · 정규직</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="section section-tight" aria-labelledby="achievements">
      <div className="container">
        <SectionHead no="01" label="Key Achievements" id="achievements" title="핵심 성과" />
        <ol className="achievements">
          {achievements.map((a) => (
            <li key={a.label} data-reveal>
              <a className="achievement" href={href(caseHref(a.caseId!))}>
                <span className="achievement-label">{a.label}</span>
                {a.from ? <span className="achievement-from">{a.from} →</span> : <span className="achievement-from" aria-hidden="true">&nbsp;</span>}
                <span className="achievement-figure">{a.figure}</span>
                <span className="achievement-detail">{a.detail}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" aria-labelledby="about">
      <div className="container split">
        <SectionHead no="02" label="About" id="about" title="문제를 발견하고, 구조로 해결합니다" />
        <ol className="strengths">
          {strengths.map((s) => (
            <li key={s.no} data-reveal>
              <span className="strength-no" aria-hidden="true">
                {s.no}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="evidence">
                  {s.evidence.map((e) => (
                    <a key={e.href} href={href(e.href)}>
                      {e.label}
                    </a>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  const [work, ...rest] = timeline;
  return (
    <section className="section section-alt" aria-labelledby="experience">
      <div className="container">
        <SectionHead no="03" label="Work Experience" id="experience" title="경력" />
        <ol className="timeline">
          <li className="timeline-item is-current" data-reveal>
            <div className="timeline-period">
              <span>{work.period}</span>
              <span className="badge">재직 중</span>
            </div>
            <div className="timeline-body">
              <h3 className="timeline-title">{experience.company}</h3>
              <p className="timeline-org">
                {experience.role} · {experience.project} <span className="muted">(발주처: {experience.client})</span>
              </p>
              <p>{experience.intro}</p>
              <div className="exp-columns">
                <div>
                  <h4 className="mini-title">주요 성과</h4>
                  <ul className="checks">
                    {experience.highlights.map((h) => (
                      <li key={h.text}>{h.caseId ? <a href={href(caseHref(h.caseId))}>{h.text}</a> : h.text}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mini-title">담당 업무</h4>
                  <ul className="bullets">
                    {experience.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Tags items={experience.stack} />
            </div>
          </li>
          {rest.map((t) => (
            <li className="timeline-item" key={t.title} data-reveal>
              <div className="timeline-period">
                <span>{t.period}</span>
                <span className="badge badge-muted">개인 프로젝트</span>
              </div>
              <div className="timeline-body">
                <h3 className="timeline-title timeline-title-sm">{t.title}</h3>
                <p className="timeline-org">{t.org}</p>
                <p>{t.description}</p>
                {t.stack ? <Tags items={t.stack} /> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Cases() {
  const others = caseStudies.filter((c) => !c.featured);
  return (
    <section className="section" aria-labelledby="cases">
      <div className="container">
        <SectionHead no="04" label="Problem Solving" id="cases" title="실무 문제 해결 사례" />
        <div className="cases">
          {featuredCases.map((c) => (
            <CaseStudy key={c.id} data={c} collapsible />
          ))}
        </div>
        {others.length ? (
          <div className="more-cases">
            <p>
              {others.map((c) => c.title).join(", ")} 사례는 경력기술서에서 볼 수 있습니다.
            </p>
            <a className="btn btn-outline" href={href("career/")}>
              경력기술서 보기
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-alt" aria-labelledby="skills">
      <div className="container">
        <SectionHead no="05" label="Tech Stack" id="skills" title="기술 스택" />
        <div className="skill-groups">
          {skillGroups.map((g) => (
            <section key={g.title} className="skill-group" aria-labelledby={`skill-${g.title}`} data-reveal>
              <h3 id={`skill-${g.title}`}>
                {g.title}
                <span>{g.caption}</span>
              </h3>
              <dl>
                {g.rows.map((r) => (
                  <div key={r.name}>
                    <dt>{r.name}</dt>
                    <dd>{r.where}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectFeature({ p }: { p: Project }) {
  return (
    <article className="project" aria-labelledby={`p-${p.slug}`} data-reveal>
      {p.image ? (
        <div className="project-visual">
          <img
            src={href(p.image.srcSmall ?? p.image.src)}
            srcSet={p.image.srcSmall ? `${href(p.image.srcSmall)} 800w, ${href(p.image.src)} 1600w` : undefined}
            sizes="(min-width: 960px) 560px, 100vw"
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="project-body">
        <p className="project-meta">
          <span>{p.period}</span>
          <span aria-hidden="true">·</span>
          <span>{p.team}</span>
        </p>
        <h3 id={`p-${p.slug}`} className="project-title">
          <a href={href(`projects/${p.slug}/`)}>{p.name}</a>
        </h3>
        <p className="project-tagline">{p.tagline}</p>
        <p>{p.purpose}</p>
        <ul className="bullets project-features">
          {p.keyFeatures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Tags items={p.stack} />
        <div className="project-actions">
          <a className="btn btn-primary btn-small" href={href(`projects/${p.slug}/`)}>
            상세 보기<span className="sr-only">: {p.name}</span>
            <Icon name="arrow-right" size={16} />
          </a>
          {p.links.map((l) => (
            <SmartLink key={l.href} to={l.href} className="text-link">
              {l.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section" aria-labelledby="projects">
      <div className="container">
        <SectionHead no="06" label="Project" id="projects" title="프로젝트" />
        <div className="projects">
          {projects.map((p) => (
            <ProjectFeature key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const acquired = certifications.filter((c) => c.status === "acquired");
  const progress = certifications.filter((c) => c.status === "in-progress");
  return (
    <section className="section section-tight section-alt" aria-labelledby="certifications">
      <div className="container split">
        <SectionHead no="07" label="Certifications" id="certifications" title="자격증" />
        <div>
          <ul className="certs">
            {acquired.map((c) => (
              <li key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer">{c.issuer}</span>
                <span className="badge">취득</span>
              </li>
            ))}
          </ul>
          {progress.length ? (
            <ul className="certs certs-progress" aria-label="취득 진행 중">
              {progress.map((c) => (
                <li key={c.name}>
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-issuer">{c.issuer}</span>
                  <span className="badge badge-muted">{c.note}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" aria-labelledby="contact">
      <div className="container">
        <p className="eyebrow eyebrow-invert">
          <span className="eyebrow-no">08</span>
          <span aria-hidden="true" className="eyebrow-rule" />
          Contact
        </p>
        <h2 id="contact" className="contact-title">
          연락처
        </h2>
        <p className="contact-lede">울산 지역 근무가 가능한 Java/Spring 백엔드 · 풀스택 포지션을 찾고 있습니다.</p>
        <div className="contact-grid">
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button type="button" className="copy-btn" data-copy={profile.email} aria-label="이메일 주소 복사">
                  <Icon name="copy" size={15} />
                  <span data-copy-label aria-live="polite">복사</span>
                </button>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <SmartLink to={profile.github}>github.com/EunJinPark98</SmartLink>
              </dd>
            </div>
            <div>
              <dt>Blog</dt>
              <dd>
                <SmartLink to={profile.devBlog}>bagun-coding.tistory.com</SmartLink>
              </dd>
            </div>
          </dl>
          <div className="contact-actions">
            <a className="btn btn-light" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={16} />
              메일 보내기
            </a>
            <a className="btn btn-ghost-light" href={href(profile.resumePdf)} download="">
              <Icon name="download" size={16} />
              이력서 PDF 다운로드
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home({ now, updated }: { now: Date; updated: string }) {
  return (
    <Page updated={updated}>
      <Hero now={now} />
      <Achievements />
      <About />
      <Experience />
      <Cases />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </Page>
  );
}
