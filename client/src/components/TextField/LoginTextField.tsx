import React, { FormEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { LoginController } from "../../lib/api/auth";
import { theme } from "../../styles/theme";

function LoginTextField() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email: FormDataEntryValue = data.get("email") ?? "";
    const password: FormDataEntryValue = data.get("password") ?? "";

    LoginController(email, password);
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          로그인
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/signup">
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: theme.palette.info.main }}
              >
                회원가입 하기
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LoginTextField;
