import axios, { AxiosError } from "axios";

export const PORT = "http://localhost:8080";

export const signUpController = (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  axios
    .post(`${PORT}/users/create`, {
      email: email,
      password: password,
    })
    .then((response) => {
      alert("회원가입이 완료되었습니다.");
      window.location.replace("/login");
      return response.data.message;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) return error.response?.data.details;
    });

export const LoginController = (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  axios
    .post(`${PORT}/users/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      const token = response.data.token;
      window.localStorage.setItem("toDos", token);
      window.location.replace("/todo");
      return response.data.message;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) return error.response?.data.details;
    });
