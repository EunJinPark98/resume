/**
 * 빌드된 dist/ 를 띄워 정적 자산을 만든다 (Playwright 필요 — 로컬에서 실행 후 커밋).
 *  - public/park-eunjin-resume.pdf : 경력기술서(/career/) 인쇄 레이아웃 → A4 PDF
 *  - public/og.png                 : 1200×630 공유 미리보기 이미지
 *  - public/apple-touch-icon.png   : 180×180 아이콘
 * 사용: npm run build && npm run assets && npm run build
 */
import { createRequire } from "node:module";
import { copyFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { start } from "./serve.mjs";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = await import("playwright"));
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const dist = join(root, "dist");
const BASE = process.env.BASE_PATH ?? "/resume/";
const port = 4199;
const server = await start(port);
const origin = `http://localhost:${port}${BASE}`;
const browser = await chromium.launch();

try {
  // 1) 이력서 PDF
  const page = await browser.newPage();
  await page.goto(`${origin}career/`, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: join(pub, "park-eunjin-resume.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate:
      '<div style="width:100%;font-size:7.5pt;color:#646b78;padding:0 14mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>박은진 · 경력기술서</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
  });
  console.log("  ✓ park-eunjin-resume.pdf");

  // 2) OG 이미지
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.setContent(`<!doctype html><html lang="ko"><head>
    <link rel="stylesheet" href="${origin}fonts/pretendardvariable-dynamic-subset.css">
    <style>
      *{margin:0;box-sizing:border-box}
      body{width:1200px;height:630px;background:#fafaf8;font-family:"Pretendard Variable",sans-serif;color:#13161c;
        padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;word-break:keep-all}
      .k{font:600 22px ui-monospace,Menlo,monospace;letter-spacing:.06em;color:#1d3a6e;text-transform:uppercase}
      h1{font-size:68px;line-height:1.2;letter-spacing:-.045em;font-weight:760}
      h1 span{display:block;color:#646b78;font-weight:600}
      .f{display:flex;justify-content:space-between;align-items:flex-end;border-top:3px solid #13161c;padding-top:24px}
      .n{font-size:34px;font-weight:750;letter-spacing:-.02em}
      .s{font-size:22px;color:#363c48;margin-top:4px}
      .t{font-size:22px;color:#1d3a6e;font-weight:650;text-align:right}
    </style></head><body>
    <p class="k">Park Eunjin — Full-stack Web Developer</p>
    <h1><span>안정적인 운영을 넘어,</span>더 나은 시스템을 만드는 개발자.</h1>
    <div class="f"><div><p class="n">박은진</p><p class="s">대국민 웹서비스 개발·운영 · 2023.12 – 현재</p></div>
    <p class="t">Java · Spring · SQL<br>React · Next.js</p></div></body></html>`, { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  await og.waitForTimeout(300);
  await og.screenshot({ path: join(pub, "og.png") });
  console.log("  ✓ og.png");

  // 3) apple-touch-icon
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${origin}fonts/pretendardvariable-dynamic-subset.css">
    <style>*{margin:0}body{width:180px;height:180px;background:#1d3a6e;display:grid;place-items:center;
    font:700 84px "Pretendard Variable",sans-serif;color:#fff}</style></head><body>박</body></html>`, { waitUntil: "networkidle" });
  await icon.evaluate(() => document.fonts.ready);
  await icon.waitForTimeout(200);
  await icon.screenshot({ path: join(pub, "apple-touch-icon.png") });
  console.log("  ✓ apple-touch-icon.png");

  for (const f of ["park-eunjin-resume.pdf", "og.png", "apple-touch-icon.png"]) {
    await copyFile(join(pub, f), join(dist, f));
  }
} finally {
  await browser.close();
  server.close();
}
