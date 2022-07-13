# 0. Coin Track

이 프로젝트는 RESTful API를 이용한 Crypto Coins Tracking Web Application을 목표로, 반응형 디자인으로 구현했습니다.

프로젝트 링크 : [https://songforthemute.github.io/coin_track]("https://songforthemute.github.io/coin_track")

미디엄 블로그 링크 : [https://medium.com/@songforthemute]("https://medium.com/@songforthemute")

---

## 목차

1. 기술 스택
2. 프로젝트 기능
3. 프로젝트 스크립트

---

## 1. 기술 스택

-   Language : `TypeScript`

-   Frontend : `ReactJS`, `Styled-component`, `Recoil`, `React-query`, `ApexChart.js`

-   Distribution : `netlify`

---

## 2. 프로젝트 기능

-   메인 페이지 암호화폐 리스트 표시

-   암호화폐 별 상세 페이지와 중첩 라우팅으로 상세 페이지 내부에 차트, 프라이스, 이벤트 탭 구현

-   상세 페이지 내 차트 라이브러리를 통한 최근 동향 그래프 구현

-   Styled-Component와 Recoil을 통한 라이트 모드-다크 모드 테마 토글 구현

-   미디어 쿼리를 이용한 모바일과 데스크톱의 반응형 디자인

-   keyframe animation을 이용한 로딩 컴포넌트 구현

---

## 3. 프로젝트 스크립트

### `npm start`

프로젝트를 개발 모드로 실행할 수 있습니다. [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다.

### `npm build`

애플리케이션이 `build` 폴더에 빌드됩니다.

### `npm predeploy`

애플리케이션의 `gh-pages`를 이용한 배포를 하기 위한 사전 빌드 작업입니다. `npm run build`와 같습니다.

### `npm deploy`

`-d 디렉토리명` 폴더의 애플리케이션을 gh-pages를 통해 배포합니다. Github repository에서도 확인할 수 있습니다.

---

# 봐주셔서 감사합니다!
