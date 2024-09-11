# Project: ItemSimulator
<!-- TOC -->
- [Project: ItemSimulator](#project-itemsimulator)
- [📁 Collection: users](#-collection-users)
  - [End-point: 회원가입](#end-point-회원가입)
    - [Method: POST](#method-post)
    - [Body (**raw**)](#body-raw)
    - [RES](#res)
  - [End-point: 로그인](#end-point-로그인)
    - [Method: POST](#method-post-1)
    - [Body (**raw**)](#body-raw-1)
    - [RES](#res-1)
  - [End-point: 패스워드 변경](#end-point-패스워드-변경)
    - [Method: PATCH](#method-patch)
    - [Headers](#headers)
    - [Body (**raw**)](#body-raw-2)
    - [RES](#res-2)
    - [🔑 Authentication noauth](#-authentication-noauth)
  - [End-point: 로그아웃](#end-point-로그아웃)
    - [Method: POST](#method-post-2)
    - [Headers](#headers-1)
    - [🔑 Authentication noauth](#-authentication-noauth-1)
    - [RES](#res-3)
  - [End-point: 회원탈퇴](#end-point-회원탈퇴)
    - [Method: DELETE](#method-delete)
    - [Headers](#headers-2)
    - [Body (**raw**)](#body-raw-3)
    - [RES](#res-4)
  - [End-point: 토큰재발급](#end-point-토큰재발급)
    - [Method: POST](#method-post-3)
    - [Body (**raw**)](#body-raw-4)
    - [RES](#res-5)
  - [End-point: 권한변경](#end-point-권한변경)
    - [Method: PATCH](#method-patch-1)
    - [Headers](#headers-3)
    - [Body (**raw**)](#body-raw-5)
    - [RES](#res-6)
- [📁 Collection: characters](#-collection-characters)
  - [End-point: 생성](#end-point-생성)
    - [Method: POST](#method-post-4)
    - [Headers](#headers-4)
    - [Body (**raw**)](#body-raw-6)
    - [RES](#res-7)
  - [End-point: 닉네임 변경](#end-point-닉네임-변경)
    - [Method: PATCH](#method-patch-2)
    - [Headers](#headers-5)
    - [Body (**raw**)](#body-raw-7)
    - [🔑 Authentication noauth](#-authentication-noauth-2)
    - [RES](#res-8)
  - [End-point: 삭제](#end-point-삭제)
    - [Method: DELETE](#method-delete-1)
    - [Headers](#headers-6)
    - [Body (**raw**)](#body-raw-8)
    - [RES](#res-9)
  - [End-point: 선택](#end-point-선택)
    - [Method: POST](#method-post-5)
    - [Headers](#headers-7)
    - [Body (**raw**)](#body-raw-9)
    - [RES](#res-10)
  - [End-point: 조회-인증o](#end-point-조회-인증o)
    - [Method: GET](#method-get)
    - [Headers](#headers-8)
    - [RES](#res-11)
  - [End-point: 조회-인증x](#end-point-조회-인증x)
    - [Method: GET](#method-get-1)
    - [RES](#res-12)
- [📁 Collection: item-management](#-collection-item-management)
  - [End-point: 일반 아이템 생성](#end-point-일반-아이템-생성)
    - [Method: POST](#method-post-6)
    - [Headers](#headers-9)
    - [Body (**raw**)](#body-raw-10)
    - [RES](#res-13)
  - [End-point: 장비 아이템 생성](#end-point-장비-아이템-생성)
    - [Method: POST](#method-post-7)
    - [Headers](#headers-10)
    - [Body (**raw**)](#body-raw-11)
    - [RES](#res-14)
  - [End-point: 일반 아이템 변경](#end-point-일반-아이템-변경)
    - [Method: PUT](#method-put)
    - [Headers](#headers-11)
    - [Body (**raw**)](#body-raw-12)
    - [RES](#res-15)
  - [End-point: 장비 아이템 변경](#end-point-장비-아이템-변경)
    - [Method: PUT](#method-put-1)
    - [Headers](#headers-12)
    - [Body (**raw**)](#body-raw-13)
    - [RES](#res-16)
  - [End-point: 아이템 삭제](#end-point-아이템-삭제)
    - [Method: DELETE](#method-delete-2)
    - [Headers](#headers-13)
    - [Body (**raw**)](#body-raw-14)
    - [RES](#res-17)
- [📁 Collection: item-interaction](#-collection-item-interaction)
  - [End-point: 인벤토리 검색](#end-point-인벤토리-검색)
    - [Method: GET](#method-get-2)
    - [Headers](#headers-14)
    - [Body (**raw**)](#body-raw-15)
    - [RES](#res-18)
  - [End-point: 아이템 검색](#end-point-아이템-검색)
    - [Method: GET](#method-get-3)
    - [Body (**raw**)](#body-raw-16)
    - [RES](#res-19)
  - [End-point: 아이템 구매](#end-point-아이템-구매)
    - [Method: POST](#method-post-8)
    - [Headers](#headers-15)
    - [Body (**raw**)](#body-raw-17)
    - [RES](#res-20)
  - [End-point: 아이템 판매](#end-point-아이템-판매)
    - [Method: POST](#method-post-9)
    - [Headers](#headers-16)
    - [Body (**raw**)](#body-raw-18)
    - [RES](#res-21)
  - [End-point: 아이템 장착](#end-point-아이템-장착)
    - [Method: POST](#method-post-10)
    - [Headers](#headers-17)
    - [Body (**raw**)](#body-raw-19)
    - [RES](#res-22)
  - [End-point: 아이템 장착 해제](#end-point-아이템-장착-해제)
    - [Method: POST](#method-post-11)
    - [Headers](#headers-18)
    - [Body (**raw**)](#body-raw-20)
    - [RES](#res-23)
  - [End-point: 사냥 보상 획득](#end-point-사냥-보상-획득)
    - [Method: POST](#method-post-12)
    - [Headers](#headers-19)
    - [Body (**raw**)](#body-raw-21)
    - [RES](#res-24)
<!-- /TOC -->

# 📁 Collection: users 


## End-point: 회원가입
### Method: POST
>```
>sprata.positivenerd.duckdns.org/users
>```
### Body (**raw**)

```json
{
    "username": "helloUser",
    "password": "tmvkfmxk1!",
    "nickname": "helloHi"
}
```

### RES
```json
{
    "success": true,
    "userId": 7,
    "nickname": "helloHi"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 로그인
### Method: POST
>```
>sprata.positivenerd.duckdns.org/users/login
>```
### Body (**raw**)

```json
{
    "username": "admin",
    "password": "admin"
}
```

### RES
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjY3ODAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.rJOFbWLJxIi5xNhcGF-Fd74z9di7T35InnDsqMdnFpI"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 패스워드 변경
### Method: PATCH
>```
>sprata.positivenerd.duckdns.org/users/password
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiaGVsbG9Vc2VyIiwiaWF0IjoxNzI2MDcyNzkxLCJleHAiOjE3MjYyNDU1OTEsImF1ZCI6InNwYXJ0YSIsImlzcyI6InBvc2l0aXZlbmVyZC5kdWNrZG5zLm9yZyJ9._bvBJaXITCr9FOwPPnR-jESylRQQXAqlia6nw5r010A|


### Body (**raw**)

```json
{
      "oldPassword": "tmvkfmxk1!",
      "newPassword": "sparta1!"
}
```

### RES
```json
{
    "success": true,
    "message": "Password updated successfully"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 로그아웃
### Method: POST
>```
>sprata.positivenerd.duckdns.org/users/logout
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiaGVsbG9Vc2VyIiwiaWF0IjoxNzI2MDcyNzkxLCJleHAiOjE3MjYyNDU1OTEsImF1ZCI6InNwYXJ0YSIsImlzcyI6InBvc2l0aXZlbmVyZC5kdWNrZG5zLm9yZyJ9._bvBJaXITCr9FOwPPnR-jESylRQQXAqlia6nw5r010A|


### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|

### RES
```json
{
    "success": true,
    "message": "Logged out successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcyNjA3MjgyNCwiZXhwIjoxNzI2MDcyODI0fQ.gyOkfdFhv5J6zZL-j3v1L6niOQ-x5eTAsPUjSIKfHu0"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 회원탈퇴
### Method: DELETE
>```
>sprata.positivenerd.duckdns.org/users
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiaGVsbG9Vc2VyIiwiaWF0IjoxNzI2MDcyODQzLCJleHAiOjE3MjYyNDU2NDMsImF1ZCI6InNwYXJ0YSIsImlzcyI6InBvc2l0aXZlbmVyZC5kdWNrZG5zLm9yZyJ9.AfJFwqYThsn7kdWRtrb4l0kQGFJ02rtIQIF8Hc7RV1o|


### Body (**raw**)

```json

```

### RES
```json
{
    "success": true,
    "message": "User deleted successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 토큰재발급
### Method: POST
>```
>sprata.positivenerd.duckdns.org/users/refresh-token
>```
### Body (**raw**)

```json
{  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiaGVsbG9Vc2VyIiwiaWF0IjoxNzI2MDcyNzU2LCJleHAiOjE3MjY2Nzc1NTYsImF1ZCI6InNwYXJ0YSIsImlzcyI6InBvc2l0aXZlbmVyZC5kdWNrZG5zLm9yZyJ9.jzJpbEayIyfMwkJ2rE5rbqazL-02fmg_ljU96ZA1QnI"
}
```

### RES
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiaGVsbG9Vc2VyIiwiaWF0IjoxNzI2MDcyNzkxLCJleHAiOjE3MjYyNDU1OTEsImF1ZCI6InNwYXJ0YSIsImlzcyI6InBvc2l0aXZlbmVyZC5kdWNrZG5zLm9yZyJ9._bvBJaXITCr9FOwPPnR-jESylRQQXAqlia6nw5r010A"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 권한변경
### Method: PATCH
>```
>sprata.positivenerd.duckdns.org/users/role
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzI4ODIsImV4cCI6MTcyNjI0NTY4MiwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.BwigEWxXd-kWyG4T-mhdDoFnLVVo7Uuh7_vSwJEMMYk|


### Body (**raw**)

```json
{
    "targetUserName": "helloUser",
    "newRole": "USER"
}
```
### RES
```json
{
    "success": true,
    "message": "User role updated successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: characters 


## End-point: 생성
### Method: POST
>```
>sprata.positivenerd.duckdns.org/characters
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "characterName" : "GM캐릭터2"
}
```
### RES
```json
{
    "success": true,
    "name": "GM캐릭터2"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 닉네임 변경
### Method: PATCH
>```
>sprata.positivenerd.duckdns.org/characters/name
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "characterName" : "GM캐릭터",
    "newName" : "GM스파르타"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### RES
```json
{
    "success": true,
    "name": "GM스파르타"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 삭제
### Method: DELETE
>```
>sprata.positivenerd.duckdns.org/characters
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "characterName" : "GM캐릭터2"
}
```

### RES
```json
{
    "success": true,
    "message": "Character deleted successfully."
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 선택
### Method: POST
>```
>sprata.positivenerd.duckdns.org/characters/select/
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "characterName" : "GM스파르타"
}
```

### RES
```json
{
    "success": true,
    "selectedCharacter": "GM스파르타"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 조회-인증o
### Method: GET
>```
>sprata.positivenerd.duckdns.org/characters/GM스파르타
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|

### RES
```json
{
    "success": true,
    "name": "GM스파르타",
    "health": 0,
    "attackPower": 0,
    "defense": 0,
    "critChance": 0,
    "critMultiplier": 0,
    "evasion": 0,
    "accuracy": 0,
    "expGainRate": 0,
    "goldGainRate": 0,
    "equippedItems": [],
    "gold": 10000,
    "inventory": []
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 조회-인증x
### Method: GET
>```
>sprata.positivenerd.duckdns.org/characters/GM스파르타
>```

### RES
```json
{
    "success": true,
    "name": "GM스파르타",
    "health": 0,
    "attackPower": 0,
    "defense": 0,
    "critChance": 0,
    "critMultiplier": 0,
    "evasion": 0,
    "accuracy": 0,
    "expGainRate": 0,
    "goldGainRate": 0,
    "equippedItems": []
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: item-management 


## End-point: 일반 아이템 생성
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{

"itemData":{
  "name": "Health Potion",
  "value": 100,
  "isEquippable": false,
  "maxStack": 10,
  "rarity": "COMMON"
}
}
```

### RES
```json
{
    "success": true,
    "id": 202,
    "name": "Health Potion",
    "value": 100,
    "isEquippable": false,
    "maxStack": 10,
    "quantity": 1,
    "rarity": "COMMON",
    "equippedByCharacterId": null,
    "inventoryOfCharacterId": null,
    "message": "Item created successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 장비 아이템 생성
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{

"itemData":{
  "name": "Sword of Valor",
  "value": 500,
  "isEquippable": true,
  "maxStack": 1,
  "rarity": "RARE",
  "stats": {
    "healthBonus": 20,
    "attackBonus": 50,
    "defenseBonus": 15,
    "critChanceBonus": 5,
    "critMultiplierBonus": 1.25,
    "evasionBonus": 0,
    "accuracyBonus": 10
  }
}

}
```

### RES
```json
{
    "success": true,
    "id": 203,
    "name": "Sword of Valor",
    "value": 500,
    "isEquippable": true,
    "maxStack": 1,
    "quantity": 1,
    "rarity": "RARE",
    "equippedByCharacterId": null,
    "inventoryOfCharacterId": null,
    "message": "Item created successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 일반 아이템 변경
### Method: PUT
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
"itemId":201,
"updateData":{
  "name": "Mana Potion",
  "isEquippable": false,
  "maxStack": 10,
  "rarity": "COMMON"
}

}
```

### RES
```json
{
"itemId":201,
"updateData":{
  "name": "Mana Potion",
  "isEquippable": false,
  "maxStack": 10,
  "rarity": "COMMON"
}

}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 장비 아이템 변경
### Method: PUT
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
"itemId":20,
"updateData":{
  "name": "Legendary Sword",
  "isEquippable": true,
  "maxStack": 1,
  "rarity": "LEGENDARY"
}
}
```

### RES
```json
{
    "success": true,
    "id": 20,
    "name": "Legendary Sword",
    "value": 238,
    "isEquippable": true,
    "maxStack": 1,
    "quantity": 1,
    "rarity": "LEGENDARY",
    "equippedByCharacterId": null,
    "inventoryOfCharacterId": null,
    "message": "Item modified successfully"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 삭제
### Method: DELETE
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
"itemId":20
}
```


### RES
```json
{
    "success": true,
    "message": "Item deleted successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: item-interaction 


## End-point: 인벤토리 검색
### Method: GET
>```
>sprata.positivenerd.duckdns.org/items
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "page" : 1,
    "pageSize" : 1000
}
```

### RES
```json
{
    "success": true,
    "name": "GM스파르타",
    "gold": 10000,
    "totalItems": 17,
    "items": [
        {
            "id": 204,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 96,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 204
                }
            ]
        },
        {
            "id": 205,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 97,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 205
                }
            ]
        },
        {
            "id": 206,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 98,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 206
                }
            ]
        },
        {
            "id": 207,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 99,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 207
                }
            ]
        },
        {
            "id": 208,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 100,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 208
                }
            ]
        },
        {
            "id": 209,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 101,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 209
                }
            ]
        },
        {
            "id": 210,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 102,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 210
                }
            ]
        },
        {
            "id": 211,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 103,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 211
                }
            ]
        },
        {
            "id": 212,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 104,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 212
                }
            ]
        },
        {
            "id": 213,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 105,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 213
                }
            ]
        },
        {
            "id": 215,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 107,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 215
                }
            ]
        },
        {
            "id": 216,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 108,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 216
                }
            ]
        },
        {
            "id": 217,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 109,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 217
                }
            ]
        },
        {
            "id": 218,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 110,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 218
                }
            ]
        },
        {
            "id": 219,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 111,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 219
                }
            ]
        },
        {
            "id": 220,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 112,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 220
                }
            ]
        },
        {
            "id": 221,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 113,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 221
                }
            ]
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 검색
### Method: GET
>```
>sprata.positivenerd.duckdns.org/items/search
>```
### Body (**raw**)

```json
{
  "searchTerm": "Sword",  // 이름에 "Sword"가 포함된 아이템
  "stats": {
    "attackBonus": 50     // 공격력 보너스가 정확히 50인 아이템
  },
  "isEquippable": true,     //장비여부
  "minValue": 100,         // 가격이 100 이상인 아이템
  "page": 1,               // 첫 번째 페이지
  "pageSize": 10           // 한 페이지에 10개의 아이템 반환
}

```

### RES
```json
{
    "success": true,
    "totalItems": 1,
    "items": [
        {
            "id": 203,
            "name": "Sword of Valor",
            "value": 500,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "RARE",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": null,
            "stats": [
                {
                    "id": 95,
                    "healthBonus": 20,
                    "attackBonus": 50,
                    "defenseBonus": 15,
                    "critChanceBonus": 5,
                    "critMultiplierBonus": 1.25,
                    "evasionBonus": 0,
                    "accuracyBonus": 10,
                    "itemId": 203
                }
            ]
        }
    ]
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 구매
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items/buy
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "itemId" : 151,
    "quantity": 20
}
```

### RES
```json
{
    "success": true,
    "items": [
        {
            "id": 204,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 96,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 204
                }
            ]
        },
        {
            "id": 205,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 97,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 205
                }
            ]
        },
        {
            "id": 206,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 98,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 206
                }
            ]
        },
        {
            "id": 207,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 99,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 207
                }
            ]
        },
        {
            "id": 208,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 100,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 208
                }
            ]
        },
        {
            "id": 209,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 101,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 209
                }
            ]
        },
        {
            "id": 210,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 102,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 210
                }
            ]
        },
        {
            "id": 211,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 103,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 211
                }
            ]
        },
        {
            "id": 212,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 104,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 212
                }
            ]
        },
        {
            "id": 213,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 105,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 213
                }
            ]
        },
        {
            "id": 214,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 106,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 214
                }
            ]
        },
        {
            "id": 215,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 107,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 215
                }
            ]
        },
        {
            "id": 216,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 108,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 216
                }
            ]
        },
        {
            "id": 217,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 109,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 217
                }
            ]
        },
        {
            "id": 218,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 110,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 218
                }
            ]
        },
        {
            "id": 219,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 111,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 219
                }
            ]
        },
        {
            "id": 220,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 112,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 220
                }
            ]
        },
        {
            "id": 221,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 113,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 221
                }
            ]
        },
        {
            "id": 222,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 114,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 222
                }
            ]
        },
        {
            "id": 223,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": null,
            "inventoryOfCharacterId": 1,
            "stats": [
                {
                    "id": 115,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 223
                }
            ]
        }
    ],
    "remainingGold": 10000
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 판매
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items/sell
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "itemName" : "Sleek Plastic Soap",
    "quantity": 3
}
```

### RES
```json
{
    "success": true,
    "name": "GM스파르타",
    "gold": 10000,
    "soldItems": 3,
    "totalPrice": 0,
    "remaining": 17
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 장착
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items/equip
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "itemId" : 205
}
```

### RES
```json
{
    "success": true,
    "equippedItems": [
        {
            "id": 204,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": 1,
            "inventoryOfCharacterId": null,
            "stats": [
                {
                    "id": 96,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 204
                }
            ]
        },
        {
            "id": 205,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": 1,
            "inventoryOfCharacterId": null,
            "stats": [
                {
                    "id": 97,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 205
                }
            ]
        }
    ],
    "finalStats": {
        "health": 18,
        "attackPower": 6,
        "defense": 94,
        "critChance": 58,
        "critMultiplier": 2.45843627467399,
        "evasion": 8,
        "accuracy": 20
    },
    "message": "Item equipped successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 아이템 장착 해제
### Method: POST
>```
>sprata.positivenerd.duckdns.org/items/unequip
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json
{
    "itemId" : 204
}
```

### RES
```json
{
    "success": true,
    "unequippedItem": {
        "id": 204,
        "name": "Sleek Plastic Soap",
        "value": 126,
        "isEquippable": true,
        "maxStack": 1,
        "quantity": 1,
        "rarity": "UNCOMMON",
        "equippedByCharacterId": null,
        "inventoryOfCharacterId": 1
    },
    "equippedItems": [
        {
            "id": 205,
            "name": "Sleek Plastic Soap",
            "value": 126,
            "isEquippable": true,
            "maxStack": 1,
            "quantity": 1,
            "rarity": "UNCOMMON",
            "equippedByCharacterId": 1,
            "inventoryOfCharacterId": null,
            "stats": [
                {
                    "id": 97,
                    "healthBonus": 9,
                    "attackBonus": 3,
                    "defenseBonus": 47,
                    "critChanceBonus": 29,
                    "critMultiplierBonus": 1.229218137336995,
                    "evasionBonus": 4,
                    "accuracyBonus": 10,
                    "itemId": 205
                }
            ]
        }
    ],
    "finalStats": {
        "healthBonus": 0,
        "attackBonus": 0,
        "defenseBonus": 0,
        "critChanceBonus": 0,
        "critMultiplierBonus": 0,
        "evasionBonus": 0,
        "accuracyBonus": 0
    },
    "message": "Item unequipped successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: 사냥 보상 획득
### Method: POST
>```
>http://sprata.positivenerd.duckdns.org/items/reward
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjYwNzMyMTksImV4cCI6MTcyNjI0NjAxOSwiYXVkIjoic3BhcnRhIiwiaXNzIjoicG9zaXRpdmVuZXJkLmR1Y2tkbnMub3JnIn0.eR63Ejt8-nVk_iyCjk5bWCaoiUHCorQTXGZ69GvKYI4|


### Body (**raw**)

```json

```

### RES
```json
{
    "success": true,
    "message": "Hunting reward gained!",
    "goldEarned": 100,
    "currentGold": 10600,
    "itemAcquired": "[COMMON]Mana Potion"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
