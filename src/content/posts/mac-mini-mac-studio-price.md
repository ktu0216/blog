---
title: "Mac mini · Mac Studio 전 구성 가격표 — 217개 조합 한 표에"
pubDatetime: 2026-09-01T10:00:00+09:00
description: "Mac mini 112개, Mac Studio 105개. 칩·메모리·저장장치 전 조합의 미국 달러가와 한국 원화가를 한 표에 모았습니다. M4 세대는 2026-06 인상 전후 가격을 나란히 볼 수 있습니다."
tags: ["맥미니", "맥스튜디오", "AppleSilicon", "M6", "M5Ultra", "가격표", "장비가격", "홈서버", "자료실"]
draft: false
---

로컬 LLM 홈서버로 맥을 알아보다가, 애플 스토어에서 구성을 하나씩 바꿔가며 가격을 확인하는 게 번거로워서 **전 조합을 한 표에 모았습니다.**

칩 → 가격 기준 → 메모리 → 저장장치 순으로 묶여 있고, 미국 달러가와 한국 원화가를 나란히 놓았습니다. **M4·M4 Pro·M4 Max·M3 Ultra는 출시가와 2026-06 인상가를 함께** 담아서, 같은 기계가 얼마나 올랐는지 바로 비교됩니다. 인상 때 사라진 메모리 옵션도 출시가 행에 남겨뒀습니다.

살지 말지를 따지는 계산은 [로컬 LLM 홈서버, 신형 맥미니·맥스튜디오 손익분기 계산](/posts/apple-silicon-local-ai-homeserver/)에 따로 정리해뒀습니다. 이 글은 숫자만 찾아보는 용도입니다.

<style>
.pricetable {
  --bg:#EDEFF2; --surface:#FFFFFF; --surface-2:#F5F7F9; --surface-3:#E9ECF0;
  --line:#D8DDE3; --line-soft:#E8EBEF;
  --ink:#14181D; --ink-2:#565F6A; --ink-3:#878F9A;
  --accent:#1D5FA0; --accent-ink:#154B80;
  --accent-soft:rgba(29,95,160,.08); --accent-line:rgba(29,95,160,.30);
  --past:#7A6A4E; --past-soft:rgba(122,106,78,.05);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .pricetable {
    --bg:#0E1116; --surface:#161A20; --surface-2:#1B2028; --surface-3:#222932;
    --line:#2A313B; --line-soft:#222932;
    --ink:#E6EAEF; --ink-2:#98A2AE; --ink-3:#6B7480;
    --accent:#78AEE6; --accent-ink:#A8CCF2;
    --accent-soft:rgba(120,174,230,.12); --accent-line:rgba(120,174,230,.32);
    --past:#BCA97F; --past-soft:rgba(188,169,127,.05);
  }
}
:root[data-theme="dark"] .pricetable {
  --bg:#0E1116; --surface:#161A20; --surface-2:#1B2028; --surface-3:#222932;
  --line:#2A313B; --line-soft:#222932;
  --ink:#E6EAEF; --ink-2:#98A2AE; --ink-3:#6B7480;
  --accent:#78AEE6; --accent-ink:#A8CCF2;
  --accent-soft:rgba(120,174,230,.12); --accent-line:rgba(120,174,230,.32);
  --past:#BCA97F; --past-soft:rgba(188,169,127,.05);
}

.pricetable * { box-sizing:border-box; }
.pricetable {
  color:var(--ink);
  font-family:"IBM Plex Sans KR","Apple SD Gothic Neo",system-ui,sans-serif;
  font-size:15px; line-height:1.6; -webkit-font-smoothing:antialiased;
}
.pricetable .page { max-width:1000px; margin:0 auto; padding:56px 20px 96px; display:flex; flex-direction:column; gap:52px; }

.pricetable .eyebrow { font-family:"IBM Plex Mono",monospace; font-size:11.5px; letter-spacing:.14em;
  text-transform:uppercase; color:var(--ink-3); margin:0; }
.pricetable h1 { font-family:Archivo,"IBM Plex Sans KR",sans-serif; font-weight:700;
  font-size:clamp(30px,5vw,44px); line-height:1.06; letter-spacing:-.02em; margin:0; text-wrap:balance; }
.pricetable .masthead { display:flex; flex-direction:column; gap:16px; }
.pricetable .lede { margin:0; max-width:60ch; color:var(--ink-2); font-size:15.5px; }

