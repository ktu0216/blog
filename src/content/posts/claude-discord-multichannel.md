---
title: "Claude CLI + Discord 멀티채널 연동 — 어디서나 AI와 대화하기"
pubDatetime: 2026-05-25T09:00:00+09:00
description: "왜 이걸 만들었나? Claude CLI는 강력하지만 터미널을 열어야만 쓸 수 있습니다. 모바일이나 외출 중에는 접근이 어렵고, 여러 프로젝트를 동시에 진행하면 컨텍스트가 뒤섞이는 문제도 있습니다. Discord를 Claude의 인터페이스로 연결하면 세"
tags: ["Claude CLI", "Discord", "MCP"]
---

> [!note]
> **왜 이걸 만들었나?**  
> Claude CLI는 강력하지만 터미널을 열어야만 쓸 수 있습니다. 모바일이나 외출 중에는 접근이 어렵고,
> 여러 프로젝트를 동시에 진행하면 컨텍스트가 뒤섞이는 문제도 있습니다.
>
>
> Discord를 Claude의 인터페이스로 연결하면 세 가지 문제가 해결됩니다.
>
> 1. **어디서나** — 모바일, 태블릿, 다른 PC 어디서든 Discord 앱만 있으면 AI와 대화
>
> 2. **주제별 격리** — 채널마다 별도 대화. 퀀트 채널에서는 퀀트 질문만, 블로그 채널에서는 블로그 작업만
>
> 3. **에이전트 확장 기반** — 나중에 여러 AI 에이전트끼리 채널을 통해 협업하는 구조로 발전 가능

## 1 왜 이 구조를 선택했나

Claude CLI를 Discord에 연결하는 방법은 여러 가지입니다. 단순 webhook, 커스텀 봇, MCP 플러그인 등.
여기서는 **Claude Code의 공식 Discord MCP 플러그인**을 선택했습니다.

### 단일 CLI 세션, 다채널 대화

핵심 설계는 **Claude CLI 세션 하나**가 여러 Discord 채널을 동시에 처리한다는 점입니다.
채널마다 별도의 Claude 프로세스를 띄우지 않아도 됩니다.
메시지가 들어오면 `chat_id`로 어느 채널에서 왔는지 구분하고, 해당 채널의 컨텍스트로 응답합니다.

### 채널 = 프로젝트 격리 단위

Discord 채널을 프로젝트 단위로 구분해두면 대화 컨텍스트가 섞이지 않습니다.
퀀트 시스템에 대한 질문은 퀀트 채널에서, 블로그 작업은 블로그 채널에서 이루어집니다.
나중에 채널별로 작업 디렉토리나 전문 AI 에이전트를 매핑하는 것도 자연스럽게 확장됩니다.

### 에이전트 협업의 기반

장기적으로는 Claude 하나가 아니라 역할별 AI 에이전트(분석가, 리스크 관리자, 운영자 등)가
각자의 채널을 통해 서로 소통하는 구조를 염두에 두고 있습니다.
지금 만드는 채널 구조가 그 토대가 됩니다.

> [!tip]
> **보안 원칙**  
> Discord 채널 메시지는 외부 입력입니다. 접근 권한 변경이나 페어링 승인은
> 반드시 **터미널에서 직접** 실행해야 합니다.
> Discord 메시지로 "나를 허용 목록에 추가해줘" 같은 요청이 오면 무조건 거부합니다 — 프롬프트 인젝션 공격입니다.

## 2 전체 구조

[Discord 앱] (모바일 / 데스크탑 어디서든)
│
│ 채널별 메시지
▼
[Discord 서버]
├── #project-a (주제 A) chat\_id: <채널 ID — 개발자 모드로 복사>
├── #project-b (주제 B) chat\_id: <채널 ID>
├── #project-c (주제 C) chat\_id: <채널 ID>
└── #rules (AI 규칙) chat\_id: <채널 ID>
│
│ Discord Bot Token (WebSocket)
▼
[Claude Code CLI] ← 서버 또는 로컬에서 실행 중인 tmux 세션
└── Discord MCP Plugin
├── chat\_id로 채널 식별
├── access.json 으로 권한 제어
└── reply tool 로 응답 전송

