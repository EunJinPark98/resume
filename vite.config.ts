import { defineConfig } from "vite";

/**
 * 배포 경로. GitHub Pages 프로젝트 사이트(eunjinpark98.github.io/resume/)가 기본값.
 * 사용자 루트 사이트로 옮길 때는 BASE_PATH=/ 로 빌드한다.
 */
const base = process.env.BASE_PATH ?? "/resume/";

export default defineConfig(({ isSsrBuild }) => ({
  base,
  esbuild: { jsx: "automatic" },
  build: {
    manifest: !isSsrBuild,
    copyPublicDir: !isSsrBuild,
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: isSsrBuild ? undefined : { input: "src/client/main.ts" },
  },
}));
