import type { Achievement, CaseStudy as CaseData } from "../data/types";
import { Tags } from "./Layout";

/** 문제 → 해결 → 결과를 한 줄로 보여주는 흐름 */
function Flow({ flow }: { flow: CaseData["flow"] }) {
  const steps = [
    { key: "problem", label: "문제", text: flow.problem },
    { key: "solution", label: "해결", text: flow.solution },
    { key: "result", label: "결과", text: flow.result },
  ];
  return (
    <ol className="flow" aria-label="문제, 해결, 결과 요약">
      {steps.map((s) => (
        <li key={s.key} className={`flow-step flow-${s.key}`}>
          <span className="flow-label">{s.label}</span>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function TextBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="case-block">
      <h4 className="case-block-title">{title}</h4>
      {items.length === 1 ? (
        <p>{items[0]}</p>
      ) : (
        <ul className="bullets">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CaseStudy({ data }: { data: CaseData }) {
  return (
    <article className="case" id={data.id} aria-labelledby={`${data.id}-title`}>
      <header className="case-head">
        <span className="case-no" aria-hidden="true">
          {data.no}
        </span>
        <div>
          <h3 className="case-title" id={`${data.id}-title`}>
            <span className="sr-only">사례 {data.no}. </span>
            {data.title}
          </h3>
          <p className="case-summary">{data.overview}</p>
        </div>
      </header>

      <Flow flow={data.flow} />

      <div className="case-grid">
        <TextBlock title="문제 상황" items={data.problem} />
        <TextBlock title="원인 분석" items={data.cause} />
      </div>

      <div className="case-grid case-grid-wide">
        <div className="case-block">
          <h4 className="case-block-title">담당 역할</h4>
          <ul className="checks">
            {data.role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="case-block">
          <h4 className="case-block-title">기술적 해결 과정</h4>
          <ol className="process">
            {data.process.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                <span>{p.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="case-block case-result">
        <h4 className="case-block-title">개선 결과</h4>
        <ul className="bullets">
          {data.result.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="decisions">
        <h4 className="case-block-title">기술적 의사결정</h4>
        <dl>
          {data.decision.map((d) => (
            <div key={d.title}>
              <dt>{d.title}</dt>
              <dd>{d.body}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="case-stack">
        <h4 className="case-block-title">사용 기술</h4>
        <Tags items={data.stack} />
      </div>
    </article>
  );
}

export function AchievementCards({ items, linkPrefix = "" }: { items: Achievement[]; linkPrefix?: string }) {
  return (
    <ol className="achievements">
      {items.map((a) => (
        <li key={a.caseId}>
          <a className="achievement" href={`${linkPrefix}#${a.caseId}`}>
            <span className="achievement-label">{a.label}</span>
            {a.from ? (
              <span className="achievement-from">{a.from} →</span>
            ) : (
              <span className="achievement-from" aria-hidden="true">
                &nbsp;
              </span>
            )}
            <span className="achievement-figure">{a.figure}</span>
            <span className="achievement-detail">{a.detail}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
