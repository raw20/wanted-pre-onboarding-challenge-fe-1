import axios, { AxiosError } from "axios";
import { PORT } from "../auth/api";

const token = window.localStorage.getItem("toDos");

export async function createTodoController(
  title: FormDataEntryValue,
  content: FormDataEntryValue
) {
  await axios
    .post(
      `${PORT}/todos`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function getTodosController() {
  await axios
    .get(`${PORT}/todos`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function getTodoByIdController(id: string) {
  await axios
    .get(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function deleteTodoController(id: string) {
  await axios
    .delete(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function updateTodoController(
  id: string,
  title: FormDataEntryValue,
  content: FormDataEntryValue
) {
  await axios
    .put(
      `${PORT}/todos/${id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
      alert("오류로 인해 실패하였습니다.");
    });
}
