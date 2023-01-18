import axios, { AxiosError } from "axios";

export const PORT = "http://localhost:8080";

export function signUpController(
  email: FormDataEntryValue,
  password: FormDataEntryValue
) {
  axios
    .post(`${PORT}/users/create`, {
      email: email,
      password: password,
    })
    .then((res) => {
      window.location.replace("/login");
    })
    .catch((error) => {
      if (error instanceof AxiosError) return error.response;
      if (error.response.status === 409) {
        return error.response.data.details;
      }
    });
}

export function LoginController(
  email: FormDataEntryValue,
  password: FormDataEntryValue
) {
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
}
