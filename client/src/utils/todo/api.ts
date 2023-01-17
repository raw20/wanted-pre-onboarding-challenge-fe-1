import axios, { AxiosError } from "axios";
import { TodoListType } from "../../interface/Todo.interface";
import { PORT } from "../auth/api";

const token = window.localStorage.getItem("toDos");

export const createTodoController = (
  title: FormDataEntryValue,
  content: FormDataEntryValue
): Promise<TodoListType> =>
  axios
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
    .then((response) => response.data)
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });

export const getTodosController = (): Promise<TodoListType[]> =>
  axios
    .get(`${PORT}/todos`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });

export const getTodoByIdController = (id: string): Promise<TodoListType> =>
  axios
    .get(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });

export const deleteTodoController = (id: string) =>
  axios
    .delete(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
export const updateTodoController = (
  title: FormDataEntryValue,
  content: FormDataEntryValue,
  id: string
): Promise<TodoListType> =>
  axios
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
    .then((response) => response.data)
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
