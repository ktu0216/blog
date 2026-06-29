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
    editPost: {
      enabled: true,
      url: "https://github.com/ktu0216/blog/edit/main/",
    },
    search: "pagefind",
  },
  socials: [{ name: "github", url: "https://github.com/ktu0216/blog" }],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