.pricetable .facts { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); border-radius:3px; overflow:hidden; }
.pricetable .fact { background:var(--surface); padding:15px 17px; display:flex; flex-direction:column; gap:4px; }
.pricetable .fact dt { font-family:"IBM Plex Mono",monospace; font-size:10.5px; letter-spacing:.1em;
  text-transform:uppercase; color:var(--ink-3); }
.pricetable .fact dd { margin:0; font-size:14px; font-weight:500; }
.pricetable .fact dd small { display:block; font-weight:400; color:var(--ink-2); font-size:12.5px; }

.pricetable section { display:flex; flex-direction:column; gap:14px; }
.pricetable .sec-head { display:flex; align-items:baseline; justify-content:space-between; gap:14px;
  flex-wrap:wrap; border-bottom:2px solid var(--ink); padding-bottom:9px; }
.pricetable .sec-head h2 { font-family:Archivo,sans-serif; font-weight:700; font-size:22px;
  letter-spacing:-.01em; margin:0; }
.pricetable .sec-head .meta { font-family:"IBM Plex Mono",monospace; font-size:11.5px; color:var(--ink-2); }
.pricetable .legend { margin:0; font-size:12.5px; color:var(--ink-2); font-family:"IBM Plex Mono",monospace;
  display:flex; gap:16px; flex-wrap:wrap; }
.pricetable .legend .dot { color:var(--accent); }
.pricetable .legend .sw { display:inline-block; width:9px; height:9px; border-radius:2px;
  background:var(--past-soft); border:1px solid var(--past); vertical-align:-1px; margin-right:4px; }

.pricetable .tablewrap { overflow-x:auto; background:var(--surface); border:1px solid var(--line); border-radius:4px; }
.pricetable table { border-collapse:collapse; width:100%; min-width:740px; }
.pricetable thead th {
  position:sticky; top:0; z-index:2; background:var(--surface-3);
  font-family:"IBM Plex Mono",monospace; font-weight:500; font-size:11px;
  letter-spacing:.08em; text-transform:uppercase; color:var(--ink-2);
  text-align:left; padding:10px 14px; border-bottom:1px solid var(--line); white-space:nowrap;
}
.pricetable thead th.num { text-align:right; }
.pricetable tbody td,
.pricetable tbody th { padding:6px 14px; border-bottom:1px solid var(--line-soft);
  white-space:nowrap; vertical-align:middle; }
.pricetable tbody tr.tier-top > * { border-top:2px solid var(--line); }
.pricetable tbody tr.basis-top > * { border-top:1px solid var(--line); }
.pricetable tbody tr.ram-top > * { border-top:1px solid var(--line-soft); }
.pricetable tbody tr:first-child > * { border-top:none; }
.pricetable tbody tr.hist td { background:var(--past-soft); }

.pricetable th.grp { text-align:left; vertical-align:top; background:var(--surface-2);
  padding-top:12px; border-right:1px solid var(--line); }
.pricetable .grp-chip { display:block; font-family:Archivo,sans-serif; font-weight:700; font-size:16px;
  letter-spacing:-.01em; color:var(--ink); }
.pricetable .grp-cores { display:block; font-size:11.5px; color:var(--ink-2); font-weight:400;
  font-variant-numeric:tabular-nums; margin-top:1px; }
.pricetable .grp-year { display:inline-block; margin-top:6px; font-family:"IBM Plex Mono",monospace;
  font-size:10.5px; letter-spacing:.06em; color:var(--ink-3);
  border:1px solid var(--line); border-radius:2px; padding:0 5px; }

.pricetable th.basis { text-align:left; vertical-align:top; padding-top:10px; background:var(--surface-2);
  border-right:1px solid var(--line-soft); font-weight:400; }
.pricetable th.basis.hist { background:var(--past-soft); }
.pricetable .basis-kind { display:block; font-size:12.5px; font-weight:600; color:var(--ink); }
.pricetable th.basis.hist .basis-kind { color:var(--past); }
.pricetable .basis-date { display:block; font-family:"IBM Plex Mono",monospace; font-size:11px;
  color:var(--ink-3); font-variant-numeric:tabular-nums; }
.pricetable .dg { color:var(--past); font-size:9px; }

.pricetable th.ram { text-align:left; vertical-align:top; padding-top:9px;
  font-family:"IBM Plex Mono",monospace; font-weight:600; font-size:13px; color:var(--ink);
  background:var(--surface-2); border-right:1px solid var(--line-soft); }
.pricetable tr.hist th.ram { background:var(--past-soft); color:var(--ink-2); }
.pricetable td.ssd { font-family:"IBM Plex Mono",monospace; font-size:13px; color:var(--ink-2); }
.pricetable td.num { text-align:right; font-family:"IBM Plex Mono",monospace; font-size:13.5px;
  font-variant-numeric:tabular-nums; }
