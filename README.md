# Saegida 블로그

기술 블로그 — **Astro + GitHub Pages** (`blog.saegida.com`).

## 구조

```
blog/
├── astro.config.mjs        # site: https://blog.saegida.com
├── src/
│   ├── content.config.ts   # posts 컬렉션(draft 지원)
│   ├── content/posts/*.md  # 공개 글(draft:false) / 비공개 초안(draft:true)
│   ├── pages/
│   │   ├── index.astro     # 글 목록(공개+legacy, prod에선 draft 제외)
│   │   └── posts/[...slug].astro
│   ├── layouts/Base.astro
│   └── data/legacy.ts      # 기존 HTML 글 목록
├── public/
│   ├── CNAME               # blog.saegida.com
│   └── legacy/*.html       # Astro 이전 HTML 글(그대로 보존)
└── .github/workflows/deploy.yml  # main push → GH Pages 자동 배포
```

## 개발 / 빌드

```bash
npm install
npm run dev      # http://localhost:4321 (draft 포함 미리보기)
npm run build    # dist/ (prod — draft 제외)
npm run preview
```

## 글쓰기

1. `src/content/posts/<slug>.md` 생성, frontmatter:
   ```yaml
   ---
   title: "제목"
   date: 2026-06-28
   description: "요약(선택)"
   tags: ["tag"]
   draft: true   # 작성 중에는 true → 발행 시 false
   ---
   ```
2. **개인정보(PII) 규칙 준수** — 공개 글은 더미값으로. → [`CONTENT-RULES.md`](CONTENT-RULES.md)
3. PII 점검 후 `draft: false` → `git push` → 자동 배포.

- 비공개 유지 글은 `draft: true` 그대로(사이트 미노출, 레포엔 보존).
- 순수 개인 메모는 블로그가 아니라 Obsidian 볼트(`../ktu-docs`)에.

## 배포 (최초 1회)

1. GitHub 레포 `ktu0216/blog` 생성 후 push
2. Settings → Pages → Source: **GitHub Actions**
3. DNS: `blog.saegida.com` CNAME → `ktu0216.github.io` (Pages 커스텀 도메인)
4. main push마다 `deploy.yml`이 빌드·배포

## Posts (legacy HTML)

| 파일 | 주제 |
|---|---|
| `claude-code-spec-driven-workflow.html` | 클로드 코드 spec-driven 워크플로우 |
| `syncthing-truenas-tailscale.html` | Syncthing + TrueNAS + Tailscale |
| `opensource-licenses-guide.html` | 오픈소스 라이선스 가이드 |
| `ed25519-ssh-mariadb.html` | Ed25519 SSH·MariaDB |
| `claude-discord-multichannel.html` | Claude + Discord 멀티채널 |
| `tmux-autostart-systemd.html` | tmux + systemd 자동 실행 |
