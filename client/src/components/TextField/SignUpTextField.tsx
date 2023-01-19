import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { theme } from "../../styles/theme";
import { emailRegex } from "../../utils/regex";
import useSignUp from "../../lib/hook/mutation/useSignUp";

function SignUpTextField() {
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [password, setPassword] = useState<HTMLInputElement>();
  const [passwordValidation, setPasswordValidation] =
    useState<HTMLInputElement>();
  const [errorMessage, setErrorMessage] = useState(" ");
  const { responseMessage, signupMutation } = useSignUp();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email: FormDataEntryValue = data.get("email") ?? "";
    const password: FormDataEntryValue = data.get("password") ?? "";
    signupMutation({ email, password });
    setErrorMessage(responseMessage);
  };

  const emailOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(event.target.value)) {
      setIsEmailConfirm(false);
      setErrorMessage("유효하지 않는 이메일입니다.");
    } else {
      setIsEmailConfirm(true);
      setErrorMessage(" ");
    }
  };
  const passwordOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target);
    if (event.target.value.length < 8) {
      setIsPasswordConfirm(false);
      setErrorMessage("비밀번호는 최소 8자 이상이어야합니다.");
    } else if (event.target.value !== passwordValidation?.value) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setIsPasswordConfirm(true);
      setErrorMessage(" ");
    }
  };
  const passwordConfirmOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValidation(event.target);
    if (event.target.value !== password?.value) {
      setIsPasswordConfirm(false);
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else if (event.target.value.length < 8) {
      setIsPasswordConfirm(false);
    } else {
      setIsPasswordConfirm(true);
      setErrorMessage(" ");
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
              label="이메일"
              name="email"
              autoComplete="email"
              onChange={emailOnChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={passwordOnChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password-confirm"
              label="비밀번호 확인  "
              type="password"
              id="password-confirm"
              autoComplete="password-confirm"
              onChange={passwordConfirmOnChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: theme.palette.warning.main, fontWeight: "bold" }}
            >
              {errorMessage}
            </Typography>
          </Grid>
        </Grid>
        {isEmailConfirm &&
        isPasswordConfirm &&
        password?.value === passwordValidation?.value ? (
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
            <Link to="/login">
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: theme.palette.info.main }}
              >
                이미 회원이신가요?
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignUpTextField;