.pricetable td.won { color:var(--ink-2); }
.pricetable tr.hist td.num { color:var(--ink-2); }
.pricetable .dot { font-size:8px; vertical-align:middle; color:var(--accent); }
.pricetable tr.is-stock td.ssd,
.pricetable tr.is-stock td.num { background:var(--accent-soft); }
.pricetable tr.is-stock td.num { font-weight:600; color:var(--accent-ink); }
.pricetable tr.is-stock td.won { font-weight:500; }
.pricetable tr.hist.is-stock td.ssd,
.pricetable tr.hist.is-stock td.num { background:var(--past-soft); }
.pricetable tr.hist.is-stock td.num { color:var(--past); }
.pricetable tr.hist .dot { color:var(--past); }

.pricetable .notes { display:flex; flex-direction:column; gap:6px; font-size:13px; color:var(--ink-2); }
.pricetable .notes p { margin:0; }
.pricetable .notes ul.cut { margin:2px 0 2px 14px; padding-left:14px; display:flex; flex-direction:column; gap:3px; }
.pricetable .notes ul.cut li { font-size:12.5px; }
.pricetable .notes strong { color:var(--ink); font-weight:600; }
.pricetable footer { border-top:1px solid var(--line); padding-top:20px; display:flex; flex-direction:column;
  gap:10px; font-size:13px; color:var(--ink-2); }
.pricetable footer h4 { font-family:Archivo,sans-serif; font-size:13px; margin:0 0 2px; color:var(--ink); }
.pricetable footer a { color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accent-line); }
.pricetable footer a:hover,
.pricetable footer a:focus-visible { border-bottom-color:var(--accent); }
.pricetable :focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

.pricetable {
  position:relative; left:50%; transform:translateX(-50%);
  width:min(1120px, calc(100vw - 2rem));
  margin-block:2rem;
}
.pricetable .page { padding:0; gap:44px; max-width:none; }
</style>

<div class="pricetable"><div class="page">

<header class="masthead">
  <p class="eyebrow">2026.08.26 기준 · 애플 정가</p>
  <p class="lede">제품별 한 표. 칩 · 가격 기준(출시가 / 2026-06 인상가) · 메모리 × 저장장치 전 조합을
  미국 달러가와 한국 원화가로 담았다.</p>
  <dl class="facts">
    <div class="fact"><dt>신형 발표</dt><dd>2026.08.25<small>출고 9월 22일</small></dd></div>
    <div class="fact"><dt>한국 사전주문</dt><dd>8월 27일 10:00</dd></div>
    <div class="fact"><dt>최저가</dt><dd>$899 / ₩1,499,000<small>Mac mini M6 16GB·256GB</small></dd></div>
    <div class="fact"><dt>최고가</dt><dd>$18,299 / ₩31,250,000<small>M5 Ultra 36코어 256GB·16TB</small></dd></div>
  </dl>
</header>

<section>
  <div class="sec-head"><h2>Mac mini</h2><span class="meta">112개 조합</span></div>
  <p class="legend"><span><span class="dot">●</span> 애플 기본 판매 구성</span><span><span class="sw"></span>지난 가격 기준</span></p>
  <div class="tablewrap">
<table>
  <thead><tr>
    <th scope="col">칩</th><th scope="col">가격 기준</th><th scope="col">메모리</th>
    <th scope="col">저장장치</th><th scope="col" class="num">미국</th><th scope="col" class="num">한국</th>
  </tr></thead>
  <tbody>
