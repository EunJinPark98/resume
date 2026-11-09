/**
 * 빌드 마지막 단계: SSR 번들로 각 경로의 HTML을 정적 생성한다.
 *  - dist/<route>/index.html, 404.html
 *  - 글꼴 복사, sitemap.xml, robots.txt, .nojekyll
 */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const BASE = process.env.BASE_PATH ?? "/resume/";
const ORIGIN = process.env.SITE_ORIGIN ?? "https://eunjinpark98.github.io";
const siteUrl = (p = "") => `${ORIGIN}${BASE}${p}`;

const manifest = JSON.parse(await readFile(join(dist, ".vite/manifest.json"), "utf8"));
const entry = manifest["src/client/main.ts"];
// cssCodeSplit:false 이면 CSS가 별도 키(style.css)로 나온다 — 전부 모은다
const cssFiles = [
  ...new Set(Object.values(manifest).flatMap((m) => [...(m.css ?? []), ...(m.file.endsWith(".css") ? [m.file] : [])])),
];

const { getRoutes, profile } = await import(pathToFileURL(join(root, ".ssr/entry-server.js")).href);

const now = process.env.BUILD_DATE ? new Date(process.env.BUILD_DATE) : new Date();
const routes = getRoutes(now);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function personJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.nameKo,
    alternateName: profile.nameEn,
    jobTitle: profile.role,
    url: siteUrl(),
    email: `mailto:${profile.email}`,
    worksFor: { "@type": "Organization", name: profile.company },
    knowsAbout: ["Java", "Spring", "SQL", "Oracle", "React", "Next.js", "TypeScript"],
    sameAs: [profile.github, profile.devBlog],
  }).replace(/</g, "\\u003c");
}

function page(route) {
  const url = siteUrl(route.path === "404.html" ? "" : route.path);
  const ogImage = siteUrl("og.png");
  const head = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    `<meta name="author" content="${esc(profile.nameKo)}">`,
    route.noindex ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${url}">`,
    `<meta name="theme-color" content="#fafaf8">`,
    `<meta name="format-detection" content="telephone=no">`,
    `<meta property="og:type" content="${route.path === "" ? "profile" : "article"}">`,
    `<meta property="og:site_name" content="박은진 | 풀스택 개발자">`,
    `<meta property="og:locale" content="ko_KR">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="박은진 — 안정적인 운영을 넘어, 더 나은 시스템을 만드는 개발자">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<link rel="icon" href="${BASE}favicon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${BASE}apple-touch-icon.png">`,
    `<link rel="stylesheet" href="${BASE}fonts/pretendardvariable-dynamic-subset.css">`,
    ...cssFiles.map((f) => `<link rel="stylesheet" href="${BASE}${f}">`),
    `<script>document.documentElement.classList.add("js")</script>`,
    `<script type="module" src="${BASE}${entry.file}"></script>`,
    route.path === "" ? `<script type="application/ld+json">${personJsonLd()}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return `<!doctype html>
<html lang="ko">
  <head>
    ${head}
  </head>
  <body>
${route.render()}
  </body>
</html>
`;
}

for (const route of routes) {
  const out = join(dist, route.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page(route));
  console.log(`  prerendered  /${route.path || ""}  →  ${route.file}`);
}

// 글꼴 (Pretendard Variable, 동적 서브셋 — 필요한 글자 묶음만 내려받는다)
const fontSrc = join(root, "node_modules/pretendard/dist/web/variable");
await mkdir(join(dist, "fonts"), { recursive: true });
const fontCss = (await readFile(join(fontSrc, "pretendardvariable-dynamic-subset.css"), "utf8"))
  .replace(/\/\*(?![\s\S]*?Copyright)[\s\S]*?\*\//g, "") // 라이선스 주석만 남기고 제거
  .replace(/\s*\n\s*/g, "")
  .replace(/\s*([{}:;,])\s*/g, "$1");
await writeFile(join(dist, "fonts/pretendardvariable-dynamic-subset.css"), fontCss);
await cp(join(fontSrc, "woff2-dynamic-subset"), join(dist, "fonts/woff2-dynamic-subset"), { recursive: true });

// sitemap / robots / .nojekyll
const indexable = routes.filter((r) => !r.noindex);
const lastmod = now.toISOString().slice(0, 10);
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((r) => `  <url><loc>${siteUrl(r.path)}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>
`,
);
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl("sitemap.xml")}\n`);
await writeFile(join(dist, ".nojekyll"), "");

await rm(join(dist, ".vite"), { recursive: true, force: true });
await rm(join(root, ".ssr"), { recursive: true, force: true });
console.log(`\n  ${routes.length} pages → dist/  (base: ${BASE})`);
