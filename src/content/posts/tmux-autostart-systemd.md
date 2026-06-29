---
title: "재부팅 후 tmux + Claude CLI Discord 봇 자동 실행 (systemd user service)"
pubDatetime: 2026-05-21T09:00:00+09:00
description: "왜 이걸 설정했나? Claude CLI를 Discord 봇(mybot)으로 항상 켜두고 싶었습니다. Discord에서 메시지를 받으면 언제든 응답할 수 있어야 하고, 서버를 재부팅해도 자동으로 다시 살아나야 합니다. 그러려면 두 가지가 필요합니다. 1"
tags: ["Linux", "tmux", "systemd"]
---

> [!note]
> **왜 이걸 설정했나?**  
> Claude CLI를 Discord 봇(`mybot`)으로 항상 켜두고 싶었습니다.
> Discord에서 메시지를 받으면 언제든 응답할 수 있어야 하고, 서버를 재부팅해도
> 자동으로 다시 살아나야 합니다.
>
>
> 그러려면 두 가지가 필요합니다.
>
> 1. **tmux `main` 세션이 부팅 시 자동 생성** — 이 글의 주제
>
> 2. **그 세션에 Claude CLI가 자동 attach + 실행** — 마지막 섹션
>
>
> `systemd user service`를 이용해 두 단계를 분리해서 관리합니다.
> tmux와 Claude의 의존성을 깔끔히 표현할 수 있고, 어느 한쪽이 죽어도
> 독립적으로 재시작할 수 있습니다.

## 1 배경 — 왜 필요한가

서버나 데스크톱을 재부팅할 때마다 tmux 세션을 수동으로 만드는 건 번거롭습니다.
특히 **백그라운드 프로세스, CLI 에이전트, 모니터링 도구** 등을 tmux 세션 안에서
실행하고 있다면, 재부팅 후 자동으로 세션이 준비되어 있어야 합니다.

**systemd user service**를 이용하면 로그인 없이도 부팅 시 tmux `main`
세션이 자동 생성되고, 이후 어디서든 `tmux attach -t main`으로 바로 접속할 수 있습니다.

> [!note]
> **systemd user service란?**  
> root 권한 없이 일반 사용자 계정 수준에서 서비스를 등록·관리하는 방식입니다.
> `~/.config/systemd/user/` 경로에 `.service` 파일을 만들고
> `systemctl --user` 명령으로 제어합니다.

## 2 동작 방식

전체 흐름은 다음과 같습니다:

boot sequencetext

```
부팅
 └─ systemd (user) 시작
     └─ tmux.service 실행
         └─ tmux new-session -d -s main   ← 백그라운드로 main 세션 생성
             └─ 이후 언제든 tmux attach -t main 으로 접속 가능
```

| 항목 | 값 | 설명 |
| --- | --- | --- |
| 서비스 파일 경로 | `~/.config/systemd/user/tmux.service` | 사용자 레벨 서비스 |
| 세션 이름 | `main` | 기본 세션명 |
| 실행 방식 | `Type=forking` | tmux가 데몬으로 분기 |
| 재시작 정책 | `Restart=on-failure` | 비정상 종료 시 재시작 |

## 3 설정 방법 (단계별)

- **서비스 파일 디렉터리 생성**

  아직 없다면 만들어줍니다.

  terminalbash

  ```
  $ mkdir -p ~/.config/systemd/user
  ```
- **서비스 파일 작성**

  아래 내용을 `~/.config/systemd/user/tmux.service`로 저장합니다.

  ~/.config/systemd/user/tmux.service
  ini

  ```
  [Unit]
  Description=tmux default session
  After=network.target

  [Service]
  Type=forking
  ExecStart=/usr/bin/tmux new-session -d -s main
  ExecStop=/usr/bin/tmux kill-server
  Restart=on-failure

  [Install]
  WantedBy=default.target
  ```
- **systemd 데몬 재로드 & 서비스 활성화**

  terminalbash

  ```
  # 파일 변경사항 반영
  $ systemctl --user daemon-reload

  # 부팅 시 자동실행 등록
  $ systemctl --user enable tmux.service

  # 지금 당장 시작 (선택)
  $ systemctl --user start tmux.service
  ```
- **lingering 활성화 (선택 — 로그인 전에도 실행되어야 할 때)**

  기본적으로 user service는 로그인 후에 시작됩니다.
  SSH 서버처럼 **로그인 없이도 부팅 직후 실행**이 필요하다면 아래 명령을 추가합니다.

  terminalbash

  ```
  $ sudo loginctl enable-linger $USER
  ```

  > [!warning]
> **데스크톱 환경**이라면 linger 없이도 로그인 시 자동 실행됩니다.
> 원격 서버(headless)에서만 필요한 설정입니다.

## 4 서비스 파일 전체 내용 & 옵션 설명

### ExecStart — 세션 생성

bashbash

```
/usr/bin/tmux new-session -d -s main
```

| 옵션 | 의미 |
| --- | --- |
| `new-session` | 새 세션 생성 |
| `-d` | detached 모드 — 백그라운드로 생성 (화면 attach 안 함) |
| `-s main` | 세션 이름을 `main`으로 지정 |

### Type=forking

tmux는 실행 후 자식 프로세스(서버)를 만들고 부모는 종료합니다.
systemd에게 "자식이 계속 실행되는 구조"임을 알려주어 서비스가 정상 상태로 유지됩니다.

### ExecStop — 종료 처리

bashbash

```
/usr/bin/tmux kill-server
```

`systemctl --user stop tmux.service` 실행 시 tmux 서버 전체를 종료합니다.