<tr class="tier-top is-stock"><th class="grp" rowspan="12" scope="rowgroup"><span class="grp-chip">M6</span><span class="grp-cores">12코어 CPU · 12코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="12" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="4" scope="rowgroup">16GB</th><td class="ssd">256GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$899</td><td class="num won">₩1,499,000</td></tr>
<tr class="is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,099</td><td class="num won">₩1,839,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,399</td><td class="num won">₩2,349,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$1,899</td><td class="num won">₩3,199,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="4" scope="rowgroup">24GB</th><td class="ssd">256GB</td><td class="num">$1,099</td><td class="num won">₩1,839,000</td></tr>
<tr class="is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,299</td><td class="num won">₩2,179,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,599</td><td class="num won">₩2,689,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,099</td><td class="num won">₩3,539,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="4" scope="rowgroup">32GB</th><td class="ssd">256GB</td><td class="num">$1,299</td><td class="num won">₩2,179,000</td></tr>
<tr class=""><td class="ssd">512GB</td><td class="num">$1,499</td><td class="num won">₩2,519,000</td></tr>
<tr class="is-stock"><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,799</td><td class="num won">₩3,029,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,299</td><td class="num won">₩3,879,000</td></tr>
<tr class="tier-top is-stock"><th class="grp" rowspan="15" scope="rowgroup"><span class="grp-chip">M5 Pro</span><span class="grp-cores">15코어 CPU · 16코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,699</td><td class="num won">₩2,990,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,999</td><td class="num won">₩3,500,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,499</td><td class="num won">₩4,350,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$3,499</td><td class="num won">₩6,050,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$5,499</td><td class="num won">₩9,450,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$2,299</td><td class="num won">₩4,010,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,599</td><td class="num won">₩4,520,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,099</td><td class="num won">₩5,370,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,099</td><td class="num won">₩7,070,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,099</td><td class="num won">₩10,470,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$2,699</td><td class="num won">₩4,690,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,999</td><td class="num won">₩5,200,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,499</td><td class="num won">₩6,050,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,499</td><td class="num won">₩7,750,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,499</td><td class="num won">₩11,150,000</td></tr>
<tr class="tier-top"><th class="grp" rowspan="15" scope="rowgroup"><span class="grp-chip">M5 Pro</span><span class="grp-cores">18코어 CPU · 20코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB</td><td class="num">$1,899</td><td class="num won">₩3,330,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,199</td><td class="num won">₩3,840,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,699</td><td class="num won">₩4,690,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$3,699</td><td class="num won">₩6,390,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$5,699</td><td class="num won">₩9,790,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$2,499</td><td class="num won">₩4,350,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,799</td><td class="num won">₩4,860,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,299</td><td class="num won">₩5,710,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,299</td><td class="num won">₩7,410,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,299</td><td class="num won">₩10,810,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$2,899</td><td class="num won">₩5,030,000</td></tr>
<tr class="is-stock"><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$3,199</td><td class="num won">₩5,540,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,699</td><td class="num won">₩6,390,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,699</td><td class="num won">₩8,090,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,699</td><td class="num won">₩11,490,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="20" scope="rowgroup"><span class="grp-chip">M4</span><span class="grp-cores">10코어 CPU · 10코어 GPU</span><span class="grp-year">출시 2024-10</span></th><th class="basis hist" rowspan="12" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2024-10</span></th><th class="ram" rowspan="4" scope="rowgroup">16GB</th><td class="ssd">256GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$599</td><td class="num won">₩890,000</td></tr>
<tr class="hist is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$799</td><td class="num won">₩1,190,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$999</td><td class="num won">₩1,490,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$1,399</td><td class="num won">₩2,090,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="4" scope="rowgroup">24GB</th><td class="ssd">256GB</td><td class="num">$799</td><td class="num won">₩1,190,000</td></tr>
<tr class="hist is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$999</td><td class="num won">₩1,490,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$1,199</td><td class="num won">₩1,790,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$1,599</td><td class="num won">₩2,390,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="4" scope="rowgroup">32GB</th><td class="ssd">256GB</td><td class="num">$999</td><td class="num won">₩1,490,000</td></tr>
<tr class="hist"><td class="ssd">512GB</td><td class="num">$1,199</td><td class="num won">₩1,790,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$1,399</td><td class="num won">₩2,090,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$1,799</td><td class="num won">₩2,690,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="8" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="4" scope="rowgroup">16GB</th><td class="ssd">256GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$799</td><td class="num won">₩1,349,000</td></tr>
<tr class="is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$999</td><td class="num won">₩1,689,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,299</td><td class="num won">₩2,199,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$1,799</td><td class="num won">₩3,049,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="4" scope="rowgroup">24GB</th><td class="ssd">256GB</td><td class="num">$999</td><td class="num won">₩1,689,000</td></tr>
<tr class="is-stock"><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,199</td><td class="num won">₩2,029,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,499</td><td class="num won">₩2,539,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$1,999</td><td class="num won">₩3,389,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="25" scope="rowgroup"><span class="grp-chip">M4 Pro</span><span class="grp-cores">12코어 CPU · 16코어 GPU</span><span class="grp-year">출시 2024-10</span></th><th class="basis hist" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2024-10</span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,399</td><td class="num won">₩2,090,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$1,599</td><td class="num won">₩2,390,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$1,999</td><td class="num won">₩2,990,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$2,599</td><td class="num won">₩3,890,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$3,799</td><td class="num won">₩5,690,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$1,799</td><td class="num won">₩2,690,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$1,999</td><td class="num won">₩2,990,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,399</td><td class="num won">₩3,590,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$2,999</td><td class="num won">₩4,490,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,199</td><td class="num won">₩6,290,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$1,999</td><td class="num won">₩2,990,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,199</td><td class="num won">₩3,290,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,599</td><td class="num won">₩3,890,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,199</td><td class="num won">₩4,790,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,399</td><td class="num won">₩6,590,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="10" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,599</td><td class="num won">₩2,790,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$1,899</td><td class="num won">₩3,300,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,399</td><td class="num won">₩4,150,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$3,399</td><td class="num won">₩5,850,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$5,399</td><td class="num won">₩9,250,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$2,199</td><td class="num won">₩3,810,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,499</td><td class="num won">₩4,320,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,999</td><td class="num won">₩5,170,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$3,999</td><td class="num won">₩6,870,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$5,999</td><td class="num won">₩10,270,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="25" scope="rowgroup"><span class="grp-chip">M4 Pro</span><span class="grp-cores">14코어 CPU · 20코어 GPU</span><span class="grp-year">출시 2024-10</span></th><th class="basis hist" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2024-10<sup class="dg">†</sup></span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,599</td><td class="num won">₩2,390,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$1,799</td><td class="num won">₩2,690,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,199</td><td class="num won">₩3,290,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$2,799</td><td class="num won">₩4,190,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$3,999</td><td class="num won">₩5,990,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$1,999</td><td class="num won">₩2,990,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,199</td><td class="num won">₩3,290,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,599</td><td class="num won">₩3,890,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,199</td><td class="num won">₩4,790,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,399</td><td class="num won">₩6,590,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$2,199</td><td class="num won">₩3,290,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,399</td><td class="num won">₩3,590,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,799</td><td class="num won">₩4,190,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,399</td><td class="num won">₩5,090,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,599</td><td class="num won">₩6,890,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="10" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">24GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,799</td><td class="num won">₩3,130,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,099</td><td class="num won">₩3,640,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$2,599</td><td class="num won">₩4,490,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$3,599</td><td class="num won">₩6,190,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$5,599</td><td class="num won">₩9,590,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$2,399</td><td class="num won">₩4,150,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,699</td><td class="num won">₩4,660,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,199</td><td class="num won">₩5,510,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,199</td><td class="num won">₩7,210,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,199</td><td class="num won">₩10,610,000</td></tr>
  </tbody>
