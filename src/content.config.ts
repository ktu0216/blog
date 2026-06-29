import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// 마크다운 글 컬렉션. draft:true는 프로덕션 빌드에서 제외(비공개 초안).
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
