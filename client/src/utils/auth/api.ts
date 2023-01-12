import axios from "axios";

export const PORT = "http://localhost:8080";

export function signUpHandler(email, password) {
  axios
    .post(`${PORT}/users/create`, {
      email: email,
      password: password,
    })
    .then((res) => {
      alert("계정이 성공적으로 생성되었습니다.");
      window.location.replace("/login");
      console.log(res);
    })
    .catch((error) => {
      if (error.response.status === 409) {
        alert(error.response.data.details);
      }
      console.log(error.response);
    });
}

export function LoginHandler(email, password) {
  axios
    .post(`${PORT}/users/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      const token = res.data.token;
      window.localStorage.setItem("toDos", token);
      window.location.replace("/todo");

      console.log(res);
    })
    .catch((error) => {
      if (error.response.status === 400) {
        alert(error.response.data.details);
      }
      console.log(error.response);
    });
}