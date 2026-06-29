# CLAUDE.md

## 목적
주제를 던지면 서브 에이전트들이 리서치·글쓰기·이미지·통합을 분담해 블로그 글을 자동 생성하는 시스템. **메인 에이전트는 오케스트레이터** — 직접 작업하지 않고 위임만 한다.

## 폴더 구조
- `agents/` — 각 단계 서브 에이전트 스펙 (researcher / writer / image-maker / assembler)
- `guides/` — 작성 기준 (style-guide, seo-guide, image-guide). 에이전트가 참고
- `output/[주제-슬러그]/` — 단계별 산출물(research.md → draft.md → images/ → final.*)

## 작업 단계 (주제 입력 시)
- **Step 1 · 리서치** → `agents/researcher.md`를 따라 → `output/[주제-슬러그]/research.md` 생성
- **Step 2 · 글쓰기** → `agents/writer.md`를 따라 → `output/[주제-슬러그]/draft.md` 생성 (`[IMAGE: …]` 마커 포함)
- **Step 3 · 이미지** → `agents/image-maker.md`를 따라 → 이미지 생성 후 draft.md 마커 치환
- **Step 4 · 통합** → `agents/assembler.md`를 따라 → `final.html`, `final.md` 생성

## 규칙
- 각 단계 **사이에 사용자에게 진행 상황을 한 줄로** 알린다 (다음 단계로 넘어가기 전).
- **메인은 절대 직접 리서치/글쓰기를 하지 않는다.** 모든 실작업은 서브 에이전트에게 위임한다.
- 발행 규칙·PII는 `CONTENT-RULES.md`를 따른다 (공개 전용, 더미 PII).
