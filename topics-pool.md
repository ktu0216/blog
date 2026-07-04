# 주제 풀 (topics-pool)

ideator 에이전트의 입력. **앵커(내가 실제로 다룬 것) × 렌즈(비추는 각도)** 를 교차해 글감을 만든다.
자세한 사용법은 `agents/ideator.md` 참고.

> 이건 **시작용 씨앗**이다. 앵커는 실제 작업이 쌓일수록 계속 추가하고(나중엔 커밋·노트에서
> 자동 추출도 검토), 렌즈는 큐레이션 목록으로 천천히 다듬는다. 이미 발행한 조합은 중복 제외.

---

## 앵커 (anchor) — 내가 실제로 다룬 것

권위·차별화의 근거. **구체적인 기술·도구·사건**으로 적는다(추상 개념 금지). 축으로 묶어 관리.

### 인프라 · 운영
- FORTUNA 스케줄러를 docker compose 자동기동으로 복구(재부팅 후 컨테이너 restart 정책)
- FastAPI lifespan에 임베드한 APScheduler(별도 데몬 없이 서비스 안에서 스케줄)
- 파일 플래그 기반 kill-switch / autorun 마스터 스위치
- tmux 세션 systemd 자동기동
- Syncthing + TrueNAS + Tailscale 개인 동기화 구성

### 보안 · 네트워크
- FortiGate SSL VPN 종료 → Tailscale / AWS Client VPN 전환 비교
- ed25519 SSH 키 + MariaDB 접속 구성
- 오픈소스 라이선스 판단 가이드

### 개발 · AI 워크플로
- Claude Code 스펙 주도(spec-driven) 워크플로
- Claude ↔ Discord 멀티채널 봇 운영(채널별 컨텍스트 스위칭)
- Codex iOS 플러그인으로 SwiftUI 개발
- Astro + AstroPaper GitHub Pages 블로그 배포(Cloudflare DNS 함정 포함)
- 블로그 글에 공식 출처 인용 기준 세우기

### 퀀트 · 데이터
- Alpaca(페이퍼) / Upbit 멀티마켓 페이퍼 트레이딩 배선
- 리밸런스마다 파라미터 적응형 재최적화(자동 재최적화 루프)

---

## 렌즈 (lens) — 비추는 각도

앵커에 방향을 주는 보편적 관심사·관점. 앵커와 **다른 축**의 렌즈를 골라 교차한다.

- 장애 복구 · 자동복구 설계
- 비용 최적화(작은 조직 기준)
- 팀 온보딩 · 인수인계
- 완전 초보자의 첫걸음 관점
- 보안 · 최소 권한
- 자동화 철학(어디까지 자동화할까)
- 관측가능성 · 알림 설계
- 재현성(누가 해도 같은 결과)
- 작은 팀의 트레이드오프(단순함 vs 유연함)
- 마이그레이션 · 전환 결정
- 시행착오 회고(1차 실패 → 최종 해결)
- 개인 프로젝트를 '운영'처럼 다루기

---

## 이미 다룬 조합/주제 (중복 제외용)

발행 슬러그 기준. ideator는 `src/content/posts/*.md`로 최신 목록을 재확인한다.

- astro-static-blog · claude-code-spec-driven-workflow · claude-discord-multichannel
- codex-ios-plugin · ed25519-ssh-mariadb · opensource-licenses-guide
- syncthing-truenas-tailscale · tmux-autostart-systemd
- vpn-migration-fortigate-tailscale-aws-clientvpn
