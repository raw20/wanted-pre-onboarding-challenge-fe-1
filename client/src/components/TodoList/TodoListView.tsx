import React, { useState, MouseEvent, forwardRef, ReactNode } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import UpdateTodo from "../Modal/UpdateTodo";
import useDeleteTodo from "../../lib/hook/mutation/useDeleteTodo";
import useGetTodos from "../../lib/hook/queries/useGetTodos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

function TodoListView() {
  const [id, setId] = useState("");
  const todos = useGetTodos();
  const deleteTodoMutation = useDeleteTodo();
  const [openModal, setOpenModal] = useState(false);

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    deleteTodoMutation.mutate(id);
  };
  const updateHandler = (id: string) => {
    setOpenModal(true);
    setId(id);
  };
  const ModalCloseHandler = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Box
        sx={{
          alignItems: "baseline",
          mb: 2,
        }}
      >
        {todos?.map((todo) => (
          <ListItemButton component="a" href="#simple-list" key={todo?.id}>
            <ListItemText primary={todo?.title} />
            <CardActions>
              <IconButton onClick={() => updateHandler(todo?.id)}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton onClick={(event) => deleteHandler(event, todo.id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </CardActions>
          </ListItemButton>
        ))}
      </Box>
      <Modal
        open={openModal}
        onClose={ModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <UpdateTodo id={id} setOpenModal={setOpenModal} />
        </Bar>
      </Modal>
    </Container>
  );
}

const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default TodoListView;
