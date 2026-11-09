/** dist/ 를 실제 배포 경로(base)로 띄우는 미리보기 서버. 의존성 없음. */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, process.env.DIST_DIR ?? "dist");
const BASE = process.env.BASE_PATH ?? "/resume/";
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".pdf": "application/pdf",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".json": "application/json",
};

export function start(p = port) {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (url === "/" && BASE !== "/") { res.writeHead(302, { location: BASE }); return res.end(); }
    let rel = url.startsWith(BASE) ? url.slice(BASE.length) : null;
    let file = rel === null ? null : normalize(join(dist, rel));
    try {
      if (!file || !file.startsWith(dist)) throw 0;
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": types[".html"] });
      res.end(await readFile(join(dist, "404.html")).catch(() => "404"));
    }
  });
  return new Promise((ok) => server.listen(p, () => ok(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await start();
  console.log(`  preview → http://localhost:${port}${BASE}`);
}