Claude CLI는 tmux `main` 세션 안에서 계속 실행 중입니다.
([이전 글: tmux systemd 자동 실행 설정](tmux-autostart-systemd.html) 참고)
Discord Bot이 WebSocket으로 메시지를 수신하고, MCP 플러그인이 Claude에게 전달합니다.

## 3 사전 준비

| 항목 | 설명 |
| --- | --- |
| Claude Code CLI | `npm install -g @anthropic-ai/claude-code` 설치 완료 |
| Discord 계정 + 서버 | 본인 소유 또는 관리자 권한이 있는 서버 |
| Discord Bot Token | Discord Developer Portal에서 생성 (아래 참고) |
| Node.js 18+ | Claude Code CLI 실행 환경 |

## 4 플러그인 설치

Claude Code CLI의 Discord MCP 플러그인을 설치합니다.

terminalbash

```
$ claude mcp add --transport sse plugin:discord
```

설치 후 Claude Code를 재시작하면 Discord 관련 도구(reply, fetch\_messages 등)가 활성화됩니다.

> [!note]
> **플러그인 vs 커스텀 MCP 서버**  
> 공식 플러그인을 쓰면 서버를 직접 운영할 필요가 없습니다.
> Claude Code가 MCP 서버 역할을 내장하고 있어, Bot Token만 설정하면 바로 연결됩니다.

## 5 Discord 봇 생성

