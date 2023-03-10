import axios, { AxiosError } from "axios";
import { TodoListType } from "../../types/Todo.interface";
import { PORT } from "./auth";

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
      if (error instanceof AxiosError) return error.response?.data.details;
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
      if (error instanceof AxiosError) return error.response?.data.details;
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
      if (error instanceof AxiosError) return error.response?.data.details;
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
      if (error instanceof AxiosError) return error.response?.data.details;
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
      if (error instanceof AxiosError) return error.response?.data.details;
    });
