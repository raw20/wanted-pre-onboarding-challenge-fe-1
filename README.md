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

### 3차 리팩토링 (23.01.17 ~ 23.01.21)

#### 구현내용

- [ ] 사용자 편의성을 위해 UI 수정

- 회원가입 / 로그인

  - 회원가입 시 비밀번호 확인 추가

  - 회원가입 / 로그인 실패 시 사용자에게 피드백 제공 : 더 빠르게 회원가입 제공

리팩토링 전 vs 리팩토링 후

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213727283-a478c605-092f-4afb-b019-6071bbf06dbf.PNG" width="450" height="460"/>
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213727388-1f60ed14-e2ec-47c9-bd28-f2ee68d924f3.PNG" width="450" height="460"/>
  </kbd>
</p>

- Todo-List

  - TextField 사이즈 변경

  - 버튼 --> 아이콘 버튼으로 변경

리팩토링 전 vs 리팩토링 후

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213730594-772b6cf4-873e-4672-9a1d-ec80f50bca63.png" width="450" height="260"/>
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213729978-a1351d0c-1243-44b2-9afa-17d4c38ec870.PNG" width="450" height="260"/>
  </kbd>
 </p>

  - 삭제/ 수정 버튼을 누르면 한번 더 확인해 주는 다이어로그 구현 : 사용자가 실수로 클릭했을 경우를 방지

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/215389124-ee8271a7-9516-4051-ac8b-d159c0e941a8.PNG" width="650" height="320"/>
  </kbd>
 </p>

- Todo 상세보기에서 버튼을 아이콘 형식으로 변경 : 사용자가 스마트폰으로 사용할 때 삭제 버튼이 원치않게 터치가 될 수 있을거 같다고 생각하여 다음과 같이 개선

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213736120-c70b1962-743a-45aa-bd50-3a52b2207165.PNG" width="250" height="250"/>
  </kbd>
 </p>

- [ ] 폴더구조 변경

- 기존 폴더구조

  - components : Header,Footer,Modal 등 재사용이 가능하고 분리된 컴포넌트들을 모아둔 폴더

  - interface : Typescript 인터페이스를 모아둔 폴더

  - pages : router로 이동되는 컴포넌트를 모아둔 폴더

  - routes : 컴포넌트들의 router가 선언된 파일을 모아둔 폴더

  - utils : API 함수를 모아둔 폴더

```jsonc
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
```

- 리팩토링 후 폴더구조

  - components,pages,routes : 기존과 동일

  - types : interface 폴더 명칭 변경

  - lib : api 호출 함수와 hook를 관리하는

  - utils : 상수나 공통 함수를 모아둔 폴더

  - test : 테스팅을 위한 폴더

```jsonc
📦src
 ┣ 📂components
 ┃ ┣ 📂Footer
 ┃ ┃ ┗ 📜Footer.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Menu
 ┃ ┃ ┃ ┗ 📜TodoEdit.tsx
 ┃ ┃ ┣ 📜DeleteConfirm.tsx
 ┃ ┃ ┣ 📜UpdateConfirm.tsx
 ┃ ┃ ┗ 📜UpdateTodo.tsx
 ┃ ┣ 📂TextField
 ┃ ┃ ┣ 📜LoginTextField.tsx
 ┃ ┃ ┣ 📜SignUpTextField.tsx
 ┃ ┃ ┗ 📜TodoTextField.tsx
 ┃ ┗ 📂TodoList
 ┃ ┃ ┣ 📜TodoDetailView.tsx
 ┃ ┃ ┗ 📜TodoListView.tsx
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┗ 📜todo.ts
 ┃ ┗ 📂hook
 ┃ ┃ ┣ 📂mutation
 ┃ ┃ ┃ ┣ 📜useCreateTodo.ts
 ┃ ┃ ┃ ┣ 📜useDeleteTodo.ts
 ┃ ┃ ┃ ┣ 📜useLogin.ts
 ┃ ┃ ┃ ┣ 📜useSignUp.ts
 ┃ ┃ ┃ ┗ 📜useUpdateTodo.ts
 ┃ ┃ ┗ 📂queries
 ┃ ┃ ┃ ┣ 📜useGetTodoById.ts
 ┃ ┃ ┃ ┗ 📜useGetTodos.ts
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂routes
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┃ ┣ 📜modal.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂test
 ┃ ┣ 📂__snapshots__
 ┃ ┃ ┗ 📜app.test.tsx.snap
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜Hook.test.tsx
 ┃ ┣ 📜styleMock.ts
 ┃ ┗ 📜utils.tsx
 ┣ 📂types
 ┃ ┣ 📜IProps.ts
 ┃ ┣ 📜PaletteColor.ts
 ┃ ┣ 📜Todo.interface.ts
 ┃ ┗ 📜User.interface.ts
 ┣ 📂utils
 ┃ ┗ 📜regex.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

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
