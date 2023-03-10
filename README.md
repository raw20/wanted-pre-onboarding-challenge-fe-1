# React-Query๋ฅผ ์ด์ฉํ Todo-List ๐งพ

## ํ๋ก์ ํธ ์๊ฐ ๐

### ๊ฐ์

API๋ฅผ ํธ์ถํ์ฌ ํ์๊ฐ์/๋ก๊ทธ์ธ , ToDo ๋ฆฌ์คํธ๋ฅผ ๊ตฌํํ์์ต๋๋ค.

### ๊ธฐ์ 

- ์ธ์ด

  - TypeScript : ํ์ ์ถ๋ก ์ ํตํด ์์ ํ๊ณ  ํธ๋ฆฌํ ์ฝ๋ ์์ฑ์ ํ ์ ์๋ ์ ์ ํ์์ธ์ด.

- ๋ผ์ด๋ธ๋ฌ๋ฆฌ

  - React : SPA ๊ตฌํ๊ณผ ์ปดํฌ๋ํธ ๋จ์ ๊ฐ๋ฐ๋ก ์ฌ์ฌ์ฉ์ฑ์ ๋์ด๊ณ  ์ฝ๋์ ๊ฐ๋์ฑ์ ๋์ผ์ ์๋ ์ฅ์ ์ด ๊ฐ์ง ๋ผ์ด๋ธ๋ฌ๋ฆฌ.

  - React-Query : API๋ก ํธ์ถ ๋ฐ์ ๋ฐ์ดํฐ๋ฅผ ์ฝ๊ฒ ๊ฐ์ ธ์ค๊ณ  stale-while-revalidate๋ฅผ ์ด์ฉํด ๋ฐ์ดํฐ๋ฅผ ์ต์ ํ ์ํฌ์ ์๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ.

  - Axios : fetch์ ๋ฌ๋ฆฌ ์๋ต๋ฐ์ ๋ฐ์ดํฐ๋ฅผ JSONํ์์ผ๋ก ์๋์ผ๋ก ๋ณํํด์ฃผ๋ ํธ๋ฆฌ์ฑ์ด ์์ด ์ฝ๊ฒ API๋ฅผ ํธ์ถํ  ์๋ HTTP ๋น๋๊ธฐ ํต์  ๋ผ์ด๋ธ๋ฌ๋ฆฌ.

  - mui/material : ์ฝ๊ณ  ๋น ๋ฅด๊ฒ ์คํ์ผ๋ง์ ๊ตฌํํ  ์์๋ React UI ์ปดํฌ๋ํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ.

## ํ๋ก์ ํธ ์ผ์  ๐

### ์ฌ์  ๊ณผ์  ๊ธฐ๊ฐ (23.01.04 ~ 23.01.06)

#### ๊ตฌํ๋ด์ฉ

- [ ] ํ์๊ฐ์ / ๋ก๊ทธ์ธ

- [ ] Todo-List ๊ตฌํ

### 1์ฐจ ๋ฆฌํฉํ ๋ง (23.01.12 ~ 23.01.13)

#### ๊ตฌํ๋ด์ฉ

- [ ] Javascript -> Typescript ๋ณํ

- [ ] any๋ ํ์๋จ์ธ์ ์ต์ํ ํ์ฌ ์ธํฐํ์ด์ค/ ์ ๋์จ ๋ฑ์ ์ฌ์ฉํ์ฌ ํ์ ์ ์

- [ ] ์ด๋ฆ์ด ๋ถ๋ชํํ ๋ณ์ & ํจ์๋ช , ํด๋ & ์ปดํฌ๋ํธ๋ช ๋ณ๊ฒฝ

- ์์  ์ 

```jsonc
const [data,setData] = useState([])
```

- ์์  ํ

```jsonc
const [toDoData, setTodoData] = useState([])
```

### 2์ฐจ ๋ฆฌํฉํ ๋ง (23.01.14 ~ 23.01.16)

#### ๊ตฌํ๋ด์ฉ

- [ ] Recoil ์ญ์ 

