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
) => {
  axios
    .post(`${PORT}/users/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      const token = res.data.token;
      window.localStorage.setItem("toDos", token);
      window.location.replace("/todo");
    })
    .catch((error) => {
      if (error instanceof AxiosError) return error.response;
      if (error.response.status === 400) {
        return error.response.data.details;
      }
    });
};
