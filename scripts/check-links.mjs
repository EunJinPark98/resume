/**
 * dist/ 의 모든 HTML에서 내부 링크·이미지·앵커가 실제로 존재하는지 검사한다.
 * 외부 링크는 목록만 출력한다 (--external 옵션 시 HEAD 요청으로 확인).
 */
import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const BASE = process.env.BASE_PATH ?? "/resume/";
const checkExternal = process.argv.includes("--external");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = await walk(dist);
const ids = new Map();
const htmlOf = new Map();
for (const f of pages) {
  const html = await readFile(f, "utf8");
  htmlOf.set(f, html);
  ids.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const errors = [];
const external = new Set();
const exists = (p) => stat(p).then(() => true, () => false);

for (const [file, html] of htmlOf) {
  const page = relative(dist, file);
  for (const [, attr, url] of html.matchAll(/\s(href|src|srcSet|srcset)="([^"]+)"/g)) {
    const urls = attr.toLowerCase() === "srcset" ? url.split(",").map((s) => s.trim().split(/\s+/)[0]) : [url];
    for (const u of urls) {
      if (/^https?:/.test(u)) { external.add(u); continue; }
      if (/^(mailto:|tel:|data:)/.test(u)) continue;
      if (u.startsWith("#")) {
        if (u.length > 1 && !ids.get(file).has(u.slice(1))) errors.push(`${page}: 앵커 없음 ${u}`);
        continue;
      }
      if (!u.startsWith(BASE)) { errors.push(`${page}: base 경로 누락 ${u}`); continue; }
      const [pathPart, hash] = u.slice(BASE.length).split("#");
      let target = join(dist, decodeURIComponent(pathPart));
      if (pathPart === "" || pathPart.endsWith("/")) target = join(target, "index.html");
      if (!(await exists(target))) { errors.push(`${page}: 파일 없음 ${u}`); continue; }
      if (hash && target.endsWith(".html") && !ids.get(target)?.has(hash)) errors.push(`${page}: 앵커 없음 ${u}`);
    }
  }
  // 접근성 기본 점검
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(img)) errors.push(`${page}: alt 없는 이미지`);
  if (!/<html lang="ko">/.test(html)) errors.push(`${page}: lang 누락`);
  const h1 = (html.match(/<h1\b/g) ?? []).length;
  if (h1 !== 1) errors.push(`${page}: h1 개수 ${h1}`);
  const dupIds = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) !== i);
  if (dupIds.length) errors.push(`${page}: 중복 id ${[...new Set(dupIds)].join(", ")}`);
}

console.log(`검사한 페이지 ${pages.length}개`);
if (checkExternal) {
  for (const u of external) {
    try {
      const r = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000) });
      console.log(`  ${r.ok ? "✓" : "✗"} ${r.status} ${u}`);
      if (!r.ok) errors.push(`외부 링크 ${r.status} ${u}`);
    } catch (e) {
      console.log(`  ? ${u} (${e.cause?.code ?? e.name})`);
    }
  }
} else {
  console.log(`외부 링크 ${external.size}개 (확인하려면 --external)`);
}
if (errors.length) {
  console.error(`\n문제 ${errors.length}건:\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("내부 링크 · 앵커 · 이미지 alt · h1 · 중복 id 이상 없음");