๊ธฐ์กด์ ์ ์ฉ์ํจ Recoil์ ๊ธฐ๋ฅ์ ๋ฆฌ๋๋๋ง ์ axios ๋ฌดํ ํธ์ถ์ ๋ง๊ณ ์ refreshKey๋ผ๋ state๊ฐ์ ๋ง๋ค์์ต๋๋ค.

์ถ๊ฐ/์์ /์ญ์  ๋ฒํผ์ ๋๋ฅด๋ฉด refreshKey๊ฐ +1์ด ๋ฐ์ํ์ฌ refreshKey์ ๊ฐ์ด ๋ณํ๋ ๋๋ง๋ค ๋ฐ์ดํฐ๋ฅผ ํธ์ถํ  ์ ์๋๋ก ํ์์ต๋๋ค.

```jsonc
const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
      useEffect(() => {
      getTodosHandler();
}, [refreshKey]);
```

ํ์ง๋ง ์๋ฌด๋ฐ ๋์์์ด ์ค์๊ฐ์ผ๋ก ์ต์ ํ ๋ ๋ฐ์ดํฐ๊ฐ ํ์ํ๋ค๊ณ  ๊ฐ์ ํ๋ฉด ์ด๋ฌํ ๋ฐฉ์์ refreshKey๊ฐ ๋ณํ  ๋๋ง ์๋๋์ด์ ์ ํฉํ์ง ์๋ ๋ฐฉ๋ฒ์ด๋ผ ์๊ฐํ์ต๋๋ค.

์ด๋ฌํ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด ReactQuery๋ฅผ ๋์ํ์ฌ ํด๊ฒฐํ์์ต๋๋ค.

- [ ] React-Query ๋ก ๊ต์ฒด

- UseQuery ์ฌ์ฉ

```jsonc
//TodoList.tsx

const { data: todos, isLoading } = useQuery<TodoListType[]>({
    queryKey: ["todos"],
    queryFn: getTodosController,
});
```

- UseMutation ์ฌ์ฉ

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

invalidateQueries๋ก ์ธํด ์ฟผ๋ฆฌ๊ฐ stale๋๊ณ  refetch๊ฐ ์งํ๋์ด ํฌ๋ ๋ฐ์ดํฐ์ ์ถ๊ฐ/์์ /์ญ์  mutation์ด ์ฑ๊ณต์ ์ผ๋ก ๋ฐ์๋๋ฉด ์ค์๊ฐ์ผ๋ก ์๋ก์ด ๋ฐ์ดํฐ๊ฐ ๋ฐ์๋ฉ๋๋ค.

์ฐธ๊ณ  ๋ ํผ๋ฐ์ค (1) : https://tkdodo.eu/blog/mastering-mutations-in-react-query

์ฐธ๊ณ  ๋ ํผ๋ฐ์ค (2) : https://maxkim-j.github.io/posts/react-query-preview/

### 3์ฐจ ๋ฆฌํฉํ ๋ง (23.01.17 ~ 23.01.21)

#### ๊ตฌํ๋ด์ฉ

- [ ] ์ฌ์ฉ์ ํธ์์ฑ์ ์ํด UI ์์ 

- ํ์๊ฐ์ / ๋ก๊ทธ์ธ

  - ํ์๊ฐ์ ์ ๋น๋ฐ๋ฒํธ ํ์ธ ์ถ๊ฐ

  - ํ์๊ฐ์ / ๋ก๊ทธ์ธ ์คํจ ์ ์ฌ์ฉ์์๊ฒ ํผ๋๋ฐฑ ์ ๊ณต : ๋ ๋น ๋ฅด๊ฒ ํ์๊ฐ์ ์ ๊ณต

๋ฆฌํฉํ ๋ง ์  vs ๋ฆฌํฉํ ๋ง ํ

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213727283-a478c605-092f-4afb-b019-6071bbf06dbf.PNG" width="450" height="460"/>
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213727388-1f60ed14-e2ec-47c9-bd28-f2ee68d924f3.PNG" width="450" height="460"/>
  </kbd>
