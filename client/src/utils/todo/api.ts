import axios, { AxiosError } from "axios";
import { PORT } from "../auth/api";
import React from "react";

const token = window.localStorage.getItem("toDos");

export async function createTodoHandler(
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
      alert("작성이 완료되었습니다.");
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function getTodoByIdHandler(
  id: string,
  setEditTodoData: React.Dispatch<React.SetStateAction<never[]>>
) {
  await axios
    .get(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      setEditTodoData(res.data.data);
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function deleteTodoHandler(id: string) {
  await axios
    .delete(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      alert("삭제되었습니다.");
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
    });
}

export async function updateTodoHandler(
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
      console.log(res);
      alert("수정되었습니다.");
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) console.log(error.response);
      alert("오류로 인해 실패하였습니다.");
    });
}
