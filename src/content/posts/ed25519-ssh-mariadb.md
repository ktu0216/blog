---
title: "Ed25519 한 번에 정리 — SSH 키·서명부터 MariaDB 인증까지"
pubDatetime: 2026-06-04T09:00:00+09:00
description: "왜 이걸 정리했나? Ed25519는 하나의 서명 알고리즘이지만 쓰임새가 여러 곳에 걸쳐 있습니다. 서버 접속용 SSH 키로 쓰고, Git 커밋·파일에 전자서명을 붙이는 데도 쓰고, 심지어 MariaDB의 비밀번호 인증까지 같은 알고리즘으로 처리할 수"
tags: ["Ed25519", "SSH", "MariaDB"]
---

> [!note]
> **왜 이걸 정리했나?**  
> Ed25519는 하나의 서명 알고리즘이지만 쓰임새가 여러 곳에 걸쳐 있습니다.
> 서버 접속용 **SSH 키**로 쓰고, Git 커밋·파일에 **전자서명**을 붙이는 데도 쓰고,
> 심지어 **MariaDB의 비밀번호 인증**까지 같은 알고리즘으로 처리할 수 있습니다.
>
>
> 세 가지가 모두 "Ed25519 키쌍으로 신원을 증명한다"는 동일한 원리 위에 있습니다.
> 이 글에서는 알고리즘의 개념을 짧게 짚고, 실제로 SSH·Git·MariaDB에 적용하는 방법을 한 번에 정리합니다.

## 1 Ed25519란 무엇인가

**Ed25519**는 **EdDSA**(Edwards-curve Digital Signature Algorithm)를
**Curve25519** 기반의 트위스티드 에드워즈 곡선(edwards25519) 위에서 구현한 공개키 전자서명 방식입니다.
2011년 Daniel J. Bernstein 등이 설계했고, 지금은 OpenSSH·Git·TLS·암호화폐 지갑 등 거의 모든 곳에서 표준처럼 쓰입니다.

### 핵심 수치

| 항목 | 값 |
| --- | --- |
| 보안 강도 | 약 128비트 (RSA-3072와 동급) |
| 개인키 | 32바이트 시드 |
| 공개키 | 32바이트 |
| 서명 길이 | 64바이트 (고정) |
| 해시 | SHA-512 내장 |

### 결정론적 서명 (deterministic nonce)

ECDSA는 서명할 때마다 무작위 난수(nonce)가 필요하고, 이 난수가 겹치거나 예측되면
개인키가 통째로 노출됩니다(소니 PS3 사건이 대표적). Ed25519는 nonce를
**"개인키 + 메시지"의 해시로 결정론적으로 생성**하기 때문에, 서명 시점에 좋은 난수원이 없어도 안전합니다.

> [!note]
> **EdDSA vs ECDSA**  
> 둘 다 타원곡선 기반이지만, Ed25519는 결정론적 서명·고정 길이·상수시간 연산(사이드채널 저항)으로 설계되어
> 구현 실수로 인한 사고가 적습니다. 키도 짧고 검증도 빠릅니다.

## 2 왜 Ed25519를 쓰는가

- **빠르다** — 서명·검증 모두 RSA보다 훨씬 빠름
- **짧다** — 키와 서명이 작아 저장·전송 비용이 적음
- **안전하다** — 결정론적 nonce + 상수시간 연산으로 흔한 구현 실수에 강함
- **단순하다** — RSA처럼 키 길이(2048/3072/4096)를 고민할 필요가 없음

### SSH 키 알고리즘 비교

| 알고리즘 | 키 길이/강도 | 특징 |
| --- | --- | --- |
| `rsa` | 3072~4096비트 권장 | 호환성 최고, 키·서명이 큼, 느림 |
| `ecdsa` | 256/384/521비트 | NIST 곡선, nonce 의존, 곡선 신뢰 논쟁 |
| `ed25519` | 256비트 (≈RSA-3072) | **권장** — 빠르고 짧고 안전 |
| `ed25519-sk` | 256비트 + 하드웨어 | FIDO2 보안키(YubiKey 등)에 개인키 보관 |

