import React, { useState, MouseEvent, forwardRef, ReactNode } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { PORT } from "../../utils/auth/api";
import {
  deleteTodoController,
  getTodoByIdController,
} from "../../utils/todo/api";
import UpdateTodo from "../Modal/UpdateTodo";
import { TodoList } from "../../interface/Todo.interface";
import { useOutletContext } from "react-router-dom";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

function TodoListView() {
  const [toDoData, setTodoData] = useState<TodoList[]>([]);
  const [editTodoData, setEditTodoData] = useState([]);
  const [open, setOpen] = useState(false);

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    deleteTodoController(id);
  };
  const updateHandler = (id: string) => {
    setOpen(true);
    getTodoByIdController(id, setEditTodoData);
  };
  const ModalCloseHandler = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Box
        sx={{
          alignItems: "baseline",
          mb: 2,
        }}
      >
        {toDoData?.map((todo) => (
          <ListItemButton component="a" href="#simple-list" key={todo.id}>
            <ListItemText primary={todo?.title} />
            <CardActions>
              <Modal
                open={open}
                onClose={ModalCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Bar type={"span"}>
                  <UpdateTodo editTodoData={editTodoData} setOpen={setOpen} />
                </Bar>
              </Modal>
              <Button
                fullWidth
                variant="contained"
                onClick={() => updateHandler(todo.id)}
              >
                수정
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={(event) => deleteHandler(event, todo.id)}
              >
                삭제
              </Button>
            </CardActions>
          </ListItemButton>
        ))}
      </Box>
    </Container>
  );
}

const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default TodoListView;
