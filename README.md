# React-Query를 이용한 Todo-List 🧾

## 프로젝트 소개 📖

API를 이용하여 회원가입/로그인 , ToDo 리스트를 구현하였습니다.

 - [ ] 언어: TypeScript

 - [ ] 라이브러리 : React, React-Query, Axios, mui/material

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

```json
const [data,setData] = useState([])
```

- 수정 후

```json
const [toDoData, setTodoData] = useState([])
```

### 2차 리팩토링 (23.01.14 ~ 23.01.16)

#### 구현내용

- [ ] Recoil 삭제

기존에 적용시킨 Recoil의 기능은 리랜더링 시 axios 무한 호출을 막고자 state값을 만들어
```json
const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
      useEffect(() => {
      getTodosHandler();
}, [refreshKey]);
```
아래와 같이 적용시켰지만 효울적이지 

- [ ] React-Query 로 교체 후 API호출

- UseQuery 사용
```json
//TodoList.tsx

const { data: todos, isLoading } = useQuery<TodoListType[]>({
    queryKey: ["todos"],
    queryFn: getTodosController,
});
```

- UseMutation 사용
```json
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
  invalidateQueries로 인해 쿼리가 stale되고 refetch가 진행되어 투두 data가 추가/수정/삭제가 되면 실시간으로 새로운 data가 반영된다.

  참고 레퍼런스 (1) : https://tkdodo.eu/blog/mastering-mutations-in-react-query
  
  참고 레퍼런스 (2) : https://maxkim-j.github.io/posts/react-query-preview/

### 3차 리팩토링 (23.01.17 ~ 23.01.20)

#### 구현내용

- [ ] 사용자 편의성을 위해 UI 수정 (진행중)

- [ ] API함수 호출 후 token값이 없을때 예외사항 처리 (예정)

- [ ] Login/TodoList Router redirect 구현 수정 (예정)

기존 코드에서는 Home.tsx에서
```json
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
Home.tsx에서는 redirect기능말곤 구현이 안되어 있고 직접적으로 랜더링하는것이 없고 로그인, ToDo컴포넌트에 navigate를 쓴게 아니라서 상관없지 않을까라고 생각도 해봤는데 정확히 모르기   때문에 조금 더 공부하고 수정하도록 하겠습니다.

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

        cd server
        npm i
        npm start

- client

        cd client
        npm i
        npm start