</table>
</div>
</section>

<section>
  <div class="sec-head"><h2>Mac Studio</h2><span class="meta">105개 조합</span></div>
  <div class="tablewrap">
<table>
  <thead><tr>
    <th scope="col">칩</th><th scope="col">가격 기준</th><th scope="col">메모리</th>
    <th scope="col">저장장치</th><th scope="col" class="num">미국</th><th scope="col" class="num">한국</th>
  </tr></thead>
  <tbody>
<tr class="tier-top is-stock"><th class="grp" rowspan="5" scope="rowgroup"><span class="grp-chip">M5 Max</span><span class="grp-cores">18코어 CPU · 32코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="5" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">36GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$2,499</td><td class="num won">₩4,290,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,799</td><td class="num won">₩4,800,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,299</td><td class="num won">₩5,650,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,299</td><td class="num won">₩7,350,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,299</td><td class="num won">₩10,750,000</td></tr>
<tr class="tier-top"><th class="grp" rowspan="15" scope="rowgroup"><span class="grp-chip">M5 Max</span><span class="grp-cores">18코어 CPU · 40코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB</td><td class="num">$3,099</td><td class="num won">₩5,310,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$3,399</td><td class="num won">₩5,820,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,899</td><td class="num won">₩6,670,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,899</td><td class="num won">₩8,370,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,899</td><td class="num won">₩11,770,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$3,499</td><td class="num won">₩5,990,000</td></tr>
<tr class="is-stock"><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$3,799</td><td class="num won">₩6,500,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$4,299</td><td class="num won">₩7,350,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$5,299</td><td class="num won">₩9,050,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$7,299</td><td class="num won">₩12,450,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">128GB</th><td class="ssd">512GB</td><td class="num">$5,099</td><td class="num won">₩8,710,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$5,399</td><td class="num won">₩9,220,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$5,899</td><td class="num won">₩10,070,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$6,899</td><td class="num won">₩11,770,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$8,899</td><td class="num won">₩15,170,000</td></tr>
<tr class="tier-top is-stock"><th class="grp" rowspan="10" scope="rowgroup"><span class="grp-chip">M5 Ultra</span><span class="grp-cores">30코어 CPU · 64코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="10" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$5,499</td><td class="num won">₩9,490,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$5,999</td><td class="num won">₩10,340,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$6,999</td><td class="num won">₩12,040,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$8,999</td><td class="num won">₩15,440,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$12,999</td><td class="num won">₩22,240,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">256GB</th><td class="ssd">1TB</td><td class="num">$9,499</td><td class="num won">₩16,290,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$9,999</td><td class="num won">₩17,140,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$10,999</td><td class="num won">₩18,840,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$12,999</td><td class="num won">₩22,240,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$16,999</td><td class="num won">₩29,040,000</td></tr>
<tr class="tier-top"><th class="grp" rowspan="10" scope="rowgroup"><span class="grp-chip">M5 Ultra</span><span class="grp-cores">36코어 CPU · 80코어 GPU</span><span class="grp-year">출시 2026-08</span></th><th class="basis" rowspan="10" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2026-08</span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB</td><td class="num">$6,799</td><td class="num won">₩11,700,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$7,299</td><td class="num won">₩12,550,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$8,299</td><td class="num won">₩14,250,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$10,299</td><td class="num won">₩17,650,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$14,299</td><td class="num won">₩24,450,000</td></tr>
<tr class="ram-top"><th class="ram" rowspan="5" scope="rowgroup">256GB</th><td class="ssd">1TB</td><td class="num">$10,799</td><td class="num won">₩18,500,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$11,299</td><td class="num won">₩19,350,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$12,299</td><td class="num won">₩21,050,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$14,299</td><td class="num won">₩24,450,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$18,299</td><td class="num won">₩31,250,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="10" scope="rowgroup"><span class="grp-chip">M4 Max</span><span class="grp-cores">14코어 CPU · 32코어 GPU</span><span class="grp-year">출시 2025-03</span></th><th class="basis hist" rowspan="5" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2025-03</span></th><th class="ram" rowspan="5" scope="rowgroup">36GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$1,999</td><td class="num won">₩3,290,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,199</td><td class="num won">₩3,590,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$2,599</td><td class="num won">₩4,190,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,199</td><td class="num won">₩5,090,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,399</td><td class="num won">₩6,890,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="5" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">36GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$2,499</td><td class="num won">₩4,290,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$2,799</td><td class="num won">₩4,800,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$3,299</td><td class="num won">₩5,650,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$4,299</td><td class="num won">₩7,350,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$6,299</td><td class="num won">₩10,750,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="20" scope="rowgroup"><span class="grp-chip">M4 Max</span><span class="grp-cores">16코어 CPU · 40코어 GPU</span><span class="grp-year">출시 2025-03</span></th><th class="basis hist" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2025-03<sup class="dg">†</sup></span></th><th class="ram" rowspan="5" scope="rowgroup">48GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$2,499</td><td class="num won">₩4,040,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,699</td><td class="num won">₩4,340,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$3,099</td><td class="num won">₩4,940,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,699</td><td class="num won">₩5,840,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$4,899</td><td class="num won">₩7,640,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB</td><td class="num">$2,699</td><td class="num won">₩4,340,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$2,899</td><td class="num won">₩4,640,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$3,299</td><td class="num won">₩5,240,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$3,899</td><td class="num won">₩6,140,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$5,099</td><td class="num won">₩7,940,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">128GB</th><td class="ssd">512GB</td><td class="num">$3,499</td><td class="num won">₩5,540,000</td></tr>
<tr class="hist"><td class="ssd">1TB</td><td class="num">$3,699</td><td class="num won">₩5,840,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$4,099</td><td class="num won">₩6,440,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$4,699</td><td class="num won">₩7,340,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$5,899</td><td class="num won">₩9,140,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="5" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">64GB</th><td class="ssd">512GB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$3,499</td><td class="num won">₩5,990,000</td></tr>
<tr class=""><td class="ssd">1TB</td><td class="num">$3,799</td><td class="num won">₩6,500,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$4,299</td><td class="num won">₩7,350,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$5,299</td><td class="num won">₩9,050,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$7,299</td><td class="num won">₩12,450,000</td></tr>
<tr class="hist tier-top is-stock"><th class="grp" rowspan="15" scope="rowgroup"><span class="grp-chip">M3 Ultra</span><span class="grp-cores">28코어 CPU · 60코어 GPU</span><span class="grp-year">출시 2025-03</span></th><th class="basis hist" rowspan="10" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2025-03</span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$3,999</td><td class="num won">₩6,590,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$4,399</td><td class="num won">₩7,190,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$4,999</td><td class="num won">₩8,090,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$6,199</td><td class="num won">₩9,890,000</td></tr>
<tr class="hist"><td class="ssd">16TB</td><td class="num">$8,599</td><td class="num won">₩13,490,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">256GB</th><td class="ssd">1TB</td><td class="num">$5,599</td><td class="num won">₩8,990,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$5,999</td><td class="num won">₩9,590,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$6,599</td><td class="num won">₩10,490,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$7,799</td><td class="num won">₩12,290,000</td></tr>
<tr class="hist"><td class="ssd">16TB</td><td class="num">$10,199</td><td class="num won">₩15,890,000</td></tr>
<tr class="basis-top is-stock"><th class="basis" rowspan="5" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB <span class="dot" aria-label="기본 구성">●</span></td><td class="num">$5,299</td><td class="num won">₩8,990,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$5,799</td><td class="num won">₩9,840,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$6,799</td><td class="num won">₩11,540,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$8,799</td><td class="num won">₩14,940,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$12,799</td><td class="num won">₩21,740,000</td></tr>
<tr class="hist tier-top"><th class="grp" rowspan="20" scope="rowgroup"><span class="grp-chip">M3 Ultra</span><span class="grp-cores">32코어 CPU · 80코어 GPU</span><span class="grp-year">출시 2025-03</span></th><th class="basis hist" rowspan="15" scope="rowgroup"><span class="basis-kind">출시가</span><span class="basis-date">2025-03<sup class="dg">†</sup></span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB</td><td class="num">$5,499</td><td class="num won">₩8,840,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$5,899</td><td class="num won">₩9,440,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$6,499</td><td class="num won">₩10,340,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$7,699</td><td class="num won">₩12,140,000</td></tr>
<tr class="hist"><td class="ssd">16TB</td><td class="num">$10,099</td><td class="num won">₩15,740,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">256GB</th><td class="ssd">1TB</td><td class="num">$7,099</td><td class="num won">₩11,240,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$7,499</td><td class="num won">₩11,840,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$8,099</td><td class="num won">₩12,740,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$9,299</td><td class="num won">₩14,540,000</td></tr>
<tr class="hist"><td class="ssd">16TB</td><td class="num">$11,699</td><td class="num won">₩18,140,000</td></tr>
<tr class="hist ram-top"><th class="ram" rowspan="5" scope="rowgroup">512GB</th><td class="ssd">1TB</td><td class="num">$9,499</td><td class="num won">₩14,840,000</td></tr>
<tr class="hist"><td class="ssd">2TB</td><td class="num">$9,899</td><td class="num won">₩15,440,000</td></tr>
<tr class="hist"><td class="ssd">4TB</td><td class="num">$10,499</td><td class="num won">₩16,340,000</td></tr>
<tr class="hist"><td class="ssd">8TB</td><td class="num">$11,699</td><td class="num won">₩18,140,000</td></tr>
<tr class="hist"><td class="ssd">16TB</td><td class="num">$14,099</td><td class="num won">₩21,740,000</td></tr>
<tr class="basis-top"><th class="basis" rowspan="5" scope="rowgroup"><span class="basis-kind">인상가</span><span class="basis-date">2026-06</span></th><th class="ram" rowspan="5" scope="rowgroup">96GB</th><td class="ssd">1TB</td><td class="num">$6,799</td><td class="num won">₩11,540,000</td></tr>
<tr class=""><td class="ssd">2TB</td><td class="num">$7,299</td><td class="num won">₩12,390,000</td></tr>
<tr class=""><td class="ssd">4TB</td><td class="num">$8,299</td><td class="num won">₩14,090,000</td></tr>
<tr class=""><td class="ssd">8TB</td><td class="num">$10,299</td><td class="num won">₩17,490,000</td></tr>
<tr class=""><td class="ssd">16TB</td><td class="num">$14,299</td><td class="num won">₩24,290,000</td></tr>
  </tbody>
