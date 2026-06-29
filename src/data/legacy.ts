// 기존 HTML 글(public/legacy/*.html) — Astro 이전 글. 인덱스에 함께 노출.
export interface LegacyPost {
  title: string;
  file: string; // public/legacy/ 아래 파일명
  date: string;
}

export const legacyPosts: LegacyPost[] = [
  {
    title: "오픈소스 라이선스 한눈에 — MIT·Apache·GPL부터 AGPL까지",
    file: "opensource-licenses-guide.html",
    date: "2026-06-22",
  },
  {
    title: "Syncthing으로 여러 PC 동기화 — TrueNAS 허브 + Tailscale",
    file: "syncthing-truenas-tailscale.html",
    date: "2026-06-21",
  },
  {
    title: "클로드 코드로 시스템 만들기 — 요구사항·문서부터 가드레일까지",
    file: "claude-code-spec-driven-workflow.html",
    date: "2026-06-21",
  },
  {
    title: "Ed25519 한 번에 정리 — SSH 키·서명부터 MariaDB 인증까지",
    file: "ed25519-ssh-mariadb.html",
    date: "2026-06-04",
  },
  {
    title: "Claude CLI + Discord 멀티채널 연동 — 어디서나 AI와 대화하기",
    file: "claude-discord-multichannel.html",
    date: "2026-05-25",
  },
  {
    title: "재부팅 후 tmux + Claude CLI Discord 봇 자동 실행 (systemd user service)",
    file: "tmux-autostart-systemd.html",
    date: "2026-05-21",
  },
];
