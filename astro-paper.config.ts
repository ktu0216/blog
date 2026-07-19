import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://blog.saegida.com/",
    title: "Saegida",
    description: "시스템을 만들며 배운 것들을 기록하는 기술 블로그.",
    author: "Saegida",
    profile: "https://blog.saegida.com/",
    ogImage: "default-og.jpg",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
    // Cloudflare Web Analytics: 대시보드 → Web Analytics → 사이트 추가 후 토큰 붙여넣기
    cloudflareWebAnalyticsToken: "4a612052ae5744e2b79bee1bbc56b656",
  },
  posts: {
    perPage: 6,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [{ name: "github", url: "https://github.com/ktu0216" }],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
