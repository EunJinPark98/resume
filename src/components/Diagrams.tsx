/** 스크린샷이 없는 프로젝트는 실제 코드 구조를 그대로 옮긴 다이어그램으로 보여준다. */

export function WebSocketDiagram() {
  const messages = [
    { key: "content", desc: "채팅 메시지 표시" },
    { key: "connectId", desc: "접속 표시 켜기" },
    { key: "disConnectId", desc: "접속 표시 끄기" },
    { key: "moveId", desc: "아바타 위치 갱신" },
  ];
  return (
    <figure className="diagram" aria-labelledby="ws-diagram-cap">
      <div className="diagram-flow">
        <div className="node">
          <span className="node-kicker">Client A</span>
          <code>socket.send(JSON)</code>
        </div>
        <div className="edge" aria-hidden="true" />
        <div className="node node-accent">
          <span className="node-kicker">Spring Boot</span>
          <code>TextWebSocketHandler</code>
          <small>ConcurrentHashMap&lt;id, session&gt;</small>
        </div>
        <div className="edge" aria-hidden="true" />
        <div className="node">
          <span className="node-kicker">Client B · C · D</span>
          <code>onmessage → 분기</code>
        </div>
      </div>
      <table className="diagram-table">
        <caption className="sr-only">메시지 키별 처리</caption>
        <thead>
          <tr>
            <th scope="col">메시지 키</th>
            <th scope="col">받은 쪽 처리</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m.key}>
              <td>
                <code>{m.key}</code>
              </td>
              <td>{m.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption id="ws-diagram-cap">하나의 WebSocket 연결에서 JSON 키로 이벤트 종류를 구분해 브로드캐스트</figcaption>
    </figure>
  );
}

export function AudioPipelineDiagram() {
  const steps = [
    { t: "AudioWorklet", d: "3.072초 창 · 1.536초 간격 수집" },
    { t: "전처리", d: "16kHz · DC 제거 · 품질 게이트 · -23 dBFS" },
    { t: "울음 판별", d: "YAMNet (WASM) — 울음일 때만 다음 단계" },
    { t: "원인 후보", d: "특징 추출 + 분류 모델 (전용 Worker)" },
    { t: "표시 규칙", d: "불확실 제외 · 연속 2회 일치 시 갱신" },
  ];
  return (
    <figure className="diagram" aria-labelledby="audio-diagram-cap">
      <ol className="pipeline">
        {steps.map((s, i) => (
          <li key={s.t} className={i === 2 ? "is-gate" : undefined}>
            <span className="pipeline-no" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{s.t}</strong>
            <span>{s.d}</span>
          </li>
        ))}
      </ol>
      <figcaption id="audio-diagram-cap">모든 처리는 브라우저 안에서 — 오디오는 저장하거나 전송하지 않음</figcaption>
    </figure>
  );
}
