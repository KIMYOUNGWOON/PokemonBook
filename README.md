# POKEDEX
### 포켓몬 정보를 제공하는 포켓몬 도감 웹 서비스
* 포켓몬에 대한 정보를 한 곳에서 효율적으로 제공합니다.
* 검색, 정렬, 다양한 옵션의 필터 등의 조건을 중첩 적용하여 세부적인 결과를 얻을 수 있습니다.
* 기존의 포켓몬 도감보다 더 나은 사용자 경험을 제공하기 위해 노력했습니다.
<br/>
⭐️ 서비스 배포 링크 : [http://pokedex.com](http://s3-hosting-pokedex.s3-website.ap-northeast-2.amazonaws.com/)
<br/>
⭐️ 시연 영상 : 

## 사용 기술
* 개발 언어 및 라이브러리 : React + TypeScript
* 사용자 인터페이스 : MUI + styled-components
* 서버 상태 관리 : TanStack Query
* 개발 환경 구축 : vite
* 프로젝트 관리 : Git + Git Hub
* Pokemon API 활용

## 사용자 인터페이스 작업
<img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/728ba930-6c3a-421b-a9eb-5b8ed848276b" width="317"/> <img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/b682974b-0cda-4c6d-bea1-856a217529da" width="379"/>

* 공통 레이아웃 구현
  * Layout.tsx 컴포넌트 생성
  * 해당 컴포넌트는 페이지의 공통된 요소를 포함 (ex. 헤더, 푸터, 네비게이션)
  * Outlet 컴포넌트를 사용하여 페이지마다 공통된 레이아웃 적용
    
* 인터렉션 UI 개발
* 컬러 정의


## 메인 페이지 (리스트)

### 포켓몬 리스트 가져오기
* Pokemon API를 활용하여 Axios로 비동기 요청 처리
* tanstack-query의 useQuery 메소드 활용
* 지정한 queryKey에 가져온 데이터를 캐싱하여 이후에 빠르게 불러옴

### 데이터 가공해서 가져오기
* 하나의 API에 모든 정보가 들어있지 않음
* 포켓몬 리스트를 불러온 후에 각 포켓몬의 상세 정보 API URL을 추출
* Promise.all을 사용하여 병렬로 상세 정보 요청 처리
* 각 응답에서 필요한 정보만을 추출하여 배열에 담아 가져오기


## 상세 페이지


## 마이 페이지
* 하나의 API에 모든 정보가 들어있지 않음


![2024-04-252 21 22-ezgif com-video-to-gif-converter](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/18ea3c4f-20f7-470b-ac65-48e268d080c1)

![ezgif com-video-to-gif-converter (6)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/989e75ee-9d5d-482e-9623-7a81dcacbdd0)

쿼리 객체가 변경 될떄마다 유즈 쿼리가 실행되서 조건에 맞는 리스트를 가져도오도록 구현함
![ezgif com-video-to-gif-converter (7)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/58bcdd38-edff-4cdb-a08b-244efbb5d16b)


사용자 경험 향상
로딩 처리
새 리스트를 가져올때마다 스크롤 자동으로 맨위로


