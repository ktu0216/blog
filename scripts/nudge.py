#!/usr/bin/env python3
"""새 글이 3일째 없으면 안 쓴 소스 후보 3개를 디스코드 #블로그로 보낸다.

Orca 자동화가 하루 한 번 실행한다. 공백이 이어지면 3일마다(3·6·9일째) 다시 보낸다.
전송은 ~/code/news/notify.py의 post()를 빌려 쓴다(봇 토큰도 거기 규칙 그대로).

usage: nudge.py            # 조건 맞으면 전송
       nudge.py --dry      # 전송 없이 메시지만 출력 (조건 무시)
       nudge.py --due      # 보낼 날이면 exit 0, 아니면 1 (Orca precheck용)
       nudge.py --selftest
"""
import datetime, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS, SOURCES = ROOT / "src/content/posts", ROOT / "sources/blog-sources"
CHANNEL = "1507920706229243914"   # #블로그
GAP_DAYS, PICK = 3, 3


def front(text):
    """--- 사이 key: value 만. 값은 문자열 그대로."""
    m = re.match(r"---\n(.*?)\n---", text, re.S)
    return dict(re.findall(r"^(\w+):\s*(.*)$", m.group(1), re.M)) if m else {}


def last_published():
    dates = [front(p.read_text()) for p in POSTS.glob("*.md")]
    return max(datetime.datetime.fromisoformat(f["pubDatetime"]).date()
               for f in dates if f.get("draft", "false") != "true" and "pubDatetime" in f)


def candidates():
    taken = {p.stem for p in POSTS.glob("*.md")}   # 초안(draft)도 진행 중이니 제외
    out = []
    for s in SOURCES.glob("*/source.md"):
        f = front(s.read_text())
        if f.get("slug") in taken or f.get("anchors") == "[없음]" or f.get("disclosure") == "하":
            continue
        out.append(f)
    # 공개 수준 상 먼저, 같으면 최신 작업 먼저
    out.sort(key=lambda f: f.get("period", ""), reverse=True)   # "2026-08 ~ 2026-09"도 시작 월로 비교된다
    return sorted(out, key=lambda f: f.get("disclosure") != "상")


def message(gap, cands):
    lines = [f"📝 새 글이 {gap}일째 없습니다. 이번에 쓸 주제를 골라주세요 (남은 소스 {len(cands)}건)", ""]
    for i, f in enumerate(cands[:PICK], 1):
        lines.append(f"**{i}. {f.get('title_hint', f['slug'])}**")
        lines.append(f"`{f['slug']}` · {f.get('period', '?')} · 공개 {f.get('disclosure', '?')}")
    lines += ["", "번호나 슬러그로 답하면 그 주제로 글 작성을 시작합니다."]
    return "\n".join(lines)


def main():
    gap = (datetime.date.today() - last_published()).days
    msg = message(gap, candidates())
    if "--dry" in sys.argv:
        return print(msg)
    # ponytail: 하루 한 번 실행 전제의 나머지 연산. 실행을 건너뛴 날이 3의 배수면 그 회차는 빠진다
    due = gap >= GAP_DAYS and gap % GAP_DAYS == 0
    if "--due" in sys.argv:
        sys.exit(0 if due else 1)
    if not due:
        return print(f"skip: 마지막 발행 {gap}일 전")
    sys.path.insert(0, str(pathlib.Path.home() / "code/news"))
    from notify import ENV, post
    token = next(l.split("=", 1)[1].strip().strip('"') for l in open(ENV) if "TOKEN" in l)
    post(token, msg, CHANNEL)
    print(f"sent -> {CHANNEL}")


def selftest():
    assert front("---\nslug: a\ndraft: true\n---\n본문") == {"slug": "a", "draft": "true"}
    c = candidates()
    assert all(f["slug"] != "security-news-relay" for f in c), "글감 아님 판정은 빠져야 한다"
    assert not {f["slug"] for f in c} & {p.stem for p in POSTS.glob("*.md")}, "이미 쓴 글은 빠져야 한다"
    assert c and c[0].get("disclosure") == "상"
    assert len(message(5, c)) < 1900
    print("ok")


if __name__ == "__main__":
    selftest() if "--selftest" in sys.argv else main()
