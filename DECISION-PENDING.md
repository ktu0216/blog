# 블로그 배포 결정

작성: 2026-05-25 · 갱신: 2026-06-28

## ✅ 결정됨 (2026-06-28)
- **프레임워크: Astro**, **호스팅: GitHub Pages** (정적·공개)
- 공개/비공개 분리 + 개인정보(PII) 규칙 → **[`CONTENT-RULES.md`](CONTENT-RULES.md)**
- 비공개 글: GH Pages는 공개라 "웹으로 나만 보기" 불가 → `draft`로 빌드 제외(또는 Obsidian 보관)

## ✅ 추가 결정 (2026-06-28)
- **레포명: `blog`** (그대로 유지)
- **운영: 서브도메인 `blog.<도메인>`** (루트 아님)
- ⚠️ **도메인 철자 확인 필요**: 문서엔 `saegida.com`, 메시지엔 `seagida.com` — 확정 후 CNAME/base에 반영

## 남은 결정
- 기존 HTML 유지 vs MD 변환 (Astro는 둘 다 가능 → 기본안: 기존 HTML 유지 + 신규 글은 MD)

---

## 결정해야 할 항목

| 항목 | 옵션 | 임시 메모 |
|---|---|---|
| **호스팅** | GitHub Pages / Vercel / Netlify / 자체 | 가벼우면 GH Pages, 확장성이면 Vercel |
| **레포명** | `blog` / `saegida-blog` / `saegida-web` | saegida-web이면 블로그+다른 페이지 통합 가능 |
| **도메인** | `saegida.com` 루트 / `blog.saegida.com` 서브 | 블로그 외 페이지 계획에 따라 |
| **프레임워크** | 정적 HTML / Jekyll / **Astro** / Next.js | Astro 1차 추천 |
| **기존 HTML** | 그대로 유지 / MD 변환 / 둘 다 지원 | Astro는 둘 다 가능 |
| **레포 분리 시점** | 지금 / 첫 글 추가 시 / MVP 후 | 지금 분리하면 의사결정 강제됨 |

---

## 옵션 비교

| 옵션 | 구성 | 장점 | 단점 |
|---|---|---|---|
| **A. GH Pages + 현재 HTML** | 정적 호스팅, 직접 HTML | 즉시 띄움, 비용 0 | 게시물 늘면 HTML 직접 작성 부담 |
| **B. GH Pages + Jekyll** | GitHub 기본 지원, MD | 무료, GH 통합 완벽 | 디자인 자유도 낮음, Ruby |
| **C. GH Pages + Astro** | 정적 사이트 생성기 | 빠름, MD 친화, SEO 좋음, 모던 | 빌드 단계 필요 |
| **D. Vercel + Astro/Next.js** | 외부 호스팅 | 더 유연, preview deploy, 서버 기능 가능 | GH Pages 무료 못 씀 (Vercel 무료 충당) |
| **E. saegida.com 자체 호스팅** | 본인 서버 | 자유도 최대 | 운영 부담 |

---

## 현재 1차 추천 (변경 가능)

**C (GH Pages + Astro) 또는 D (Vercel + Astro)**

이유:
- 마크다운 기반 → 글 쓰기 편함
- 빠름 + SEO 좋음
- 컴포넌트 필요 시 React/Vue/Svelte 가능
- 기존 HTML도 그대로 import 가능
- saegida.com 도메인 연결 가능

**C vs D**:
- C: GH 무료, 단순. 정적이면 충분
- D: preview deploy + 서버 기능 가능 (구독 폼 / API 등). 추후 saegida.com 전체 사이트 확장 시 유리

---

## 이어서 진행할 때 단계

1. 위 5개 결정 확정
2. `ktu0216/<repo-name>` 레포 생성
3. 프레임워크 스캐폴딩 (`npm create astro@latest` 등)
4. 기존 `posts/tmux-autostart-systemd.html` import 또는 MD 변환
5. saegida.com DNS 연결 (Cloudflare/Namecheap 등)
6. 첫 배포 + 동작 확인
7. 글 작성 워크플로우 정립 (브랜치/PR/자동 배포)

---

## 참고

- 기존 게시물: `posts/tmux-autostart-systemd.html`
- 도메인: `saegida.com` (Olympus 공통, `olympus/concept/discord-channels.md` 8절 참고)
- 서비스 설계 절차: `olympus/playbooks/service-design-playbook.md` (블로그도 이 절차 따름)
