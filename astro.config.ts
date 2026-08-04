import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";
import fs from "node:fs";
import path from "node:path";

/**
 * Maps each post URL to its last-modified date so the sitemap can carry
 * `lastmod`. Read straight from frontmatter — `astro:content` isn't available
 * inside the config file.
 */
function getPostLastmod() {
  const dir = path.resolve("./src/content/posts");
  const lastmod = new Map<string, string>();

  for (const file of fs.readdirSync(dir)) {
    if (!/\.mdx?$/.test(file)) continue;
    const frontmatter = fs
      .readFileSync(path.join(dir, file), "utf-8")
      .match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!frontmatter) continue;

    const date = new Date(
      frontmatter.match(/^modDatetime:\s*(\S+)/m)?.[1] ??
        frontmatter.match(/^pubDatetime:\s*(\S+)/m)?.[1] ??
        ""
    );
    if (Number.isNaN(date.getTime())) continue;

    const slug = file.replace(/\.mdx?$/, "");
    lastmod.set(new URL(`posts/${slug}/`, config.site.url).href, date.toISOString());
  }

  return lastmod;
}

const postLastmod = getPostLastmod();

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
      serialize(item) {
        const lastmod = postLastmod.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Dev-only: allow reaching `astro dev --host` by Tailscale hostname
    // (Vite blocks non-IP hosts by default). No effect on production build.
    server: {
      allowedHosts: ["ktu-ubuntu", ".ts.net"],
    },
  },
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
