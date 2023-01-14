# Typescript를 이용한 Todo-List

원티드 프리온보딩 프론트엔드 챌린지 1월 선발과제입니다.

## 과제 소개

API를 이용하여 회원가입/로그인 , ToDo 리스트를 구현하였습니다.

언어: TypeScript
라이브러리 : React, Axios, mui/material

## 프로젝트 일정

1. 사전 과제 기간 (23.01.04 ~ 23.01.06)

   - 구현내용
     1. 회원가입 / 로그인
     2. Todo-List 구현

2. 1차 리팩토링 (23.01.12 ~ 23.01.13)

   - 구현내용

     1. Javascript -> Typescript 변환

     2. any나 타입단언을 최소화 하여 인터페이스/ 유니온 등을 사용하여 타입 정의

     3. 이름이 애매모호한 변수 & 함수명 , 폴더 & 컴포넌트명 변경

        ex) const [data,setData] => const [toDoData, setTodoData]

3. 2차 리팩토링 (23.01.14 ~ 23.01.16) 진행중

   - 구현내용

     1. Recoil 삭제
        기존에 적용시킨 Recoil의 기능은 리랜더링 시 axios 무한 호출을 막고자 state값을 만들어
        const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
        useEffect(() => {
        getTodosHandler();
        }, [refreshKey]);
        아래와 같이 적용시켰지만 적절치 않는 방법이었습니다. 그래서 React-Query를 활용해 API 호출부를 구현할 계획이고 React-Query를 이용하여 Redux에 대한 개념을 익힌 뒤 실습할 계획입니다.

     2. React-Query 로 교체 후 API호출(예정)

## 프로젝트 실행 방법

    - server
            cd server
            npm i
            npm start

    - client
            cd client
            npm i
            npm start
