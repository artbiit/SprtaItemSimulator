# SprtaItemSimulator

# TODO

## API

> **Tag**  
> A -> 인증 필요  
> P -> Post  
> D -> Delete  
> G -> Get  
> U -> pUt  
> T -> paTch


### 유저
- [ ] 회원가입(P) : ID(영어 + 숫자 5글자 이상), PW(영어 + 숫자 + 특수문자 6글자 이상), 닉네임(한글 기준 16글자)
- [ ] 로그인(P)
- [ ] 회원탈퇴(AD)
- [ ] 비밀번호 변경(AT)
- [ ] 토큰 재 요청(P)
- [ ] 유저 권한 변경(AT) : 관리자 계정으로만 가능
- [ ] 로그아웃(AP)

### 캐릭터
- [ ] 캐릭터 생성 (AP) : 본인 계정에서 캐릭터 생성
- [ ] 캐릭터 삭제 (AD) : 본인 계정에서 캐릭터 삭제
- [ ] 캐릭터 이름 변경 (AT) : 본인 계정에서 캐릭터 변경
- [ ] 캐릭터 선택 (AP) : 본인 계정에서 사용할 캐릭터 선택
- [ ] 캐릭터 정보 ([A]P) : 인증 없이 조회시 이름과 스탯만, 인증 및 본인 캐릭터 조회시 보유 머니 및 인벤토리 반환

### 아이템 관리
> 관리자 전용 API

- [ ] 신규 등록(AP)
- [ ] 수정(AT) : 아이템 가격 수정 불가
- [ ] 삭제(AD)

### 아이템 관련
- [ ] 아이템 목록(G) : Page 지정 가능(페이지당 갯수, 몇 페이지 인지)
- [ ] 아이템 검색(G) : 아이템 코드, 이름, 스탯, 페이지 지정 가능
- [ ] 아이템 구매(AP) : 관리자는 비용 없이 구매 가능, 사용자는 비용 지불 후 구매 가능
- [ ] 아이템 판매(AP) : 관리자는 아이템 삭제만, 사용자는 원가의 60% 가격으로 정산
- [ ] 아이템 장착(AT) : 스탯이 반영 되어야 함
- [ ] 사냥 보상 획득(AP) : 100원 지급 후 보유 머니 반환