</p>

- Todo-List

  - TextField ์ฌ์ด์ฆ ๋ณ๊ฒฝ

  - ๋ฒํผ --> ์์ด์ฝ ๋ฒํผ์ผ๋ก ๋ณ๊ฒฝ

๋ฆฌํฉํ ๋ง ์  vs ๋ฆฌํฉํ ๋ง ํ

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213730594-772b6cf4-873e-4672-9a1d-ec80f50bca63.png" width="450" height="260"/>
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213729978-a1351d0c-1243-44b2-9afa-17d4c38ec870.PNG" width="450" height="260"/>
  </kbd>
 </p>

  - ์ญ์ / ์์  ๋ฒํผ์ ๋๋ฅด๋ฉด ํ๋ฒ ๋ ํ์ธํด ์ฃผ๋ ๋ค์ด์ด๋ก๊ทธ ๊ตฌํ : ์ฌ์ฉ์๊ฐ ์ค์๋ก ํด๋ฆญํ์ ๊ฒฝ์ฐ๋ฅผ ๋ฐฉ์ง

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/215389124-ee8271a7-9516-4051-ac8b-d159c0e941a8.PNG" width="650" height="320"/>
  </kbd>
 </p>

- Todo ์์ธ๋ณด๊ธฐ์์ ๋ฒํผ์ ์์ด์ฝ ํ์์ผ๋ก ๋ณ๊ฒฝ : ์ฌ์ฉ์๊ฐ ์ค๋งํธํฐ์ผ๋ก ์ฌ์ฉํ  ๋ ์ญ์  ๋ฒํผ์ด ์์น์๊ฒ ํฐ์น๊ฐ ๋  ์ ์์๊ฑฐ ๊ฐ๋ค๊ณ  ์๊ฐํ์ฌ ๋ค์๊ณผ ๊ฐ์ด ๊ฐ์ 

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/62588402/213736120-c70b1962-743a-45aa-bd50-3a52b2207165.PNG" width="250" height="250"/>
  </kbd>
 </p>

- [ ] ํด๋๊ตฌ์กฐ ๋ณ๊ฒฝ

- ๊ธฐ์กด ํด๋๊ตฌ์กฐ

  - components : Header,Footer,Modal ๋ฑ ์ฌ์ฌ์ฉ์ด ๊ฐ๋ฅํ๊ณ  ๋ถ๋ฆฌ๋ ์ปดํฌ๋ํธ๋ค์ ๋ชจ์๋ ํด๋

  - interface : Typescript ์ธํฐํ์ด์ค๋ฅผ ๋ชจ์๋ ํด๋

  - pages : router๋ก ์ด๋๋๋ ์ปดํฌ๋ํธ๋ฅผ ๋ชจ์๋ ํด๋

  - routes : ์ปดํฌ๋ํธ๋ค์ router๊ฐ ์ ์ธ๋ ํ์ผ์ ๋ชจ์๋ ํด๋

  - utils : API ํจ์๋ฅผ ๋ชจ์๋ ํด๋

```jsonc
๐ฆsrc
โฃ ๐components
โ โฃ ๐Footer
โ โ โ ๐Footer.tsx
โ โฃ ๐Header
โ โ โ ๐Header.tsx
โ โฃ ๐Modal
โ โ โ ๐UpdateTodo.tsx
โ โฃ ๐TextField
โ โ โฃ ๐LoginTextField.tsx
โ โ โฃ ๐SignUpTextField.tsx
โ โ โ ๐TodoTextField.tsx
โ โ ๐TodoList
โ โ โฃ ๐TodoDetailView.tsx
โ โ โ ๐TodoListView.tsx
โฃ ๐interface
โ โ ๐Todo.interface.ts
โฃ ๐pages
โ โฃ ๐Home.tsx
โ โฃ ๐Login.tsx
โ โฃ ๐SignUp.tsx
โ โ ๐TodoList.tsx
โฃ ๐routes
โ โ ๐Router.tsx
โฃ ๐utils
โ โฃ ๐auth
โ โ โ ๐api.ts
โ โ ๐todo
โ โ โ ๐api.ts
โฃ ๐App.css
โฃ ๐App.test.tsx
โฃ ๐App.tsx
โฃ ๐index.css
โฃ ๐index.tsx
โฃ ๐logo.svg
โฃ ๐reportWebVitals.ts
โ ๐setupTests.ts
```

