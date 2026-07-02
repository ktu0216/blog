---
title: "FortiGate SSL VPN이 사라진다: Tailscale·AWS Client VPN 전환 비교"
pubDatetime: 2026-07-01T12:00:00+09:00
description: "FortiOS 7.6.3부터 SSL VPN 터널 모드가 사라집니다. 현재 FortiGate SSL VPN을 쓰는 소규모 조직 관점에서 Tailscale과 AWS Client VPN을 사용성·보안 관리(디바이스 제어·비밀번호·계정 만료)·가격으로 비교하고, 계정 50·동시접속 15 미만·Google SSO 환경과 ISMS 심사 항목에 맞는 선택을 정리합니다."
tags: ["VPN", "Tailscale", "AWS Client VPN", "FortiGate", "SSL VPN", "ZTNA", "IPsec", "네트워크 보안", "디바이스 posture", "SSO", "ISMS", "계정 관리"]
draft: false
---

"펌웨어만 올렸을 뿐인데, 어느 날 SSL VPN 메뉴가 통째로 사라졌다면?" 실제로 2026년의 FortiGate 사용자에게 일어나고 있는 일입니다. 이 글에서는 지금 **FortiGate의 SSL VPN**으로 원격 접속을 운영하는 소규모 조직이, 왜 지금 대안을 검토해야 하는지부터 시작해서 **Tailscale**과 **AWS Client VPN**을 후보로 놓고 사용성·디바이스 제어·가격 세 축으로 비교합니다.

기준 환경은 이렇게 잡았습니다 — **VPN 계정 약 50개, 동시 접속은 대체로 15명 미만, 인증은 이미 Google SSO로 통일**. 비슷한 규모로 운영 중이라면 숫자를 그대로 대입해 읽으시면 됩니다. 비교 축은 **사용성 · 보안 관리(디바이스 제어·비밀번호·계정 만료) · 가격** 셋으로 잡았고, ISMS 심사에서 자주 걸리는 계정 관리 항목도 함께 짚습니다.

## 왜 지금 옮겨야 하나요?

먼저 사실관계부터 짚겠습니다. Fortinet은 SSL VPN 터널 모드를 **단계적으로 제거**하고 있습니다. 시점이 모델·버전마다 다르다는 게 핵심이죠.

- **FortiOS 7.4.8 이상** — G 시리즈 엔트리 모델(50G·70G·90G 등)에서 SSL VPN 웹/터널 모드가 GUI·CLI 모두에서 사라집니다. ([FortiOS 7.4.8 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.4.8/fortios-release-notes/205987/ssl-vpn-not-supported-on-fortigate-g-series-entry-level-models))
- **FortiOS 7.6.0** — RAM 2GB 이하 모델에서 SSL VPN 웹/터널 모드 제거. ([FortiOS 7.6.0 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.6.0/fortios-release-notes/877104/ssl-vpn-removed-from-2gb-ram-models-for-tunnel-and-web-mode))
- **FortiOS 7.6.3 이상** — **모든 모델**에서 SSL VPN 터널 모드가 GUI·CLI에서 더 이상 제공되지 않습니다. ([FortiOS 7.6.3 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.6.3/fortios-release-notes/173430/ssl-vpn-tunnel-mode-no-longer-supported))