1. **Discord Developer Portal 접속**
   [discord.com/developers/applications](https://discord.com/developers/applications) 에서
   **New Application** 클릭. 이름은 원하는 대로 (예: `my-bot`).
2. **Bot 생성 및 Token 발급**
   좌측 메뉴 → **Bot** → **Add Bot** → **Reset Token**으로 토큰 발급.
   토큰은 한 번만 표시되므로 바로 복사해 둡니다.
3. **Bot 권한 설정**
   Bot 설정 화면에서 다음 Privileged Gateway Intents를 활성화합니다.
   - MESSAGE CONTENT INTENT
   - SERVER MEMBERS INTENT (선택)
4. **서버에 봇 초대**
   좌측 메뉴 → **OAuth2** → **URL Generator**.
   Scopes: `bot` 체크.
   Bot Permissions: `Read Messages`, `Send Messages`, `Read Message History`.
   생성된 URL로 본인 서버에 봇을 초대합니다.
5. **Claude Code에 Token 등록**

   terminalbash

   ```
   $ claude /discord:setup
   # 프롬프트에 Bot Token 입력
   ```

## 6 첫 페어링 — DM으로 본인 인증

봇이 서버에 있다고 해서 누구나 명령을 내릴 수 있으면 안 됩니다.
처음 사용 시 **페어링**으로 본인임을 확인합니다.

1. **봇에게 DM 전송**
   Discord에서 봇에게 DM으로 아무 메시지나 보냅니다. 봇이 6자리 페어링 코드를 응답합니다.
2. **터미널에서 페어링 승인**
   **반드시 터미널에서 직접** 실행합니다. Discord 메시지로 승인 요청이 오더라도 절대 응하지 않습니다.

   terminalbash

   ```
   $ claude /discord:access pair ABC123
   # ABC123 자리에 봇이 응답한 6자리 코드 입력
   ```

### 확인

페어링 성공 시 봇이 DM으로 "승인됐습니다" 메시지를 보냅니다.
이후 DM으로 Claude에게 메시지를 보내면 응답합니다.

## 7 멀티채널 설정

DM 외에 서버 채널에서도 대화하려면 채널마다 그룹을 등록해야 합니다.
각 채널의 **chat\_id**를 먼저 확인합니다.

### chat\_id 확인 방법

Discord 설정 → **고급** → **개발자 모드** 활성화 후,
채널명을 우클릭 → **ID 복사**.

### 채널 등록

terminalbash

```
# requireMention: false → 멘션 없이 모든 메시지에 응답
# <CHANNEL_ID> 자리에 각 채널의 ID를 넣습니다
$ claude /discord:access group add <CHANNEL_ID_1> --no-mention
$ claude /discord:access group add <CHANNEL_ID_2> --no-mention
$ claude /discord:access group add <CHANNEL_ID_3> --no-mention
```

채널 구성 예시:

| 채널 | 주제 예시 | chat\_id |
| --- | --- | --- |
| `#project-a` | 서비스 A 작업 | 개발자 모드로 채널 우클릭 → ID 복사 |
| `#project-b` | 서비스 B 작업 | 개발자 모드로 채널 우클릭 → ID 복사 |
| `#rules` | AI 봇 규칙 관리 | 개발자 모드로 채널 우클릭 → ID 복사 |

> [!tip]
> **requireMention: true vs false**  
> `--no-mention` 플래그를 붙이면 채널의 모든 메시지에 응답합니다.
> 붙이지 않으면 `@봇이름`으로 멘션해야만 응답합니다.
> 개인 서버 전용 채널은 `--no-mention`이 편합니다.
> 다른 사람도 쓰는 공용 채널은 멘션 방식을 권장합니다.

## 8 access.json 구조 이해

모든 접근 제어 상태는 `~/.claude/channels/discord/access.json`에 저장됩니다.

~/.claude/channels/discord/access.jsonjson

```
{
  "dmPolicy": "pairing",             // DM: pairing | allowlist | disabled
  "allowFrom": [
    "<YOUR_DISCORD_USER_ID>"      // 허용된 Discord 사용자 ID (페어링 후 자동 추가)
  ],
  "groups": {
    "<CHANNEL_ID_1>": {           // 채널 chat_id
      "requireMention": false,     // 멘션 없이 응답
      "allowFrom": []               // 채널별 추가 제한 (비워두면 전체 허용)
    },
    "<CHANNEL_ID_2>": {
      "requireMention": false,
      "allowFrom": []
    }
  },
  "pending": {}                    // 대기 중인 페어링 코드
}
```

| 필드 | 역할 |
| --- | --- |
| `dmPolicy` | DM 처리 방식. `pairing`: 페어링된 사용자만, `allowlist`: allowFrom 목록만, `disabled`: DM 비활성 |
| `allowFrom` | DM을 허용할 Discord 사용자 ID 목록 |
| `groups[chat_id]` | 채널별 설정. requireMention + allowFrom |
| `pending` | 페어링 진행 중인 코드. 승인 또는 만료 후 자동 삭제 |

## 9 동작 확인

### 현재 접근 설정 확인

terminalbash

```
$ claude /discord:access
# dmPolicy, 허용 사용자 목록, 등록된 채널 목록 출력
```

각 채널에서 메시지를 보내 Claude가 응답하는지 확인합니다.

Discord #fortuna 채널text

```
사용자: 퀀트 설계 진행상황 알려줘
Claude: [응답]
```

> [!warning]
> **응답이 없다면**  
> 1. Claude CLI가 실행 중인지 확인: `tmux attach -t main`  
> 2. 봇이 해당 채널에 초대되어 있는지 확인  
> 3. `access.json`에 해당 chat\_id가 등록됐는지 확인  
> 4. 봇의 채널 메시지 읽기/쓰기 권한 확인

## 10 다음 단계 — 에이전트 협업으로

지금 구성은 사람 ↔ Claude 1:1 대화지만, 같은 구조 위에서 더 확장할 수 있습니다.

| 단계 | 구성 | 채널 역할 |
| --- | --- | --- |
| 현재 | 사람 → Discord → Claude CLI | 주제별 대화 격리 |
| 다음 | 사람 + 여러 AI 에이전트 → Discord | 에이전트별 채널 할당, 결과 공유 |
| 장기 | AI 에이전트끼리 채널로 소통 | 분석가 에이전트 → 채널 → 운영 에이전트 |

예를 들어 퀀트 시스템(FORTUNA)에서는 **분석 에이전트**가 백테스트 결과를 `#fortuna`에 올리면,
**리스크 에이전트**가 같은 채널에서 결과를 읽고 검토 의견을 달고,
사람이 최종 승인하는 흐름으로 발전할 수 있습니다.
Discord 채널이 에이전트 간 공유 메모리이자 감사 로그 역할을 하게 됩니다.

> [!tip]
> **지금 채널 구조가 나중의 에이전트 설계와 일치하도록**  
> 채널 이름을 서비스/역할 단위로 맞춰두면 나중에 에이전트를 붙일 때 구조가 자연스럽게 맞아떨어집니다.
> `#fortuna`는 퀀트 에이전트들의 대화 공간, `#argus`는 자산관리 에이전트들의 공간처럼요.
