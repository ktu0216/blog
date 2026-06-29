# Assembler 에이전트

블로그 콘텐츠 파이프라인의 **4단계(마지막)**. image-maker가 이미지 경로까지 박아둔 `draft.md`를
받아, **검토용 마크다운(`final.md`)** 과 **시각 미리보기용 HTML(`final.html`)** 을 만든다.

> 파이프라인: researcher → writer → image-maker → **assembler(이 문서)**

---

## 역할 (한 줄)
완성된 글(이미지 포함)을 사람이 바로 검토·미리보기할 수 있는 최종본 2종으로 묶어낸다.

## 입력
- **`output/<주제-슬러그>/draft.md`** — 이미지가 마크다운 문법(`![alt](./images/…)`)으로 박힌 상태.
- **`output/<주제-슬러그>/images/`** — `thumbnail.png`, `body-N.png` 등.

## 출력 (산출물)
- **`output/<주제-슬러그>/final.md`** — 발행/검토용 마크다운.
- **`output/<주제-슬러그>/final.html`** — 시각 미리보기용 HTML(자체 스타일 포함, 그대로 열림).

## 작동 방식
1. **`draft.md` 읽기** — 프론트매터(YAML)와 본문을 분리한다. 본문엔 이미 `![](./images/…)`로
   이미지가 들어 있다.
2. **`final.md` 생성** — 발행용 마크다운으로 저장(프론트매터 + 본문 그대로). draft에서 더 손볼 게
   없으면 사실상 정리된 사본이다.
3. **`final.html` 생성** — 본문 마크다운을 HTML로 변환해, **기술 블로그 본문 영역과 비슷한
   스타일**의 HTML 페이지로 감싼다(아래 '스타일 요구').
   - 프론트매터의 `title`은 `<h1>`, `description`·`date`·`tags`는 상단 메타로 노출.
   - 이미지 경로는 `./images/…` 상대경로 유지 → `final.html`을 같은 폴더에서 열면 그대로 보인다.
4. **사용자 안내** — 마지막에 **`final.html`을 브라우저로 열어보라고** 경로와 함께 안내한다.

## final.html 스타일 요구
- **본문 폭 700px 정도**(가운데 정렬, 좌우 여백).
- **한글 가독성 좋은 폰트**(Pretendard 웹폰트 CDN 권장, 시스템 한글 폰트 폴백), **line-height ≈ 1.7~1.8**.
- **이미지는 본문 폭에 맞춰 자동 리사이즈**(`max-width:100%; height:auto`), 살짝 둥근 모서리.
- **제목/소제목/본문 위계가 명확**하게: `h1` 크게, `h2`·`h3` 단계적 크기·간격, 문단 간 충분한 여백.
- 코드 블록(모노스페이스·어두운 배경), 인용구(유의사항 박스), 표 스타일도 가독성 있게.
- 다크/라이트 어느 쪽이든 일관되게(본문은 밝은 배경 권장 — 읽기 편하게).

**CSS 스켈레톤**:
```css
:root{ --fg:#1a1a1a; --muted:#666; --accent:#0236c4; --border:#e5e7eb; --code-bg:#0d1117; }
body{ margin:0; background:#fff; color:var(--fg);
  font-family:'Pretendard',-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif; }
.post{ max-width:700px; margin:0 auto; padding:48px 20px 96px; line-height:1.78; font-size:18px; }
.post h1{ font-size:34px; line-height:1.3; margin:0 0 12px; }
.post .meta{ color:var(--muted); font-size:14px; margin-bottom:32px; }
.post h2{ font-size:25px; margin:48px 0 14px; padding-top:8px; }
.post h3{ font-size:20px; margin:32px 0 10px; }
.post p{ margin:18px 0; }
.post img{ max-width:100%; height:auto; border-radius:10px; display:block; margin:28px auto; }
.post pre{ background:var(--code-bg); color:#e6edf3; padding:16px; border-radius:10px; overflow:auto; font-size:15px; }
.post code{ font-family:ui-monospace,monospace; }
.post blockquote{ border-left:4px solid var(--accent); margin:24px 0; padding:8px 18px; background:#f4f7ff; color:#333; border-radius:0 8px 8px 0; }
.post table{ border-collapse:collapse; width:100%; }
.post td,.post th{ border:1px solid var(--border); padding:10px 12px; }
.post .tags{ margin-top:48px; color:var(--accent); font-size:15px; }
```

## 마크다운 → HTML 변환 (참고)
- 본문 변환은 마크다운 라이브러리로 처리한다(코드펜스·표 지원). 예(Python):
  ```python
  import markdown, pathlib, re
  raw = pathlib.Path("draft.md").read_text(encoding="utf-8")
  m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)  # 프론트매터/본문 분리
  front, body = (m.group(1), m.group(2)) if m else ("", raw)
  html_body = markdown.markdown(body, extensions=["fenced_code", "tables", "nl2br"])
  # front(YAML)에서 title/date/description/tags 뽑아 <h1>·.meta 구성 후 템플릿에 삽입
  ```
  - 실행은 `uv run --with markdown python ...`(또는 node `marked`)처럼 환경에 맞게.
- 맨 끝 해시태그 줄은 `.tags`로 감싸 노출(또는 본문 그대로).

## 자가 점검 체크리스트
- [ ] `final.md`·`final.html` 두 파일 생성됨
- [ ] `final.html`에서 **이미지가 본문 폭에 맞게** 보임(깨짐·넘침 없음)
- [ ] 본문 폭 ~700px, 한글 폰트·줄간격 가독성 OK
- [ ] 제목/소제목/본문 위계, 코드블록·인용구·표 스타일 적용
- [ ] 이미지 상대경로(`./images/…`)가 `final.html` 위치 기준으로 맞음

## 마무리 안내 (사용자에게)
- 작업 끝에 **브라우저로 미리보기**를 안내한다. 예:
  > "미리보기: `file://<절대경로>/output/<주제-슬러그>/final.html` 를 브라우저에서 열어 확인하세요."
- 발행(별도 단계, AstroPaper 기준):
  1. `final.md` → **평면 파일** `src/content/posts/<슬러그>.md` 로 이동(폴더형 `index.md` 금지 — URL이 `/posts/<슬러그>/index`로 깨짐).
  2. 이미지는 **동명 하위폴더** `src/content/posts/<슬러그>/` 에 두고, 본문 참조를 `![alt](./<슬러그>/그림.png)` 로 맞춘다.
  3. 프론트매터는 AstroPaper 스키마(`pubDatetime` 등) 확인 후 `draft: false` 로 바꿔 `main` 푸시 → 자동 배포.
