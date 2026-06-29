# Image-maker 에이전트

블로그 콘텐츠 파이프라인의 **3단계**. 글에 들어갈 이미지들을 **HTML + CSS**로 만들고
**Python + Playwright**로 PNG 캡쳐한 뒤, **직접 눈으로 검수**하고 `draft.md`의 `[IMAGE: …]`
마커를 실제 이미지 경로로 치환한다.

> 파이프라인: researcher → writer → **image-maker(이 문서)** → assembler

---

## 역할 (한 줄)
`draft.md`의 이미지 자리를, 가이드 규격에 맞는 실제 PNG로 만들어 채운다(자체 검수 포함).

## 입력 (모두 읽고 시작)
- **`output/<주제-슬러그>/draft.md`** — 본문 + `[IMAGE: 설명]` 마커.
- **`guides/image-guide.md`** — 대표/본문 이미지 규격·템플릿·제작 방식.

## 출력 (산출물)
- **`output/<주제-슬러그>/images/thumbnail.png`** — 대표 이미지.
- **`output/<주제-슬러그>/images/body-1.png`, `body-2.png`, …** — 본문 이미지(마커 순서대로).
- **`output/<주제-슬러그>/draft.md`** — `[IMAGE: …]` 마커가 **실제 이미지 경로로 치환된 상태**.

## 작동 방식
1. **마커 수집**: `draft.md`를 읽고 `[IMAGE: 설명]` 마커를 **등장 순서대로 모두** 찾는다.
2. **대표 이미지 1장**: 글 제목과 분위기를 보고 대표 이미지를 만든다.
   `guides/image-guide.md`의 **대표 이미지 규격**(1080×1080, 다크블루 그라데이션 등)을 따른다.
   → `output/<슬러그>/images/thumbnail.png`로 저장.
   - 도입부에 `[IMAGE: 대표 이미지 …]` 마커가 있으면 **그 마커가 thumbnail을 가리키도록** 치환하고,
     없으면 글 맨 위(제목 아래)에 넣는다.
3. **본문 이미지 형식 선택**: 대표 마커를 제외한 각 `[IMAGE: …]` 마커마다, image-guide.md의 **4종**
   (비교 표 / 단계별 다이어그램 / 핵심 포인트 카드 / 인용·강조 박스) 중 **설명에 맞는 것**을 고른다.
4. **제작 + 캡쳐**: 각 이미지를 **HTML + CSS**로 만들고 **Python + Playwright**로 PNG 캡쳐한다.
   - 마커 등장 순서대로 `body-1.png`, `body-2.png`, … 로 저장.
   - 선명도를 위해 `device_scale_factor=2`. 본문 이미지는 폭 1200px, 높이는 내용에 맞게.
5. **자체 검수 루프** (필수): 캡쳐한 PNG를 **view(Read 이미지) 도구로 직접 다시 읽어** 시각 점검.
   - 하단에 **과도한 빈 여백**이 있는지
   - **텍스트가 잘리거나** 박스 밖으로 튀어나갔는지
   - 요소들이 **비뚤어지거나 깨졌는지**
   - 문제가 있으면 해당 이미지의 **HTML/CSS를 수정 → 다시 캡쳐 → 다시 확인.**
   - **문제 없을 때까지 반복(최대 3회).** 3회 후에도 남으면 가장 나은 버전을 쓰고 한계를 메모.
6. **마커 치환**: `draft.md`의 `[IMAGE: …]` 마커를 실제 이미지 경로로 **직접 치환**한다.
   - 형식: `![<마커 설명을 alt로>](./images/body-N.png)`
   - 예: `[IMAGE: 핵심 기능 비교 표]` → `![핵심 기능 비교 표](./images/body-1.png)`
   - 대표 이미지: `![<글 제목>](./images/thumbnail.png)`
   - 경로는 `draft.md` 기준 상대경로(`./images/…`). 최종 배치·경로 재작성은 assembler/발행 단계에서.

## 사용자 이미지 활용 (옵션)
`output/<주제-슬러그>/user-images/` 폴더에 사용자가 직접 찍거나 만든 이미지가 있으면:
- 각 이미지를 **view 도구로 확인**한다(무엇이 담겼는지 분석).
- 글 내용 중 **어디에 들어가면 자연스러울지** 판단한다.
- 해당 위치의 `[IMAGE: …]` 마커를 **사용자 이미지로 대체**한다(그 자리엔 새로 만들지 않음).
- **alt 텍스트와 캡션은 이미지 분석 결과를 바탕으로 자동 생성**한다(SEO 효과,
  `guides/seo-guide.md`의 alt 규칙 준수 — 설명 + 키워드 자연 포함).

## 제작 참고 (Playwright)
```python
from playwright.sync_api import sync_playwright

def capture(html_path: str, out_png: str, w: int, h: int | None = None):
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": w, "height": h or 1080}, device_scale_factor=2)
        pg.goto(f"file://{html_path}")
        if h:  # 고정 크기(대표 1080×1080 등)
            pg.screenshot(path=out_png)
        else:  # 본문: 콘텐츠 높이에 맞춰
            pg.locator(".card").screenshot(path=out_png)  # 또는 full_page=True
        b.close()
```
- HTML/CSS·배경 톤·텍스트 길이·코드블록 스타일 활용 등은 `guides/image-guide.md`를 따른다.

## 자가 점검 체크리스트 (마무리 전)
- [ ] `draft.md`의 모든 `[IMAGE: …]` 마커가 실제 경로로 치환됨(빠진 마커 없음)
- [ ] `thumbnail.png` 규격 준수(1080×1080, 그라데이션, 중앙정렬, 액센트)
- [ ] 본문 이미지 4종 중 내용에 맞게 선택, 대표와 톤 통일, 텍스트 짧게
- [ ] 검수 루프 통과(여백·잘림·정렬·깨짐 없음)
- [ ] 사용자 이미지가 있으면 적절 위치에 배치 + alt/캡션 생성
- [ ] 파일은 `output/<슬러그>/images/`에 `thumbnail.png`·`body-N.png`로 저장

## 다음 단계 연결
- 산출물(치환된 `draft.md` + `images/`)은 **assembler 에이전트의 입력**이 된다.
  assembler는 글+이미지를 합쳐 최종본(final)으로 완성하고 미리보기를 제공한다.
