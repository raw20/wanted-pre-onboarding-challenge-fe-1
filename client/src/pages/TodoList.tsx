import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import TodoTextField from "../components/TextField/TodoTextField";
import Todo from "../components/TodoList/Todo";
import { Navigate } from "react-router-dom";

function TodoList() {
  const token = window.localStorage.getItem("toDos");
  if (!token) {
    return <Navigate replace to="/error" />;
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

        <Todo />
      </Container>
    </React.Fragment>
  );
}

export default TodoList;