즉, "최신 펌웨어에서 SSL VPN이 안 보인다"는 건 버그가 아니라 **공식적인 기능 종료(deprecation)** 입니다. 7.6.3으로 올리기 전에 기존 SSL VPN 설정을 **IPsec으로 마이그레이션**해 두라는 것이 [Fortinet의 공식 안내](https://docs.fortinet.com/document/fortigate/7.6.4/administration-guide/155142/ssl-vpn-tunnel-mode-to-ipsec-vpn-migration)입니다.

### "라이선스로 다시 판다"는 건 사실인가요?

여기서 오해가 하나 생기기 쉽습니다. "SSL VPN을 유료 라이선스로 다시 파는 것 아니냐"는 이야기인데요, 정확히 나눠 보면 이렇습니다.

- **대체 경로 ① IPsec VPN — 추가 라이선스 없음.** FortiGate 기본 기능이고, TCP 443 포트로도 구성할 수 있어 방화벽 통과 측면에서 SSL VPN과 비슷하게 쓸 수 있습니다. 즉 "같은 장비에서 계속 원격 접속"만 목표라면 **돈을 더 낼 필요는 없습니다.**
- **업셀 경로 ② ZTNA — FortiClient/EMS 라이선스 필요.** Fortinet이 밀고 있는 방향은 ZTNA(Zero Trust Network Access)입니다. 이건 엔드포인트에 **FortiClient**를 깔고 **FortiClient EMS**로 중앙 관리하는 구조라, 좌석(엔드포인트) 수 기반의 **별도 라이선스**가 붙습니다.

정리하면, **"SSL VPN 자체를 라이선스 상품으로 부활시킨" 것은 아닙니다.** 무료로 옮길 길(IPsec)은 열려 있고, 대신 더 세밀한 제어(ZTNA)를 원하면 FortiClient 라이선스를 사야 한다 — 이렇게 이해하시면 됩니다. 다만 ZTNA 라이선스의 **정확한 단가는 모델·물량·파트너에 따라 달라져** 여기서 단정하지 않겠습니다. 이 부분은 총판/파트너 견적으로 확인하셔야 합니다.

그렇다면 선택지는 셋입니다. **(A) FortiGate에 남되 IPsec/ZTNA로 갈아타기**, **(B) AWS Client VPN으로 이전**, **(C) Tailscale로 이전.** 이 글은 (B)와 (C)를 중심으로, (A)를 비교 기준선으로 둡니다.

## 세 후보를 한눈에

깊이 들어가기 전에 성격부터 구분해 두겠습니다. 셋은 사실 **서로 다른 종류의 물건**입니다.

| 구분 | FortiGate (IPsec/ZTNA) | AWS Client VPN | Tailscale |
|---|---|---|---|
| 방식 | 어플라이언스 기반 게이트웨이 | 관리형 클라우드 VPN(엔드포인트) | 오버레이 메시(WireGuard) |
| 접속 모델 | 중앙 게이트웨이로 집중 | 중앙 엔드포인트로 집중 | 피어 투 피어(필요 시 릴레이) |
| 운영 부담 | 장비·펌웨어·정책 직접 운영 | AWS 관리, 룰은 직접 | SaaS, 정책은 코드로 |
| 어울리는 곳 | 이미 Forti 장비가 있는 온프렘 | 접근 대상이 AWS VPC 중심 | 여러 자원에 분산 접근 |

핵심 차이 한 줄로 요약하면 — AWS Client VPN과 FortiGate는 **"관문을 하나 두고 그 뒤로 들여보내는"** 모델이고, Tailscale은 **"기기끼리 직접 연결하고 정책으로 통제하는"** 모델입니다. 이 성격 차이가 뒤에 나올 사용성·가격 차이의 뿌리가 됩니다.

## 1. 사용성 — 매일 접속하는 사람 입장에서

VPN은 결국 매일 켜고 끄는 물건이라, 관리자보다 **사용자 경험**이 채택을 좌우합니다.

**AWS Client VPN.** OpenVPN 기반의 **AWS 전용 클라이언트**를 설치하고, `.ovpn` 프로파일을 배포해야 합니다. SAML 2.0 연동을 붙이면 Google Workspace 같은 IdP로 로그인할 수 있어, 기존 Google SSO 자산을 그대로 활용할 수 있죠. 다만 접속할 때마다 클라이언트 → 브라우저 인증 → 터널 수립으로 이어지는 흐름이라, "그냥 켜면 붙는" 느낌보다는 한 단계 더 있습니다.

**Tailscale.** 각 기기에 Tailscale 앱을 깔고 **한 번 로그인하면 끝**입니다. 로그인 자체가 IdP를 통하는 방식이라, Google 계정으로 바로 붙습니다. 프로파일 배포·인증서 관리 같은 절차가 없고, 접속은 사실상 백그라운드에서 유지됩니다. 소규모 팀에서 "설정이 제일 안 귀찮은" 쪽을 꼽자면 대체로 여기입니다.

**FortiGate(IPsec/ZTNA).** SSL VPN 시절의 FortiClient 경험과 이어집니다. IPsec 전환이면 클라이언트 프로파일을 다시 배포해야 하고, ZTNA로 가면 FortiClient + EMS 등록이라는 절차가 추가됩니다. 이미 FortiClient에 익숙한 조직이면 학습 비용은 낮지만, "새로 깔끔하게 시작"하는 맛은 아닙니다.

정리하면, **설치·인증 편의성은 Tailscale이 가장 가볍고**, AWS Client VPN은 표준적이되 한 단계 더 손이 가며, FortiGate는 기존 자산을 이어가는 대신 전환 작업이 따릅니다.

## 2. 디바이스 제어 정책 — 어디까지 통제되나요?

"누가 접속하느냐"만이 아니라 **"어떤 기기로 접속하느냐"** 를 통제하고 싶다는 요구가 있으셨는데요, 이 축이 세 후보의 성격이 가장 크게 갈리는 지점입니다.

**FortiGate — 가장 촘촘합니다.** 방화벽 정책과 결합해 사용자/그룹별로 접근 대상을 세밀하게 끊을 수 있고, ZTNA로 가면 FortiClient가 수집한 **엔드포인트 상태**(OS 패치, 백신 실행 여부, 인증서, 특정 프로세스 존재 등)를 접속 조건으로 걸 수 있습니다. USB 장치 제어까지 EMS로 묶이죠. 대신 이 모든 걸 **직접 운영**해야 하고, 앞서 말한 라이선스가 전제됩니다.

**Tailscale — 정책을 코드로 씁니다.** ACL 정책 파일(정책-as-코드)로 "누가 무엇에 접근 가능한지"를 선언하고, **디바이스 posture**를 조건으로 얹습니다. OS·Tailscale 버전 같은 기본 속성은 **모든 요금제(무료 포함)** 에서 조건으로 쓸 수 있고, MDM·EDR(예: CrowdStrike) 같은 외부 신뢰 소스 연동은 상위 요금제에서 열립니다. **디바이스 승인(device approval)** 으로 새 기기가 붙기 전에 관리자가 통과시키는 흐름도 만들 수 있습니다. Forti만큼 저수준은 아니지만, 소규모가 감당할 만한 수준에서 꽤 촘촘합니다.

**AWS Client VPN — 기본은 네트워크 인가, 정교함은 직접 만듭니다.** 기본 통제는 **인가 규칙(authorization rule)**, 즉 "이 SAML 그룹은 이 대역만" 식의 네트워크 레벨 제어입니다. 여기에 **클라이언트 연결 핸들러(Lambda)** 를 붙이면, 접속을 수립하기 **전에** 기기·사용자·연결 속성을 검사해 `compliant`/`quarantined` 같은 자체 상태로 허용·차단하는 로직을 짤 수 있습니다. 강력하지만 **직접 구현해야** 하는 영역이라, 손이 많이 갑니다.

| 제어 항목 | FortiGate(ZTNA) | Tailscale | AWS Client VPN |
|---|---|---|---|
| 사용자/그룹 접근 제어 | ◎ 방화벽 정책 | ◎ ACL 정책 | ○ 인가 규칙 |
| 기기 상태(posture) 조건 | ◎ FortiClient 상세 | ○ 기본 무료·MDM/EDR 상위 | △ Lambda로 직접 |
| 신규 기기 승인 | ◎ EMS 등록 | ◎ device approval | △ 직접 구성 |
| 운영 난이도 | 높음(직접 운영) | 낮음(SaaS·코드) | 중간(AWS+Lambda) |

한 줄 요약 — **가장 세밀한 통제는 FortiGate**, **적은 노력 대비 통제력은 Tailscale**, **AWS는 유연하지만 그만큼 직접 만들어야** 합니다.

## 3. 계정·비밀번호·만료 관리 — 보안 심사(ISMS) 관점

ISMS 심사에서 자주 확인하는 항목이 있죠 — **비밀번호 설정 규칙, (협력사 등) 로컬 계정의 만료·자동 삭제, 접속 기기 확인**. 그런데 새 후보들을 콘솔만 훑어보면 "이런 관리 기능이 아예 없는 것 아닌가?" 싶을 수 있는데요, 실은 **기능이 사라진 게 아니라 위치가 옮겨간** 경우가 많습니다. 판단의 갈림길은 하나입니다 — **"인증을 VPN이 직접 하나, IdP에 위임하나?"**

**FortiGate — VPN이 곧 계정 저장소.** 로컬 사용자에 대해 비밀번호 정책(복잡도·`expire-days`·`warn-days`)을 걸 수 있고, 계정 만료일도 지정할 수 있습니다. 협력사처럼 회사 IdP에 넣기 애매한 계정을 **VPN 안에서 직접** 만들고 시한을 거는 전통적 방식이라, ISMS의 로컬 계정 요건을 장비 하나로 충족하기 쉽습니다. 다만 이 비밀번호 정책은 **로컬 사용자에만** 적용되고, LDAP/RADIUS 같은 외부 인증 사용자에는 적용되지 않습니다(그쪽은 원 디렉터리 소관).

**Tailscale — 설계상 비밀번호가 없습니다.** 공식 문서가 못 박듯 "Tailscale은 IdP가 아니며, Tailscale 비밀번호는 존재하지 않는다"가 원칙입니다. 그래서 관리 항목이 이렇게 나뉩니다.

- **비밀번호 규칙** → Tailscale이 아니라 **Google Workspace에서 관리**합니다. 심사 때도 "비밀번호 정책은 IdP에서 증빙"이 정답이 됩니다.
- **계정 만료·자동 삭제** → **SCIM 연동**으로 IdP에서 계정을 비활성화·삭제하면 Tailscale에서 suspend → (약 30일 뒤) 삭제로 이어집니다. 오프보딩이 IdP 라이프사이클에 물리는 구조죠.
- **협력사 계정은 주의**가 필요합니다. 회사 IdP에 담지 않고 **외부 초대(게스트)** 로 붙이면 이 자동화가 약해집니다. 초대 사용자는 즉시 삭제가 아니라 **디바이스 키 만료(key expiry)** 로 재인증이 막히는 방식이라, "만료 = 자동 삭제"를 원하면 협력사도 관리 대상 IdP/SCIM에 포함하거나 키 만료 주기를 짧게 잡아야 합니다.
- **기기 확인** → 앞 절에서 본 device posture + device approval로 처리합니다.

**AWS Client VPN — 인증 백엔드에 따라 갈립니다.** SAML(Google) 연동이면 비밀번호·만료는 IdP 소관이라 Tailscale과 사정이 같습니다. 반면 **Active Directory**(Managed AD·AD Connector) 백엔드를 붙이면 AD의 비밀번호 정책·계정 만료·MFA를 그대로 상속하므로, "VPN 인증 백엔드 안에서 로컬 비밀번호 정책·만료를 강제"하고 싶을 때 선택지가 됩니다. 인증서(mutual auth)를 쓰면 인증서 만료·CRL 폐기로 통제하되, **CRL을 갱신하는 순간 해당 엔드포인트의 전체 연결이 끊기는** 특성은 미리 알고 있어야 합니다.

| 관리 항목 | FortiGate(로컬) | Tailscale | AWS Client VPN |
|---|---|---|---|
| 비밀번호 설정 규칙 | ◎ 로컬 사용자에 직접 | IdP(Google)에서 | SAML=IdP / AD백엔드=AD정책 |
| 계정 만료·자동 삭제 | ◎ 계정 만료일 지정 | SCIM 시 자동 / 게스트는 키 만료 | AD=만료정책 / 인증서=CRL |
| 협력사(비-IdP) 계정 | ◎ 장비에서 직접 | △ 초대·키 만료로 우회 | △ 별도 AD·인증서 발급 |
| 기기 확인·제어 | ◎ FortiClient posture | ○ posture+승인 | △ Lambda 커스텀 |

정리하면, 처음 느끼신 "보안 관리 기능이 부족해 보인다"는 인상은 **절반만 맞습니다.** IdP 위임형(Tailscale·AWS SAML)은 비밀번호와 계정 라이프사이클을 **VPN에서 걷어내 Google Workspace로 모은 것**이라, 콘솔만 보면 비어 보이지만 실제로는 계정 관리 창구가 하나로 정리되는 장점이 있죠. 진짜 공백은 **IdP에 담기 어려운 협력사 로컬 계정** 한 곳입니다. 이 지점에서만큼은 로컬 계정+만료를 장비에서 직접 통제하는 FortiGate가 확실히 편하고, SaaS로 옮기려면 "협력사도 IdP/SCIM에 포함" 또는 "짧은 키 만료 + 초대 관리"라는 운영 규칙으로 그 틈을 메워야 합니다.

## 4. 가격 — 계정 50·동시 15 미만 기준

이제 가장 궁금하실 비용입니다. 요금 구조 자체가 다르므로, 기준 환경(계정 50·동시 15 미만·Google SSO)에 대입해 **월 추정치**로 비교하겠습니다. 실제 청구는 사용량·리전·환율에 따라 달라지니 방향성으로 봐주세요.

**FortiGate(IPsec).** 장비가 이미 있고 SSL VPN을 IPsec으로만 바꾸는 경우, **추가 비용은 사실상 0**입니다. 다만 ZTNA로 올라가면 FortiClient EMS 라이선스가 좌석 수만큼 붙습니다(단가는 견적 필요).

**AWS Client VPN.** 두 가지가 시간당으로 과금됩니다.
- **엔드포인트 연결(association)**: 서브넷당 시간당 약 **$0.10**. 상시 가용하려면 24시간 켜둬야 하니 대략 `$0.10 × 730시간 ≈ 월 $73` (서브넷 1개 기준, 이중화로 2개면 약 2배).
- **클라이언트 접속(connection)**: 접속 중인 클라이언트당 시간당 **$0.05**. 업무시간 위주로 15명이 하루 9시간·월 22일 붙는다고 보면 `15 × 9 × 22 × $0.05 ≈ 월 $148`. 노트북을 상시 연결로 두면 이보다 커집니다.
- 여기에 **데이터 전송(egress) 요금**이 별도. 합치면 대략 **월 $220~300 + 전송량** 선으로, **접속 시간에 비례**해 늘고 줄어듭니다.

**Tailscale.** 2026년 4월부터 **좌석(seat) 기반** 과금으로 바뀐 점이 중요합니다. 예전의 "월 활성 사용자만 과금"이 아니라, **한 번이라도 인증해 좌석을 차지한 사용자 수**로 청구됩니다. 동시 접속 수(15)는 과금과 무관하다는 뜻이죠.
- 무료(Personal)는 **최대 6명**이라 50계정 조직에는 부족합니다.
- 유료는 **Standard $8/사용자·월**, **Premium $18/사용자·월**(연납 기준).
- 관건은 "50계정 중 실제로 좌석을 차지하는 인원"입니다. 50명 전원이 붙으면 `50 × $8 = 월 $400`(Standard), 실사용이 15명 안팎이면 `15 × $8 ≈ 월 $120` 선. **미리 계정을 만들어 둬도, 인증하지 않으면 좌석이 차지 않습니다.**

| 후보 | 과금 축 | 계정 50·동시 15 기준 월 추정 | 비고 |
|---|---|---|---|
| FortiGate IPsec | 없음(장비 보유) | ≈ $0 | ZTNA는 FortiClient 라이선스 별도 |
| AWS Client VPN | 시간(association+connection) | ≈ $220~300 + 전송량 | 접속 시간에 비례 |
| Tailscale Standard | 좌석(인증한 사용자) | ≈ $120(실사용15) ~ $400(50명 전원) | posture 상위는 Premium |

가격만 보면 **이미 있는 장비를 IPsec으로 재활용**하는 게 제일 쌉니다. 신규 SaaS 중에서는 **실사용 인원이 등록 인원보다 훨씬 적은 이 환경 특성상 Tailscale의 좌석 과금이 유리하게 작동**할 여지가 큽니다. 반대로 상시 연결 성격이 강하고 접근 대상이 AWS에 몰려 있다면 AWS Client VPN의 시간 과금이 자연스럽습니다.

## 그래서, 어떤 선택이 맞을까요?

세 축을 겹쳐 보면 기준 환경(계정 50·동시 15 미만·Google SSO)에는 대략 이런 그림이 그려집니다.

- **비용을 최우선**하고, 세밀한 엔드포인트 통제나 **IdP에 담기 어려운 협력사 로컬 계정**(비밀번호 정책·만료를 장비에서 직접)이 중요하다면 — **FortiGate를 IPsec으로 전환**하는 게 가장 저렴하고 통제력도 높습니다. 대신 장비·정책을 계속 직접 운영해야 하고, ZTNA까지 원하면 라이선스 비용을 견적으로 확인해야 합니다.
- **운영 부담을 최소화**하고 Google SSO를 그대로 살리며 여러 자원에 분산 접근한다면 — **Tailscale**이 가장 매끄럽습니다. 좌석 과금이라 "등록 50·실사용 15" 구조에서 낭비가 적고, posture·ACL도 코드로 관리됩니다. 기본 posture로 부족하면 Standard 이상을 검토하시면 됩니다.
- **접근 대상이 대부분 AWS VPC 안**에 있다면 — **AWS Client VPN**이 결이 맞습니다. 다만 시간당 과금 구조라 접속 패턴에 따라 비용이 출렁이고, 정교한 기기 통제는 Lambda로 직접 만들어야 한다는 점을 감안해야 합니다.

기준 환경만 놓고 담담하게 추리면, **"Google SSO 유지 + 낮은 운영 부담 + 등록 대비 실사용이 적은 구조"** 라는 조건이 Tailscale의 좌석 모델과 잘 맞습니다. 반대로 이미 안정적으로 돌던 FortiGate 장비를 굳이 버릴 이유가 없다면, 급하지 않게 **IPsec 전환으로 시간을 벌면서** 두 SaaS를 소규모 PoC로 나란히 붙여 보는 순서가 안전합니다.

마지막으로 확인이 필요한 항목 두 가지만 남겨 둡니다 — **FortiClient ZTNA 라이선스의 실제 단가(파트너 견적)**, 그리고 **Tailscale에서 50계정 중 실제 좌석을 차지할 인원**. 이 둘의 숫자가 잡히면, 위 표의 추정치가 곧바로 실제 비교표로 바뀝니다.

## 참고 자료 (공식 출처)

SSL VPN 종료 시점·조건은 Fortinet 공식 문서(릴리스 노트·관리자 가이드)를 근거로 했습니다. 버전마다 문서가 갈리므로 해당 버전 문서를 직접 링크합니다.

- [SSL VPN not supported on FortiGate G-series Entry-Level models — FortiOS 7.4.8 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.4.8/fortios-release-notes/205987/ssl-vpn-not-supported-on-fortigate-g-series-entry-level-models)
- [SSL VPN removed from 2GB RAM models for tunnel and web mode — FortiOS 7.6.0 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.6.0/fortios-release-notes/877104/ssl-vpn-removed-from-2gb-ram-models-for-tunnel-and-web-mode)
- [SSL VPN tunnel mode no longer supported — FortiOS 7.6.3 릴리스 노트](https://docs.fortinet.com/document/fortigate/7.6.3/fortios-release-notes/173430/ssl-vpn-tunnel-mode-no-longer-supported)
- [SSL VPN tunnel mode to IPsec VPN migration — FortiOS 관리자 가이드](https://docs.fortinet.com/document/fortigate/7.6.4/administration-guide/155142/ssl-vpn-tunnel-mode-to-ipsec-vpn-migration)

> 요금·라이선스 단가(FortiClient ZTNA, AWS Client VPN 시간당 요금, Tailscale 좌석 요금)는 벤더·리전·파트너에 따라 달라지므로 본문에서 단정하지 않고 방향성으로만 제시했습니다. 실제 도입 시 각 벤더 공식 가격 페이지·파트너 견적으로 확인하시기 바랍니다.
