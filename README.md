# React-Query를 이용한 Todo-List 🧾

## 과제 소개 📖

API를 이용하여 회원가입/로그인 , ToDo 리스트를 구현하였습니다.

언어: TypeScript
라이브러리 : React, Axios, mui/material, React-Query

## 프로젝트 일정 📆

### 사전 과제 기간 (23.01.04 ~ 23.01.06)

- 구현내용

1. 회원가입 / 로그인

2. Todo-List 구현

### 1차 리팩토링 (23.01.12 ~ 23.01.13)

- 구현내용

  1.Javascript -> Typescript 변환

  2.any나 타입단언을 최소화 하여 인터페이스/ 유니온 등을 사용하여 타입 정의

  3.이름이 애매모호한 변수 & 함수명 , 폴더 & 컴포넌트명 변경

ex)

          const [data,setData] => const [toDoData, setTodoData]

### 2차 리팩토링 (23.01.14 ~ 23.01.16) 진행중

- 구현내용

  1.Recoil 삭제

기존에 적용시킨 Recoil의 기능은 리랜더링 시 axios 무한 호출을 막고자 state값을 만들어

              const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
              useEffect(() => {
                  getTodosHandler();
              }, [refreshKey]);

아래와 같이 적용시켰지만 적절치 않는 방법이었습니다. 그래서 React-Query를 활용해 API 호출부를 구현할 계획이고 React-Query를 이용하기 전 Redux에 대한 개념을 익힌 뒤 실습할 계획입니다.

2.React-Query 로 교체 후 API호출 (예정)

3.Login/TodoList Router redirect 구현 수정 (예정)

기존 코드에서는 Home.tsx에서

        //Home.tsx

             useEffect(() => {
                if (!token) {
                navigate("/login");
                } else {
                navigate("/todo");
                }
            }, []);

아래와 같이 token값이 존재하면 /todo로 존재하지 않으면 /login으로 이동시키게 구현하였습니다.
근데 주소창에 "/"를 치면 token이 존재하지 않을 때 Todo리스트 화면이 조금이라도 보이는지 확인을 아직 못했는데 애초에
Home.tsx에서는 redirect기능말곤 구현이 안되어 있고 직접적으로 랜더링하는것이 없고 로그인, ToDo컴포넌트에 navigate를 쓴게 아니라서 상관없지 않을까라고 생각도 해봤는데 정확히 모르기 때문에 조금 더 공부하고 수정하도록 하겠습니다.

## 프로젝트 실행 화면 💻

    준비중..

## 프로젝트 실행 방법 🔑

- server

        cd server
        npm i
        npm start

- client

        cd client
        npm i
        npm start
