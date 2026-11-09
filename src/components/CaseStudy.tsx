import type { CaseStudy as CaseData } from "../data/types";
import { Tags } from "./Layout";

function Block({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className="case-block">
      <h4 className="case-block-title">{title}</h4>
      {items.length === 1 && !ordered ? (
        <p>{items[0]}</p>
      ) : (
        <List className={ordered ? "steps" : "bullets"}>
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </List>
      )}
    </div>
  );
}

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="before-after" role="group" aria-label="개선 전후 비교">
      <div className="ba ba-before">
        <span className="ba-label">Before</span>
        <p>{before}</p>
      </div>
      <div className="ba-arrow" aria-hidden="true">→</div>
      <div className="ba ba-after">
        <span className="ba-label">After</span>
        <p>{after}</p>
      </div>
    </div>
  );
}

/**
 * 문제 → 원인 → 접근 → 구현 → 결과.
 * collapsible: 홈에서는 요약·전후 비교·결과만 펼치고 상세 과정은 접어 둔다.
 */
export function CaseStudy({ data, collapsible = false, headingLevel = 3 }: { data: CaseData; collapsible?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const detail = (
    <div className="case-grid">
      <Block title="문제 상황" items={data.situation} />
      <Block title="원인 분석" items={data.cause} />
      <Block title="기술적 접근" items={data.approach} />
      <Block title="구현 내용" items={data.implementation} ordered />
    </div>
  );

  return (
    <article className="case" id={data.id} aria-labelledby={`${data.id}-title`} data-reveal>
      <header className="case-head">
        <span className="case-no" aria-hidden="true">
          {data.no}
        </span>
        <div>
          <H className="case-title" id={`${data.id}-title`}>
            <span className="sr-only">사례 {data.no}. </span>
            {data.title}
          </H>
          <p className="case-summary">{data.summary}</p>
        </div>
      </header>

      <BeforeAfter before={data.before} after={data.after} />

      {collapsible ? (
        <details className="case-details">
          <summary>
            <span className="summary-open">원인 분석과 구현 과정 보기</span>
            <span className="summary-close">접기</span>
          </summary>
          {detail}
        </details>
      ) : (
        detail
      )}

      <div className="case-foot">
        <div className="case-result">
          <h4 className="case-block-title">결과</h4>
          <ul className="bullets">
            {data.result.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {data.note ? (
            <p className="case-note">
              <strong>설계상 판단 </strong>
              {data.note}
            </p>
          ) : null}
        </div>
        <div className="case-meta">
          <h4 className="case-block-title">사용 기술</h4>
          <Tags items={data.stack} />
          <h4 className="case-block-title">강조 역량</h4>
          <p className="competencies">{data.competencies.join(" · ")}</p>
        </div>
      </div>
    </article>
  );
}
