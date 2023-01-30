import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

function Error() {
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
        <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
          <ErrorIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Error
        </Typography>
        <Typography component="h6" variant="h6">
          유효하지 않은 주소로 입장하였습니다. 아래 버튼을 눌러 다시
          시도하십시오.
        </Typography>
        <Link to="/">
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: theme.palette.info.main }}
          >
            돌아가기
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}

export default Error;