</table>
</div>
</section>

<section class="notes">
  <p>· <strong>가격 기준</strong> 열이 시점을 가른다. 진하게 표시된 마지막 기준이 그 칩의 최종 판매가다.
  2026년 신형은 인상 이후에 나와 기준이 하나뿐이다.</p>
  <p>· 원화 옵션가는 <strong>달러 증분 × 환산율</strong>로 계산했다. 인상 후 ₩1,700/$, 출시 당시 ₩1,500/$.
  두 값 모두 애플코리아 실제 가격으로 검증했다 — 인상 후는 M4 Pro · M3 Ultra 옵션가,
  출시 당시는 M4 Mac mini의 메모리 · 저장장치 단계(₩890,000 → ₩1,190,000 → ₩1,490,000).</p>
  <p>· <span class="dg">†</span> 표시는 애플코리아가 시작가를 따로 게시하지 않은 구성이다. 같은 환산율로 산출했다.</p>
  <p>· 2026년 신형의 원화 옵션가는 <strong>애플코리아 사전주문 화면에서 전부 대조했다.</strong>
  아래 실값이 모두 표의 환산값(달러 증분 × ₩1,700/$)과 정확히 일치했다. (2026-09-03 확인)</p>
  <ul class="cut">
    <li><strong>Mac mini M6</strong> — 메모리 24GB +₩340,000 · 32GB +₩680,000 /
    저장장치 512GB +₩340,000 · 1TB +₩850,000 · 2TB +₩1,700,000</li>
    <li><strong>Mac mini M5 Pro</strong> — 18코어 CPU +₩340,000 / 메모리 48GB +₩1,020,000 · 64GB +₩1,700,000 /
    저장장치 1TB +₩510,000 · 2TB +₩1,360,000 · 4TB +₩3,060,000 · 8TB +₩6,460,000</li>
    <li><strong>Mac Studio M5 Max</strong> — 40코어 GPU +₩510,000 /
    저장장치 1TB +₩510,000 · 2TB +₩1,360,000 · 4TB +₩3,060,000 · 8TB +₩6,460,000</li>
    <li><strong>Mac Studio M5 Ultra</strong> — 36코어 CPU +₩2,210,000 / 메모리 256GB +₩6,800,000</li>
  </ul>
  <p>· 애플코리아는 증분을 <strong>메모리를 먼저 선택해야</strong> 저장장치 쪽에 표시한다.
  M5 Max의 48GB 이상은 40코어 GPU를, M5 Ultra의 512GB는 36코어 CPU를 함께 골라야 열린다.</p>
  <p>· M5 Ultra 36코어 모델의 512GB 메모리 옵션은 10월 말 출시. 가격 미정.</p>
  <p>· 인상 때 사라진 메모리 옵션 — 출시가 기준 행에서만 보인다.</p>
  <ul class="cut">
    <li>Mac mini M4 <strong>32GB</strong> · M4 Pro <strong>64GB</strong> — 2026-06-25 단종</li>
    <li>Mac Studio M4 Max 16코어 <strong>48GB · 128GB</strong> — 2026-06-25 단종. 이후 기본 메모리가 64GB로 올라갔다</li>
    <li>Mac Studio M3 Ultra <strong>256GB</strong> — 2026-06-25 단종. 그 전 2026-03-03에 +$1,600 → +$2,000으로 한 번 올랐다</li>
    <li>Mac Studio M3 Ultra 32코어 <strong>512GB</strong> — 2026-03-03 단종</li>
  </ul>
  <p>· M4 Max의 48GB 이상은 16코어 CPU · 40코어 GPU 업그레이드(+$300)를 함께 골라야 했다. 14코어 모델은 36GB 고정.</p>
  <p>· Mac mini 10기가비트 이더넷 옵션 +$100. 표에는 미포함.</p>
