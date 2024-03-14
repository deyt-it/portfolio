# Frontend Portfolio

- 기여도 : 100%
- 이력서에 기재된 참여 서비스의 이미지 및 링크를 기록해둔 페이지입니다.  
중단된 서비스의 경우, 시연 영상으로 대체합니다.
<br><br>

## 🔗 Link
<https://deyt-it.github.io/portfolio/>
<br><br>

## 🔧 Stacks
- **Language** : HTML | SCSS | TypeScript
- **Library & Framework** : React | styled-components | html-to-image | gh-pages
- **Deploy**: vite | Github Actions
<br><br><br>

## 📑 Features
![포트폴리오 페이지 완성](https://github.com/deyt-it/portfolio/assets/47001575/9a1431cc-4d41-4daf-9685-e8da648781b5)

- **슬라이더**
   - 내비게이션 버튼 클릭시 좌우 이동
   - 썸네일 클릭시 좌우 이동
- **타임라인**
   - 스크롤이 위치한 컨텐츠의 근무기간에 해당하는 연도범위 활성화
   - 연도별 클릭시 해당 근무기간의 컨텐츠로 이동
- **반응형**
   - 화면 줄일시 썸네일이 불릿 버튼으로 변경되고 L/O 일부 변화  
   (뷰포트 너비 1000px 이하부터)
<br><br><br>


## 🕑 Process
**1. 화면 구상**  
![포트폴리오 구현과정01 페이지 구상](https://github.com/deyt-it/portfolio/assets/47001575/0139d86d-da18-4c0f-a031-5d4a6039d694)  
<br>
**2. 화면 목업**  
![포트폴리오 구현과정02 페이지 목업](https://github.com/deyt-it/portfolio/assets/47001575/e7530d3a-c23c-4b13-9ffa-42a805c4d89c)  
<br>
**3. 일정 산출**  
![포트폴리오 구현과정03 일정산출](https://github.com/deyt-it/portfolio/assets/47001575/aee82c6f-5d42-48d2-9a3a-a2e14bd3abf1)  
<br>
**4. 구현**  
![포트폴리오 구현과정04 구현](https://github.com/deyt-it/portfolio/assets/47001575/abdbfd42-ce4f-40d6-b90f-dc0cad3f6ea9)  
<br><br><br>

## ⚙️ Description
- **슬라이더의 무한 루프 기능**
 1. 슬라이드 리스트를 item의 너비만큼 이동하며 보여줌
 2. 양 끝에 다다랐을 시, 사전에 추가해뒀던 클론 item을 보여주어  
 애니메이션에 끊김이 없어보이도록 함
 3. 이후 원본 item으로 스위칭을 하여 눈속임을 주고 이동 애니메이션을 재개  

- **슬라이더의 썸네일 그리기**
 1. 슬라이더 아이템의 ref값들을 배열 상태값으로 관리
 2. 슬라이더 아이템의 각 이미지 로드완료시 해당ref값을 위 상태값에 업데이트
 3. ref값 업데이트시, html-to-image라이브러리 실행 (컨버팅 작업 : ref → 이미지url)
 4. 컨버팅 완료시 썸네일의 로딩 이미지를 완료된 url의 이미지로 변경

- **타임라인의 스크롤 이벤트**
 1. 스크롤 이동시, 타임라인을 활성화시키기 위한 정보를 배열로 관리 (순서 보장)  
 `
 [ { index, scrollTop, scrollBottom, startYear, endYear }, … ]
 `
 2. 위 배열중 스크롤의 현위치에 해당하는 요소를 상태값으로 관리
 3. 스크롤이 현재 영역을 벗어나면 다음 영역정보를 상태값으로 업데이트
 4. 리렌더가 발생하며 스크롤의 현재범위 재설정, 타임라인의 해당범위 활성화
<br><br><br>

## 🥢 Installation
1. Clone the repository: 
```
git clone https://github.com/deyt-it/portfolio.git
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open the project in your browser:
```
http://localhost:5173/portfolio
```