> [!warning]
> **호환성 주의**  
> Ed25519는 OpenSSH 6.5(2014) 이상에서 지원됩니다. 아주 오래된 시스템(CentOS 6 등)이나
> 일부 레거시 장비는 지원하지 않을 수 있으니, 그런 환경만 예외적으로 RSA를 함께 둡니다.

## 3 SSH 키 생성과 접속

가장 기본적인 쓰임 — 서버 로그인용 키쌍을 만듭니다.

terminalbash

```
$ ssh-keygen -t ed25519 -a 100 -C "me@example.com"
# -t ed25519 : 키 타입
# -a 100     : 개인키 암호화 KDF 반복 횟수(브루트포스 저항 ↑)
# -C         : 키 식별용 코멘트
# → ~/.ssh/id_ed25519 (개인키) / id_ed25519.pub (공개키) 생성
```

### 서버에 공개키 등록

terminalbash

```
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
# 또는 수동으로 server의 ~/.ssh/authorized_keys 에 .pub 내용 추가
```

### 확인

terminalbash

```
$ ssh user@server
# 비밀번호 없이 키로 로그인되면 성공
```

> [!tip]
> **개인키엔 passphrase를 거는 게 좋습니다**  
> 키 파일이 유출돼도 passphrase가 있으면 즉시 악용되지 않습니다.
> 매번 입력이 번거로우면 `ssh-agent`에 등록해 세션 동안만 캐시하세요:
> `ssh-add ~/.ssh/id_ed25519`

## 4 SSH로 서명하기 — 파일과 Git 커밋

OpenSSH 8.0부터는 SSH 키로 **임의의 데이터에 전자서명**을 할 수 있습니다(`ssh-keygen -Y`).
접속용으로 쓰던 같은 Ed25519 키를 그대로 서명에도 쓸 수 있다는 게 핵심입니다.

### 임의 파일 서명·검증

terminalbash

```
# 서명 생성 → doc.txt.sig 파일이 만들어짐
$ ssh-keygen -Y sign -f ~/.ssh/id_ed25519 -n file doc.txt

# 검증에 쓸 신뢰 서명자 목록(allowed_signers) 준비
$ echo "me@example.com $(cat ~/.ssh/id_ed25519.pub)" > ~/.ssh/allowed_signers

# 서명 검증
$ ssh-keygen -Y verify -f ~/.ssh/allowed_signers \
    -I me@example.com -n file -s doc.txt.sig < doc.txt
# Good "me@example.com" signature ... 출력되면 검증 성공
```

> [!note]
> **namespace(`-n`)란?**  
> 서명이 쓰이는 용도를 구분하는 라벨입니다. 파일 서명은 보통 `file`,
> Git 커밋 서명은 `git`을 씁니다. 검증 시 namespace가 일치해야 통과되어,
> 한 용도의 서명이 다른 용도로 오용되는 것을 막습니다.

### Git 커밋을 SSH 키로 서명

Git 2.34부터 GPG 대신 SSH 키로 커밋·태그를 서명할 수 있습니다.

terminalbash

```
$ git config --global gpg.format ssh
$ git config --global user.signingkey ~/.ssh/id_ed25519.pub
$ git config --global commit.gpgsign true
$ git config --global tag.gpgsign true

# 검증용: 신뢰 서명자 파일 지정 (namespaces="git" 권장)
$ echo "me@example.com namespaces=\"git\" $(cat ~/.ssh/id_ed25519.pub)" \
    > ~/.ssh/allowed_signers
$ git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
```

### 확인

terminalbash

```
$ git commit -m "signed commit"
$ git log --show-signature -1
# Good "git" signature for me@example.com ... 출력되면 성공
```

> [!tip]
> **GitHub에 "Verified" 배지 띄우기**  
> GitHub → Settings → SSH and GPG keys → **New SSH key**에서
> Key type을 **Signing Key**로 선택해 같은 공개키(`id_ed25519.pub`)를 등록하면,
> 서명된 커밋에 초록색 **Verified** 배지가 붙습니다. (접속용 Authentication Key와 별도로 추가)

## 5 MariaDB ed25519 인증 플러그인

