/** 배포 경로(base)를 고려한 링크 생성. 외부 링크와 mailto/tel 은 그대로 둔다. */
export const BASE = import.meta.env.BASE_URL;

export function href(path: string): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path.startsWith("#")) return `${BASE}${path}`;
  return `${BASE}${path.replace(/^\//, "")}`;
}

export function isExternal(path: string): boolean {
  return /^https?:/.test(path);
}

/** "2023-12" 부터 기준일까지의 경력 기간 — "2년 11개월" */
export function tenure(start: string, now: Date = new Date()): string {
  const [y, m] = start.split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  return rest === 0 ? `${years}년` : `${years}년 ${rest}개월`;
}
