import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpHandler } from "../../utils/auth/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function SignUpTextField() {
  const [okEmail, setOkEmail] = useState(false);
  const [okPassword, setOkPassword] = useState(false);
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    signUpHandler(email, password);
  };
  const handleChangeEmail = (event) => {
    if (!emailRegex.test(event.target.value)) {
      setOkEmail(false);
    } else {
      setOkEmail(true);
    }
  };
  const handleChangePassword = (event) => {
    if (event.target.value.length < 8) {
      setOkPassword(false);
    } else {
      setOkPassword(true);
    }
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChangePassword}
            />
          </Grid>
        </Grid>
        {okEmail && okPassword ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            완료
          </Button>
        ) : (
          <Button fullWidth disabled variant="contained" sx={{ mt: 3, mb: 2 }}>
            완료
          </Button>
        )}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login">로그인화면으로 이동</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignUpTextField;
