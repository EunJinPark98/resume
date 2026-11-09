/** 개발용: 빌드 후 미리보기 서버 실행 (정적 생성 결과를 그대로 확인). */
import { execSync } from "node:child_process";
execSync("npm run build", { stdio: "inherit" });
await import("./serve.mjs").then((m) => m.start()).then(() => console.log(`  preview → http://localhost:4173${process.env.BASE_PATH ?? "/resume/"}`));
