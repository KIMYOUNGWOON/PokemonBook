# POKEDEX
### 포켓몬 정보를 제공하는 포켓몬 도감 웹 서비스
* 포켓몬에 대한 정보를 한 곳에서 효율적으로 제공합니다.
* 검색, 정렬, 다양한 옵션의 필터 등의 조건을 중첩 적용하여 세부적인 결과를 얻을 수 있습니다.
* 기존의 포켓몬 도감보다 더 나은 사용자 경험을 제공하기 위해 노력했습니다.  

⭐️ 서비스 배포 링크 : [포켓몬 도감 서비스](http://s3-hosting-pokedex.s3-website.ap-northeast-2.amazonaws.com/)  

⭐️ 시연 영상 : [Youtube 영상](https://youtu.be/KNJ8O7B1g8Q?si=waTmpWljgsO4gkG9)   

<p>&nbsp;</p>

## 사용 기술
* 개발 언어 및 라이브러리 : React + TypeScript
* 사용자 인터페이스 : MUI + styled-components
* 서버 상태 관리 : TanStack Query
* 개발 환경 구축 : vite
* 프로젝트 관리 : Git + Git Hub
* PokeAPI 활용

<p>&nbsp;</p>

## 사용자 인터페이스 작업
<img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/728ba930-6c3a-421b-a9eb-5b8ed848276b" width="317"/> <img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/b682974b-0cda-4c6d-bea1-856a217529da" width="379"/>

* 공통 레이아웃 구현
  * Layout.tsx 컴포넌트 생성
  * 해당 컴포넌트는 페이지의 공통된 요소를 포함 (ex. 헤더, 푸터, 네비게이션)
  * Outlet 컴포넌트를 사용하여 페이지마다 공통된 레이아웃 적용
    
* 인터렉션 UI 개발
* 컬러 정의

<p>&nbsp;</p>

## 메인 페이지 (리스트)
<img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/c2456fc9-814d-4b73-8a0a-3c850679659d" width="800"/>

### 데이터 페칭
* 포켓몬 리스트 가져오기
  * PokeAPI를 활용하여 Axios로 비동기 요청 처리
  * tanstack-query의 useQuery 훅 활용
  * 지정한 queryKey에 가져온 데이터를 캐싱하여 이후에 빠르게 불러옴

* 데이터 가공해서 가져오기
  * PokeAPI의 엔드포인트 구조는 각 정보에 대해 별도의 엔드포인트가 분리되어 있음
  * 포켓몬 리스트를 불러온 후에 각 포켓몬의 상세 정보 API URL을 추출
  * Promise.all을 사용하여 병렬로 상세 정보 요청 처리
  * 각 응답에서 필요한 정보만을 추출하여 배열에 담아 가져오기

* 전체 리스트 한 번에 불러오기
  * PokeAPI는 검색, 필터, 정렬 등의 중첩 조건을 위한 엔드포인트를 제공하지 않음
  * 복잡한 조건의 요청을 수행하기 위해 초기에 전체 리스트를 가져와서 프론트 단에서 처리
  * 데이터를 가져오는 동안 isLoading 상태에 따라 로딩 스피너 노출
  * 새 리스트를 가져올 때마다 자동으로 스크롤을 맨위로 올림

<p>&nbsp;</p>
 
### 페이지네이션
![ezgif com-video-to-gif-converter (8)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/a519bd72-4b6d-49c8-8ec6-758185d8177e)

* 쿼리 스트링 활용
  * 페이지를 변경할 때마다 쿼리 스트링의 offset값 업데이트
  * Home 컴포넌트에서 쿼리 객체를 생성하고 useQuery 훅의 queryKey로 사용
  * 쿼리 객체가 변경될 때마다 useQuery 훅이 재실행되어 새로운 리스트 반환
  * 현재 URL 쿼리스트링의 offset 값으로 페이지 위치를 트리거하여 새로고침 후에도 현재 위치 유지
 
* 페이지 이동 버튼 제공
  * 가져온 리스트 수를 기반으로 페이지네이션 버튼 렌더링
  * 페이지 버튼을 전부 한 번에 보여주지 않고 그룹화하여 보여주기 위해 offset 값을 활용하여 계산
  * 페이지를 하나씩 이동하거나 페이지 그룹으로 이동하는 화살표 버튼 제공
  * 뒤로 더 많은 페이지가 있는 경우, 점 세 개(•••)로 페이지가 더 있다는 것을 표시
  * 현재 페이지 위치에 따라 화살표 아이콘과 점 세 개(•••)를 조건부 렌더링

<p>&nbsp;</p>

### 필터 및 정렬
![ezgif com-video-to-gif-converter (9)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/8076efbc-ecd3-4f1b-ab98-b38ddd658d85)

* 필터 기능
  * 포켓몬의 속성, 능력, 키, 몸무게 등 다양한 옵션 제공
  * 각 옵션은 중첩해서 적용 가능하여 세부적인 결과를 얻을 수 있음
    * ?offset=0&limit=9&type=poison&ability=solar-power&height=small+large&weight=small+medium
 
* 정렬 기능
  * 포켓몬 번호를 기준으로 오름차순, 내림차순 정렬 기능 제공
  * 필터 조건에 중첩해서 적용 가능

* 구현 내용
  * 필터, 정렬 기능 둘다 URL의 쿼리 스트링을 업데이트 하는 방식으로 구현
  * 필터는 옵션을 설정하고 Apply 버튼을 누르면 쿼리 스트링 업데이트
  * 정렬은 Selet 박스 옵션을 선택하자마자 바로 쿼리 스트링 업데이트
  * 쿼리 스트링이 업데이트되면 리렌더링이 발생하면서 쿼리 객체 값이 바뀜
  * 쿼리 객체를 queryKey 값에 지정하여 트리거 하고 있는 useQuery 훅 재실행 
  * 쿼리 객체를 받은 API 함수에서 쿼리 객체의 값의 따라 필터링 된 리스트 반환
  * 리셋 버튼을 제공하여 모든 설정 조건을 초기화
  

 
<p>&nbsp;</p>

### 검색 기능
![ezgif com-video-to-gif-converter (7)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/58bcdd38-edff-4cdb-a08b-244efbb5d16b)

* 포켓몬 이름 또는 번호로 검색
  * useState를 사용하여 사용자 입력값 관리
  * 검색 버튼을 눌렀을 때 입력값이 있으면 사용자의 입력값을 keyword 쿼리 파라미터의 값으로 설정
  * setSearchParams를 호출하여 URL의 쿼리 스트링 업데이트
  * 이때 offset 값은 0으로 리셋되어 검색 결과의 첫 페이지로 이동
  * 쿼리 스트링이 업데이트되면 queryKey에 지정한 쿼리 객체가 변경되어 useQuery 훅 재실행
  * 쿼리 객체를 받은 API 함수에서 조건에 해당하는 포켓몬 리스트 반환
  * 데이터를 가져오는 동안 isLoading 상태에 따라 로딩 스피너 노출
  * 조건에 해당하는 포켓몬이 없을 경우 찾지 못했다는 문구 노출
  * URL의 쿼리 스트링를 통해 리스트 상태를 관리하여 페이지 새로고침 후에도 검색 조건을 유지

<p>&nbsp;</p>

## 상세 페이지
<img src="https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/ed0d28e4-1cc0-49c5-afd7-fefe1ad247a5" width="800"/>
* 상세 페이지 주요 기능
  * 포켓몬의 상세 정보를 가져와서 시각적으로 보여줌
    * 포켓몬의 스탯 같은 경우는 게이지로 시각화 함 
  * 다른 포켓몬의 상세 페이지 이동이 편하도록 포켓몬 리스트 컴포넌트 제공
    * 해당 컴포넌트는 추가 불러오기를 통해 리스트 추가 조회
  * 페이지 이동 버튼을 제공하여 이전 포켓몬, 다음 포켓몬의 상세 페이지로 이동

![ezgif com-video-to-gif-converter (6)](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/989e75ee-9d5d-482e-9623-7a81dcacbdd0)

### 데이터 페칭
* 포켓몬 상세 정보 가져오기
  * React Router를 사용하여 포켓몬의 상세 정보를 가져오기 위한 동적 라우팅 구현
  * useParams 훅을 사용하여 현재 URL의 패스 파라미터에서 포켓몬의 ID를 추출
  * useQuery 훅을 사용하여 포켓몬 정보를 가져오는 비동기 요청 수행
  * 해당 ID를 사용하여 두 번의 API 호출을 통해 포켓몬의 기본 정보와 species에 대한 추가 정보를 가져옴
  * 필요한 정보만 추출하여 포켓몬의 상세 정보를 포함하는 객체를 생성하고 반환
    
* 포켓몬 리스트 가져오기
  * PokeAPI 리스트 조회 엔드포인트로 요청할 때 limit 값을 20씩 더하여 조회하려고 시도 
  * 추가 불러오기 누를 때마다 이전에 불러온 데이터가 잠시 사라지는 현상 발생 (20개씩 추가된 데이터로 덮어쓰기가 되어버림)
  * 추가적인 데이터만 가져와서 기존 리스트와 합치는 방식으로 다시 구현 (임시 저장소로 state 활용)
  * 추가 불러오기 버튼을 클릭하면 offset 값을 조정하여 다음 20개의 포켓몬 데이터를 가져와 기존 데이터에 추가

<p>&nbsp;</p>

## 마이 페이지
![2024-04-252 21 22-ezgif com-video-to-gif-converter](https://github.com/KIMYOUNGWOON/PokemonBook/assets/126956430/18ea3c4f-20f7-470b-ac65-48e268d080c1)

* 나의 포켓몬 도감 저장
  * localStorage 저장소를 사용하여 나의 포켓몬 리스트를 배열로 관리하여 저장
  * 포켓볼 클릭 상태에 따라 토글로 localStorage에 저장된 배열에서 해당 포켓몬 추가 및 삭제
  * localStorage에 저장하거나 가져올 때 JSON 객체의 메소드 활용해서 직렬화 또는 역직렬화 과정 수행
  * 마이 페이지에서 저장한 포켓몬 리스트를 보여줄 때는 ID 기준으로 정렬
  * 저장된 포켓몬이 없는 경우 empty 메시지와 함께 리스트 페이지로 이동할 수 있는 링크 표시
  * ListItem 컴포넌트에서는 해당 포켓몬이 나의 도감에 있는지 체크하여 포켓볼 상태 유지






