# React-Query를 이용한 Todo-List 🧾

## 프로젝트 소개 📖
### 개요

API를 호출하여 회원가입/로그인 , ToDo 리스트를 구현하였습니다.

### 기술
- 언어

  - TypeScript : 타입 추론을 통해 안전하고 편리한 코드 작성을 할수 있는 정적타입언어.

- 라이브러리 

  - React : SPA 구현과 컴포넌트 단위 개발로 재사용성을 높이고 코드의 가독성을 높일수 있는 장점이 가진 라이브러리.
  
  - React-Query : API로 호출 받은 데이터를 쉽게 가져오고 stale-while-revalidate를 이용해 데이터를 최신화 시킬수 있는 라이브러리.
 
  - Axios : fetch와 달리 응답받은 데이터를 JSON형식으로 자동으로 변환해주는 편리성이 있어 쉽게 API를 호출할 수는 HTTP 비동기 통신 라이브러리.
  
  - mui/material : 쉽고 빠르게 스타일링을 구현할 수있는 React UI 컴포넌트 라이브러리.
  
## 프로젝트 일정 📆

### 사전 과제 기간 (23.01.04 ~ 23.01.06)

#### 구현내용

- [ ] 회원가입 / 로그인

- [ ] Todo-List 구현

### 1차 리팩토링 (23.01.12 ~ 23.01.13)

#### 구현내용

- [ ] Javascript -> Typescript 변환

- [ ] any나 타입단언을 최소화 하여 인터페이스/ 유니온 등을 사용하여 타입 정의

- [ ] 이름이 불명확한 변수 & 함수명 , 폴더 & 컴포넌트명 변경

- 수정 전

```jsonc
const [data,setData] = useState([])
```

- 수정 후

```jsonc
const [toDoData, setTodoData] = useState([])
```

### 2차 리팩토링 (23.01.14 ~ 23.01.16)

#### 구현내용

- [ ] Recoil 삭제

기존에 적용시킨 Recoil의 기능은 리랜더링 시 axios 무한 호출을 막고자 refreshKey라는 state값을 만들었습니다.

추가/수정/삭제 버튼을 누르면 refreshKey가 +1이 발생하여 refreshKey의 값이 변화될때마다 데이터를 호출할 수 있도록 하였습니다.
```jsonc
const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
      useEffect(() => {
      getTodosHandler();
}, [refreshKey]);
```
하지만 아무런 동작없이 실시간으로 최신화 된 데이터가 필요하다고 가정하면 이러한 방식은 refreshKey가 변할 때만 작동되어서 적합하지 않는 방법이라 생각했습니다.

이러한 문제를 해결하기 위해 ReactQuery를 도입하여 해결하였습니다.

- [ ] React-Query 로 교체

- UseQuery 사용

```jsonc
//TodoList.tsx

const { data: todos, isLoading } = useQuery<TodoListType[]>({
    queryKey: ["todos"],
    queryFn: getTodosController,
});
```

- UseMutation 사용
```jsonc
//TodoTextFiled.tsx

const createTodoMutation = useMutation({mutationFn: ({ title, content }: TodoDataType) =>
     createTodoController(title, content),
     onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ["todos"] });
     },

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
                    ...
    createTodoMutation.mutate({ title, content });
};
```
  invalidateQueries로 인해 쿼리가 stale되고 refetch가 진행되어 투두 데이터의 추가/수정/삭제 mutation이 성공적으로 발생되면 실시간으로 새로운 데이터가 반영됩니다.

  참고 레퍼런스 (1) : https://tkdodo.eu/blog/mastering-mutations-in-react-query
  
  참고 레퍼런스 (2) : https://maxkim-j.github.io/posts/react-query-preview/

### 3차 리팩토링 (23.01.17 ~ 23.01.20)

#### 구현내용

- [ ] 사용자 편의성을 위해 UI 수정 (진행중)

- [ ] API함수 호출 후 token값이 없을때 예외사항 처리 (예정)

- [ ] Login/TodoList Router redirect 구현 수정 (예정)

기존 코드에서는 Home.tsx에서
```jsonc
//Home.tsx

useEffect(() => {
    if (!token) {
        navigate("/login");
    } else {
      navigate("/todo");
    }
}, []);
```
아래와 같이 token값이 존재하면 /todo로 존재하지 않으면 /login으로 이동시키게 구현하였습니다.

근데 주소창에 "/"를 치면 token이 존재하지 않을 때 Todo리스트 화면이 조금이라도 보이는지 확인을 아직 못했는데 애초에

Home.tsx에서는 redirect기능말곤 구현이 안되어 있고 직접적으로 랜더링하는것이 없고 로그인, ToDo컴포넌트에 navigate를 쓴게 아니라서 상관없지 않을까라고 생각도 해봤는데 정확히 모르기   

때문에 조금 더 공부하고 수정하도록 하겠습니다.

- [ ] 폴더구조 변경

- 기존 폴더구조

    - components : Header,Footer,Modal 등 재사용이 가능하고 분리된 컴포넌트들을 모아둔 폴더

    - interface : Typescript 인터페이스를 모아둔 폴더

    - pages : router로 이동되는 컴포넌트를 모아둔 폴더

    - routes : 컴포넌트들의 router가 선언된 파일을 모아둔 폴더

    - utils : API 함수를 모아둔 폴더

           📦src
            ┣ 📂components
            ┃ ┣ 📂Footer
            ┃ ┃ ┗ 📜Footer.tsx
            ┃ ┣ 📂Header
            ┃ ┃ ┗ 📜Header.tsx
            ┃ ┣ 📂Modal
            ┃ ┃ ┗ 📜UpdateTodo.tsx
            ┃ ┣ 📂TextField
            ┃ ┃ ┣ 📜LoginTextField.tsx
            ┃ ┃ ┣ 📜SignUpTextField.tsx
            ┃ ┃ ┗ 📜TodoTextField.tsx
            ┃ ┗ 📂TodoList
            ┃ ┃ ┣ 📜TodoDetailView.tsx
            ┃ ┃ ┗ 📜TodoListView.tsx
            ┣ 📂interface
            ┃ ┗ 📜Todo.interface.ts
            ┣ 📂pages
            ┃ ┣ 📜Home.tsx
            ┃ ┣ 📜Login.tsx
            ┃ ┣ 📜SignUp.tsx
            ┃ ┗ 📜TodoList.tsx
            ┣ 📂routes
            ┃ ┗ 📜Router.tsx
            ┣ 📂utils
            ┃ ┣ 📂auth
            ┃ ┃ ┗ 📜api.ts
            ┃ ┗ 📂todo
            ┃ ┃ ┗ 📜api.ts
            ┣ 📜App.css
            ┣ 📜App.test.tsx
            ┣ 📜App.tsx
            ┣ 📜index.css
            ┣ 📜index.tsx
            ┣ 📜logo.svg
            ┣ 📜reportWebVitals.ts
            ┗ 📜setupTests.ts

## 프로젝트 실행 화면 💻

    준비중..

## 프로젝트 실행 방법 🔑

- server
```jsonc
cd server
npm i  or yarn  
npm start or yarn start
```
- client
```jsonc
cd client
npm i
npm start
```
