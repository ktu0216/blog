---
title: "Saegida 블로그 시작 — Astro + GitHub Pages"
date: 2026-06-28
description: "정적 사이트로 기술 블로그를 다시 세웁니다. 공개/비공개 분리와 글쓰기 규칙."
tags: ["meta", "astro"]
draft: false
---

이 블로그는 **Astro + GitHub Pages**로 운영합니다(`blog.saegida.com`).

## 글 구조

- 공개 글: 마크다운(`src/content/posts/*.md`, `draft: false`)
- 비공개 초안: `draft: true` — 프로덕션 빌드에서 제외됩니다.
- 기존 HTML 글은 `public/legacy/`에 그대로 보존해 함께 노출합니다.

공개 글에는 개인정보를 넣지 않습니다(예: `user@example.com`, `10.0.0.x`,
`<YOUR_KEY>` 같은 더미값). 자세한 규칙은 저장소의 `CONTENT-RULES.md`에 있습니다.
