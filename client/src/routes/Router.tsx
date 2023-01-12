import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import TodoList from "../pages/TodoList";
import TodoListView from "../components/TodoList/TodoListView";
import TodoDetailView from "../components/TodoList/TodoDetailView";
import Home from "../pages/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<TodoList />}>
          <Route path="list" element={<TodoListView />} />
          <Route path="detail" element={<TodoDetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
