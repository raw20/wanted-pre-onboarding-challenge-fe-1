import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Header from "../components/Header/Header";
import TodoTextField from "../components/TextField/TodoTextField";
import { Link, Navigate, Outlet } from "react-router-dom";
import { getTodosController } from "../utils/todo/api";
import { useQuery } from "@tanstack/react-query";

function TodoList() {
  const token = window.localStorage.getItem("toDos");
  if (!token) {
    alert("토큰이 없거나 만료되어 로그인 페이지로 이동합니다.");
    return <Navigate to="/" />;
  }
  const { data, isLoading, error } = useQuery("allTodos", getTodosController);
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
      </Container>
      <TodoTextField />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          mb: 10,
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Link to="/todo/list" style={{ color: "#42a5f5" }}>
            <Button>목록 보기</Button>
          </Link>
          <Link to="/todo/detail" style={{ color: "#42a5f5" }}>
            <Button>상세 보기</Button>
          </Link>
        </ButtonGroup>
      </Box>
      <Outlet context={{ token }} />
    </React.Fragment>
  );
}

export default TodoList;
