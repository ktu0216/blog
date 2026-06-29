# 블로그 이미지 가이드 (image-maker용)

> image-maker 에이전트가 읽는 **이미지 제작 가이드**. `draft.md`의 `[IMAGE: 설명]` 마커를
> 이 규칙에 따라 실제 이미지(PNG)로 만든다. 이미지는 **본문을 돕는 보조 수단** — 텍스트는 짧게.

---

## 0. 색 팔레트 (공통 토큰 — 모든 이미지가 공유)
모든 이미지(썸네일·본문 4종)는 **하나의 브랜드 팔레트**를 공유한다. 강조색은 **사이트 강조색과 동일한 파랑 계열**(라이트 `#006cac` / 다크 `#4aa3df`)이며, 초록·주황 등 다른 강조색을 섞지 않는다. 각 HTML `<head>`에 아래 `:root`를 넣고 색은 **변수로만** 참조한다.

```css
:root{
  --img-bg:#0a1020;       /* 썸네일 그라데 시작(딥 네이비) */
  --img-bg2:#006cac;      /* 썸네일 그라데 끝(브랜드 파랑) */
  --img-panel:#0d1117;    /* 본문 도형 카드 배경(다크) */
  --img-surface:#161b22;  /* 노드/패널 배경 */
  --img-fg:#e6edf3;       /* 밝은 글자 */
  --img-muted:#8b949e;    /* 보조 글자 */
  --img-accent:#4aa3df;   /* 강조 1개만(브랜드 파랑, 다크 위 대비) */
  --img-border:#30363d;
}
```
- **색 역할은 3개로 제한**: 배경 / 글자 / **강조 1개**(+무채색 보조). 강조색은 화면의 ~10% 이하, "강조"에만.
- 강조색 변경 시 이 토큰만 바꾸면 **전 이미지가 일괄로** 바뀐다.

## 1. 대표(썸네일) 이미지 규격
- **크기**: 가로 **1080px**, 세로 **1080px** (1:1 정사각형).
- **배경**: 어두운 **브랜드-블루 그라데이션** (`--img-bg` → `--img-bg2`, 딥 네이비 → 파랑).
- **메인 텍스트**: 글 **제목** (큰 글씨, 흰색).
- **보조 텍스트**: 카테고리/부제 (작은 글씨, 연한 회색 `--img-muted`).
- **정렬**: 모든 텍스트 **가로·세로 중앙 정렬**.
- **폰트**: **Pretendard** 또는 시스템 기본 한글 폰트.
- **액센트**: 우측 하단 **또는** 좌상단에 **작은 액센트**(도형, 코드 심볼, 단순 아이콘) 하나 — 색은 `--img-accent`.

**참고 HTML/CSS 스켈레톤** (이대로 만들고 1080×1080으로 캡쳐):
```html
<!-- <head>에 §0 :root 토큰 + Pretendard 웹폰트 포함 -->
<div style="
  width:1080px;height:1080px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;gap:20px;
  background:linear-gradient(135deg,var(--img-bg) 0%,var(--img-bg2) 100%);
  font-family:'Pretendard',-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;
  position:relative;padding:80px;box-sizing:border-box;">
  <div style="font-size:72px;font-weight:800;color:#ffffff;line-height:1.25;">글 제목</div>
  <div style="font-size:34px;color:var(--img-muted);">카테고리 · 부제</div>
  <!-- 액센트(좌상단 또는 우하단): 도형/코드 심볼/아이콘 -->
  <div style="position:absolute;right:56px;bottom:56px;font-size:40px;
              color:var(--img-accent);font-family:monospace;opacity:.9;">&lt;/&gt;</div>
</div>
```

## 2. 본문 삽입 이미지 — 4종 중 글 내용에 맞게 선택
1. **비교 표** — 제품/방법을 나란히 비교할 때.
2. **단계별 다이어그램** — 절차·순서를 보여줄 때.
3. **핵심 포인트 카드** — 3~5개 요점을 정리할 때.
4. **인용/강조 박스** — 중요한 한 마디를 강조할 때.

> `[IMAGE: …]` 마커의 설명을 보고 위 4종 중 가장 맞는 형식을 고른다.
> 예: `[IMAGE: … 비교 표]` → 1번, `[IMAGE: … 단계별 다이어그램]` → 2번.
- **권장 크기**(본문): 가로 **1200px**, 높이는 내용에 맞게(가변). 대표 이미지와 **색감·톤을 통일**.

## 3. 공통 규칙
- **제작 방식**: 모두 **HTML + CSS**로 만들고, **Python + Playwright**로 **PNG 캡쳐**한다.
  ```python
  from playwright.sync_api import sync_playwright
  with sync_playwright() as p:
      b = p.chromium.launch()
      pg = b.new_page(viewport={"width": 1080, "height": 1080}, device_scale_factor=2)
      pg.goto("file:///abs/path/to/thumb.html")
      pg.screenshot(path="output/<슬러그>/images/thumb.png")  # 요소만: locator.screenshot()
      b.close()
  ```
  - 본문 이미지는 viewport 폭 1200, 높이는 콘텐츠에 맞춰 `full_page=True` 또는 해당 요소만 캡쳐.
  - 선명도를 위해 `device_scale_factor=2`(2배 해상도) 권장.
- **배경 톤**: §0 토큰(`--img-panel`/`--img-surface`)으로 **어두운 톤 통일**. 강조는 `--img-accent` 하나만.
- **텍스트는 최대한 짧게** — 이미지는 보조. 문장 나열 금지, 키워드·요점 위주.
- **코드 블록 스타일을 디자인 요소로** 활용 가능(모노스페이스 폰트, 어두운 배경, 살짝 둥근 모서리).

## 4. 산출·연결
- **저장 위치**: `output/<슬러그>/images/` (예: `thumb.png`, `compare-table.png`, `steps-diagram.png`).
- **파일명**: 의미 있게(영문 kebab-case). 대표 이미지는 `thumb.png`.
- **alt/캡션**: `../guides/seo-guide.md`의 이미지 규칙을 따른다(설명+키워드 자연 포함, 과도한 키워드 X).
- 다음 단계 **assembler**가 `draft.md`의 `[IMAGE: …]` 마커를 이 이미지들로 교체해 최종본을 만든다.
