# Coin Track

## **_목차_**

0. [개요](#0-개요)
1. [기술 스택](#1-기술-스택)
2. [프로젝트 상세](#2-프로젝트-상세)
3. [프로젝트 스크립트](#3-프로젝트-스크립트)

---

![preview](public/preview.gif)

---

## _0. 개요_

-   이 프로젝트는 **암호 화폐 트래킹 서비스**로, `React.js`와 **coinpaprika** API를 이용해 개발한 웹 애플리케이션입니다. _(This project is **a cryptocurrency tracking service**, a web application developed using `React.js` and **coinpaprika** API.)_

-   Project Deployment : [Coin Track](https://track-coin-track.netlify.app)

-   Medium Blog : [https://medium.com/@songforthemute](https://medium.com/@songforthemute)

-   <details>
       <summary><i>프로젝트 구조(Project structure)</i></summary>

        📦coin_track
        ┣ 📂public
        ┃ ┣ 📜favicon.ico
        ┃ ┣ 📜index.html
        ┃ ┣ 📜logo192.png
        ┃ ┣ 📜logo512.png
        ┃ ┣ 📜manifest.json
        ┃ ┗ 📜robots.txt
        ┣ 📂src
        ┃ ┣ 📂routes
        ┃ ┃ ┣ 📜Chart.tsx
        ┃ ┃ ┣ 📜Coin.tsx
        ┃ ┃ ┣ 📜CoinJsonTypes.ts
        ┃ ┃ ┣ 📜Coins.tsx
        ┃ ┃ ┣ 📜Events.tsx
        ┃ ┃ ┗ 📜Price.tsx
        ┃ ┣ 📜App.tsx
        ┃ ┣ 📜GlobalStyle.tsx
        ┃ ┣ 📜Loading.tsx
        ┃ ┣ 📜Router.tsx
        ┃ ┣ 📜api.ts
        ┃ ┣ 📜atoms.ts
        ┃ ┣ 📜index.tsx
        ┃ ┣ 📜styled.d.ts
        ┃ ┗ 📜theme.ts
        ┣ 📜.gitattributes
        ┣ 📜.gitignore
        ┣ 📜README.md
        ┣ 📜package-lock.json
        ┣ 📜package.json
        ┗ 📜tsconfig.json

    </details>

---

## _1. 기술 스택_

-   Language : `TypeScript`

-   Core : `React.js`, `ApexCharts.js`

-   State Management : `Recoil`, `React-query`

-   Style : `Styled-Components`

-   Deployment : `Netlify`

-   Others : `React-helmet`

---

## _2. 프로젝트 상세_

-   이 프로젝트는 `React.js`와 coinpaprika API를 이용해 개발한 암호 화폐 트래킹 웹 애플리케이션입니다. _(This project is a password transmission web application developed using `React.js` and coinprika API.)_

-   `ApexCharts.js`를 이용하여 암호 화폐의 최근 추이 데이터 시각화를 구현했습니다. _(Using `ApexCharts.js`, we implemented a visualization of recent trends in cryptocurrency.)_

-   `Styled-Components`를 이용해 라이트-다크 테마를, `Recoil`을 이용하여 테마 모드 토글 기능을 구현했습니다. _(Light-dark theme is implemented using `Styled-Components` and theme mode toggle function is implemented using `Recoil`)_

-   `React-query`를 이용하여 호출한 API에 대한 응답을 캐싱하여 대역폭을 절약하고, 재방문 시 빠른 응답을 제공하였습니다. _(By caching responses to the API called using `React-query`, bandwidth was saved and a quick response was provided when revisiting.)_

-   `Styled-Components`와 미디어 쿼리를 이용해, 다양한 화면에 대응할 수 있는 반응형 디자인으로 구현했습니다. _(Using `Styled-Components` and media queries, we implemented a responsive design that can respond to various screens.)_

---

## _3. 프로젝트 스크립트_

-   #### **_이 프로젝트의 개발 환경_**
    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Package Manager : `npm`
    -   Browser : `Chrome` | `Safari` | `Vivaldi`

```
npm run start
```

-   프로젝트를 개발 모드로 실행할 수 있습니다. [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다.

```
npm run build
```

-   애플리케이션이 `build` 폴더에 빌드됩니다.

```
npm run predeploy
```

-   애플리케이션의 `gh-pages` 패키지와 브랜치를 이용한 배포를 하기 위한 사전 빌드 작업입니다. `npm run build`와 같습니다.

```
npm run deploy
```

-   `-d 디렉토리명` 폴더의 애플리케이션을 gh-pages를 통해 배포합니다. Github repository에서도 확인할 수 있습니다.

---

<h3 align="center">
<i>
Thank you for visit, <br/>
Have a great day! <br/>
<i>
</h3>

---
