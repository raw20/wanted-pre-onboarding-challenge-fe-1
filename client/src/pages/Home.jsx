import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("toDos");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/todo");
    }
  }, []);
  return <></>;
}

export default TodoList;
