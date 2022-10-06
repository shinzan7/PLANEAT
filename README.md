## 📌깃 컨벤션

### 💡 커밋룰

#### Commit 메세지 작성 법

```
타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다.

**`태그 : 제목`의 형태이며, `:`뒤에만 space가 있음에 유의한다.**

- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Docs`: 문서 수정
- `Refactor`: 코드 리펙토링
- `Test`: 테스트 코드, 리펙토링 테스트 코드 추가
- `Chore`: 빌드 업무 수정, 패키지 매니저 수정
```

### 💡 브랜치

```
Master: 최종 코드 완성시 merge 한다.
FE: 프론트엔드 작업. 세부 기능은 하위 브랜치 생성하여 작업 후 merge 한다.
BE: 백엔드 작업. 세부 기능은 하위 브랜치 생성하여 작업 후 merge 한다.
```

### 💡 브랜치 전략

```
BE or FE-기능
-ex) BE-로그인, FE-로그인 화면 구현
```

## 📌각 문서 링크

[기능명세서](https://tall-park-c47.notion.site/bc28582961e947a39b260bd4fe61a6c7)

[API명세서](https://tall-park-c47.notion.site/REST-API-dbf0df2013a94ae2ad38037c567d7273)

[와이어프레임](https://www.figma.com/file/XauGIKduCFkKDSdA48Ytgq/%ED%94%8C%EB%9E%9C%EC%9E%87?node-id=1%3A2)

[ERD](https://www.erdcloud.com/d/xfMAwT572kzGxh4Fx)


# PlanEat 서비스

## 📌 회원관리

### 1) 회원가입

<img width=30% src="/uploads/61c004a8ee354da4cbe984a5b5bd30b0/회원가입.jpg">
<p>각 항목의 유효성 검사를 만족하면, 회원 가입이 완료됩니다.</p>

### 2) 로그인

<img width=30% src="/uploads/ce985962140dddcb448b276bd69fde0d/로그인.jpg">
<p>유저간의 신뢰성 확보를 위해 로그인 후 서비스 이용이 가능합니다.</p>

### 3) 비밀번호 재발급

<img width=30% src="/uploads/8262d3ffd8f8190cfdf18b21c0602616/비밀번호재발급.jpg">
<p>가입했던 아이디(이메일)를 입력하면, 해당 이메일로 비밀번호 초기화 링크가 전송됩니다.</p>



<p>나를 팔로우하는 유저, 내가 팔로우하는 유저를 볼 수 있습니다.</p>