## 5 정상 동작 확인

terminalbash

```
# 서비스 상태 확인
$ systemctl --user status tmux.service
```

### ✅ 정상 출력 예시

outputtext

```
● tmux.service - tmux default session
     Loaded: loaded (~/.config/systemd/user/tmux.service; enabled)
     Active: active (running) since Thu 2026-05-21 09:08:52 KST
   Main PID: 2407 (tmux: server)
```

terminalbash

```
# 세션 목록 확인
$ tmux list-sessions
main: 1 windows (created Thu May 21 09:08:52 2026)

# 세션 접속
$ tmux attach -t main
```

> [!tip]
> **편의 alias 추가 (~/.zshrc 또는 ~/.bashrc)**  
> `alias t='tmux attach || tmux new -s main'`  
> 터미널을 열면 `t`만 입력해도 main 세션에 즉시 접속됩니다.

## 6 자주 쓰는 명령어

| 명령어 | 설명 |
| --- | --- |
| `systemctl --user status tmux` | 서비스 상태 확인 |
| `systemctl --user start tmux` | 서비스 시작 |
| `systemctl --user stop tmux` | 서비스 & 세션 종료 |
| `systemctl --user restart tmux` | 서비스 재시작 |
| `systemctl --user enable tmux` | 부팅 시 자동실행 등록 |
| `systemctl --user disable tmux` | 자동실행 해제 |
| `tmux attach -t main` | main 세션 접속 |
| `tmux list-sessions` | 세션 목록 확인 |
| `tmux kill-session -t main` | main 세션만 종료 |

## 7 트러블슈팅

### 서비스 시작 실패 — "session already exists"

이미 같은 이름의 세션이 있을 때 발생합니다. ExecStart를 아래처럼 수정하면 방지됩니다.

tmux.serviceini

```
ExecStart=/bin/sh -c 'tmux has-session -t main 2>/dev/null || tmux new-session -d -s main'
```

### 부팅 후 세션이 없음 (원격 서버)

lingering이 꺼져 있으면 로그인 전에 user service가 실행되지 않습니다.

terminalbash

```
$ loginctl show-user $USER | grep Linger
# Linger=no 면 아래 명령 실행
$ sudo loginctl enable-linger $USER
```

### 로그 확인

terminalbash

```
$ journalctl --user -u tmux.service -n 30
```

## 8 Claude CLI 자동 실행 (응용)

tmux 자동 실행은 그 자체로 유용하지만, 진짜 목적은 **그 위에서 어떤 프로세스를 24/7로 돌리느냐**입니다.
여기서는 Claude CLI를 Discord 봇으로 자동 기동하는 예를 봅니다.

### 의존성 모델

두 개의 systemd unit을 분리합니다.

- `tmux.service` — tmux `main` 세션을 띄움 (이전 섹션들)
- `claude-discord.service` — `main` 세션에 Claude CLI 명령을 `send-keys`로 전송

Claude 쪽이 죽거나 재시작해도 tmux 세션은 그대로 살아있어 빠르게 재기동할 수 있고,
반대로 tmux를 다시 띄워도 의존성을 따라 Claude가 다시 들어옵니다.

### claude-discord.service 전체

```
[Unit]
Description=Claude CLI - Discord (mybot bot) in tmux main session
After=network-online.target tmux.service systemd-resolved.service
Wants=network-online.target
Requires=tmux.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/bin/bash -c 'for i in $(seq 1 60); do nslookup api.anthropic.com >/dev/null 2>&1 && exit 0; sleep 2; done; exit 1'
ExecStart=/usr/bin/tmux send-keys -t main "cd /home/ && claude --dangerously-skip-permissions --channels plugin:discord@claude-plugins-official --remote-control mybot" Enter
ExecStop=/usr/bin/tmux send-keys -t main "" ""

[Install]
WantedBy=default.target
```

### 핵심 포인트

- `Requires=tmux.service` — tmux가 먼저 떠 있어야 동작
- `After=network-online.target` — 네트워크 준비 후 실행
- `ExecStartPre` — Anthropic API DNS 확인까지 최대 120초 대기 (네트워크 단계가 끝나도 DNS가 즉시 안 풀리는 경우 방어)
- `Type=oneshot + RemainAfterExit=yes` — send-keys는 한 번만 실행되면 끝. Claude CLI 자체는 tmux 세션 안에서 계속 살아 있음
- `--remote-control mybot` — Discord 봇 이름과 통신 채널 식별자

### 등록 명령

```
$ systemctl --user daemon-reload
$ systemctl --user enable claude-discord.service
$ systemctl --user start claude-discord.service
$ tmux attach -t main   # Claude가 실행 중인지 확인
```

> [!warning]
> **--dangerously-skip-permissions 사용 주의**  
> 이 옵션은 도구 호출 시 사용자 승인 단계를 건너뜁니다.
> 무인 운영을 위해 필요하지만, 신뢰할 수 없는 입력(특히 Discord 메시지)에 의한
> 부작용을 막기 위해 별도로 `ai-bot-rules.md`나 시스템 프롬프트에서
> 가드레일을 둬야 합니다.

### 동작 확인

```
$ systemctl --user status claude-discord.service
$ journalctl --user -u claude-discord.service -n 50
$ tmux capture-pane -t main -p | tail -20   # tmux 내부 출력 확인
```

이 구조 덕분에 서버를 재부팅해도 Discord 채널에 메시지가 오면 1~2분 내 Claude가 응답합니다.
tmux를 그저 자동 실행만 한 게 아니라, **AI 에이전트 운영의 토대**로 쓴 셈입니다.
