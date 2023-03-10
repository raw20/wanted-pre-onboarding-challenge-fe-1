import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import useLogin from "../../lib/hook/mutation/useLogin";

function LoginTextField() {
  const [errorMessage, setErrorMessage] = useState(" ");
  const { responseMessage, LoginMutation } = useLogin();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email: FormDataEntryValue = data.get("email") ?? "";
    const password: FormDataEntryValue = data.get("password") ?? "";
    LoginMutation({ email, password });
    setErrorMessage(responseMessage);
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
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: theme.palette.warning.main, fontWeight: "bold" }}
          >
            {errorMessage}
          </Typography>
        </Grid>
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
