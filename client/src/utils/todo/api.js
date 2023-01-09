import axios from "axios";
import { PORT } from "../auth/api";

export async function createTodoHandler(title, content, token) {
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
    .catch((error) => {
      console.log(error.response);
    });
}

export async function getTodoByIdHandler(id, token, setEditData) {
  await axios
    .get(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      setEditData(res.data.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export async function deleteTodoHandler(id, token) {
  await axios
    .delete(`${PORT}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      alert("삭제되었습니다.");
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export async function updateTodoHandler(id, token, title, content) {
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
    .catch((error) => {
      console.log(error.response);
      alert("오류로 인해 실패하였습니다.");
    });
}
