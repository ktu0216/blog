import { defineConfig } from "astro/config";

// 커스텀 도메인(blog.saegida.com) 루트 서빙 → base 불필요.
export default defineConfig({
  site: "https://blog.saegida.com",
});