- ๋ฆฌํฉํ ๋ง ํ ํด๋๊ตฌ์กฐ

  - components,pages,routes : ๊ธฐ์กด๊ณผ ๋์ผ

  - types : interface ํด๋ ๋ช์นญ ๋ณ๊ฒฝ

  - lib : api ํธ์ถ ํจ์์ hook๋ฅผ ๊ด๋ฆฌํ๋

  - utils : ์์๋ ๊ณตํต ํจ์๋ฅผ ๋ชจ์๋ ํด๋

  - test : ํ์คํ์ ์ํ ํด๋

```jsonc
๐ฆsrc
 โฃ ๐components
 โ โฃ ๐Footer
 โ โ โ ๐Footer.tsx
 โ โฃ ๐Header
 โ โ โ ๐Header.tsx
 โ โฃ ๐Modal
 โ โ โฃ ๐Menu
 โ โ โ โ ๐TodoEdit.tsx
 โ โ โฃ ๐DeleteConfirm.tsx
 โ โ โฃ ๐UpdateConfirm.tsx
 โ โ โ ๐UpdateTodo.tsx
 โ โฃ ๐TextField
 โ โ โฃ ๐LoginTextField.tsx
 โ โ โฃ ๐SignUpTextField.tsx
 โ โ โ ๐TodoTextField.tsx
 โ โ ๐TodoList
 โ โ โฃ ๐TodoDetailView.tsx
 โ โ โ ๐TodoListView.tsx
 โฃ ๐lib
 โ โฃ ๐api
 โ โ โฃ ๐auth.ts
 โ โ โ ๐todo.ts
 โ โ ๐hook
 โ โ โฃ ๐mutation
 โ โ โ โฃ ๐useCreateTodo.ts
 โ โ โ โฃ ๐useDeleteTodo.ts
 โ โ โ โฃ ๐useLogin.ts
 โ โ โ โฃ ๐useSignUp.ts
 โ โ โ โ ๐useUpdateTodo.ts
 โ โ โ ๐queries
 โ โ โ โฃ ๐useGetTodoById.ts
 โ โ โ โ ๐useGetTodos.ts
 โฃ ๐pages
 โ โฃ ๐Home.tsx
 โ โฃ ๐Login.tsx
 โ โฃ ๐SignUp.tsx
 โ โ ๐TodoList.tsx
 โฃ ๐routes
 โ โ ๐Router.tsx
 โฃ ๐styles
 โ โฃ ๐modal.ts
 โ โ ๐theme.ts
 โฃ ๐test
 โ โฃ ๐__snapshots__
 โ โ โ ๐app.test.tsx.snap
 โ โฃ ๐App.test.tsx
 โ โฃ ๐Hook.test.tsx
 โ โฃ ๐styleMock.ts
 โ โ ๐utils.tsx
 โฃ ๐types
 โ โฃ ๐IProps.ts
 โ โฃ ๐PaletteColor.ts
 โ โฃ ๐Todo.interface.ts
 โ โ ๐User.interface.ts
 โฃ ๐utils
 โ โ ๐regex.ts
 โฃ ๐App.css
 โฃ ๐App.tsx
 โฃ ๐index.css
 โฃ ๐index.tsx
 โฃ ๐logo.svg
 โฃ ๐reportWebVitals.ts
 โ ๐setupTests.ts
```

## ํ๋ก์ ํธ ์คํ ํ๋ฉด ๐ป

    ์ค๋น์ค..

## ํ๋ก์ ํธ ์คํ ๋ฐฉ๋ฒ ๐

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
