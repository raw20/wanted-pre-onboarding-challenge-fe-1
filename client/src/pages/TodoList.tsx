import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import TodoTextField from "../components/TextField/TodoTextField";
import { Navigate } from "react-router-dom";
import TodoListView from "../components/TodoList/Todo";

function TodoList() {
  const token = window.localStorage.getItem("toDos");
  if (!token) {
    alert("토큰이 없거나 만료되어 로그인 페이지로 이동합니다.");
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Todo-List
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          할일을 추가하고 삭제하고 수정할 수 있습니다.
        </Typography>
        <TodoTextField />

        <TodoListView />
      </Container>
    </React.Fragment>
  );
}

export default TodoList;