</section>

<footer>
  <h4>출처</h4>
  <p><a href="https://www.apple.com/shop/buy-mac/mac-mini">Apple Store — Mac mini</a> ·
  <a href="https://www.apple.com/shop/buy-mac/mac-studio">Apple Store — Mac Studio</a> ·
  <a href="https://www.apple.com/kr/shop/buy-mac/mac-mini">Apple 코리아</a> ·
  <a href="https://daringfireball.net/2026/08/configurations_and_pricing_for_new_mac_minis_and_mac_studios">Daring Fireball</a> ·
  <a href="https://everymac.com/systems/apple/mac_mini/specs/mac-mini-m4-pro-12-core-cpu-16-core-gpu-2024-specs.html">EveryMac — Mac mini M4 Pro</a> ·
  <a href="https://everymac.com/systems/apple/mac-studio/specs/mac-studio-m4-max-16-core-cpu-40-core-gpu-2025-specs.html">EveryMac — Mac Studio M4 Max</a> ·
  <a href="https://web.archive.org/web/20250617175425/https://www.apple.com/kr/shop/buy-mac/mac-mini">애플코리아 2025-06 아카이브</a></p>
</footer>

</div>
</div>

#맥미니 #맥스튜디오 #MacMini #MacStudio #AppleSilicon #M6 #M5Pro #M5Max #M5Ultra #맥미니가격 #맥스튜디오가격 #애플가격인상 #홈서버 #로컬LLM
