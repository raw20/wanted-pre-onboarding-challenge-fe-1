import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpTextField from "../components/TextField/SignUpTextField";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const token = window.localStorage.getItem("toDos");

  if (token) {
    alert("로그인중에는 접근할 수 없는 페이지입니다.");
    return <Navigate to="/todo" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <SignUpTextField />
      </Box>
    </Container>
  );
}