MariaDB는 비밀번호 인증에도 Ed25519를 쓸 수 있습니다. 기본
`mysql_native_password`는 SHA-1 기반이라, user 테이블의 해시가 유출되면
그대로 로그인에 재사용될 수 있습니다. **ed25519 플러그인**은 비밀번호로
개인키를 유도하고 서버에는 **공개키만 저장**한 뒤, 접속 시 챌린지-응답 서명으로 인증합니다.
따라서 저장된 값이 새도 비밀번호 복원이나 재사용이 불가능합니다.

> [!warning]
> **MariaDB 전용**  
> 이 플러그인은 MariaDB 기능입니다(MySQL에는 없음). 클라이언트도 `client_ed25519`
> 인증 플러그인을 지원해야 하며, MariaDB 클라이언트/커넥터에는 기본 포함되어 있습니다.

### 플러그인 설치

MariaDBsql

```
INSTALL SONAME 'auth_ed25519';

-- 설치 확인
SELECT plugin_name, plugin_status
FROM information_schema.plugins
WHERE plugin_name = 'ed25519';
```

### ed25519로 사용자 생성

MariaDB (10.4+)sql

```
-- 최신 문법: 평문 비밀번호를 주면 서버가 공개키로 변환해 저장
CREATE USER 'alice'@'%'
  IDENTIFIED VIA ed25519 USING PASSWORD('secret-passphrase');

GRANT ALL PRIVILEGES ON appdb.* TO 'alice'@'%';
FLUSH PRIVILEGES;
```

MariaDB (구버전 / 명시적 해시)sql

```
-- 해시를 먼저 뽑아서 USING '' 로 지정하는 방식
SELECT ed25519_password('secret-passphrase');
-- 예: =ZmsdgcAQ5... 같은 공개키 해시 반환

CREATE USER 'bob'@'%'
  IDENTIFIED VIA ed25519 USING '=ZmsdgcAQ5...';
```

### 확인

terminalbash

```
$ mariadb -u alice -p appdb
# 비밀번호 입력 후 접속되면 ed25519 인증 성공

# 어떤 플러그인으로 인증되는지 서버에서 확인
> SELECT user, plugin FROM mysql.user WHERE user='alice';
# plugin 컬럼이 ed25519 로 표시됨
```

> [!note]
> **왜 더 안전한가**  
> `mysql_native_password`는 비밀번호 해시 자체가 사실상 "비밀"이라 유출되면 재사용됩니다.
> ed25519는 서버에 **공개키**만 있고, 인증은 매 접속마다 다른 챌린지에 대한 서명으로 이뤄집니다.
> 공개키가 새도 서명을 위조할 수 없으므로 비밀번호도, 접속 권한도 지켜집니다.

## 6 한 알고리즘, 세 가지 쓰임

지금까지 본 것을 한 장으로 정리하면 — 동일한 Ed25519 키쌍 원리가 세 영역에서 신원을 증명합니다.

Ed25519 키쌍 (개인키 32B / 공개키 32B)
│
┌─────────────────────┼─────────────────────┐
▼ ▼ ▼
[ SSH 접속 ] [ SSH/Git 서명 ] [ MariaDB 인증 ]
id\_ed25519 ssh-keygen -Y IDENTIFIED VIA
authorized\_keys git gpg.format ssh ed25519
│ │ │
▼ ▼ ▼
서버 로그인 커밋 무결성·출처 공개키 저장 + 챌린지
(키 기반) (Verified) (해시 유출에도 안전)

| 영역 | 핵심 명령/설정 | 저장되는 것 |
| --- | --- | --- |
| SSH 접속 | `ssh-keygen -t ed25519` | 서버에 공개키(authorized\_keys) |
| SSH/Git 서명 | `ssh-keygen -Y sign`, `gpg.format ssh` | allowed\_signers의 공개키 |
| MariaDB 인증 | `IDENTIFIED VIA ed25519` | mysql.user에 공개키 해시 |

> [!tip]
> **요점**  
> 세 경우 모두 **개인키는 내 손을 떠나지 않고, 서버엔 공개키만 둔다**는 공개키 암호의 기본기를 따릅니다.
> Ed25519는 그 기본기를 가장 빠르고 단순하고 안전하게 구현한 선택지라, 접속·서명·DB 인증을 하나의 알고리즘으로 통일할 수 있습니다.
