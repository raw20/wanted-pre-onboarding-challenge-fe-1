import React, { useState, MouseEvent, forwardRef } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import UpdateTodo from "../Modal/UpdateTodo";
import useGetTodos from "../../lib/hook/queries/useGetTodos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteConfirm from "../Modal/DeleteConfirm";
import { BarProps, Ref } from "../../types/IProps";

function TodoListView() {
  const [id, setId] = useState("");
  const { todos } = useGetTodos();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    setOpenConfirmModal(true);
    setId(id);
  };
  const updateHandler = (id: string) => {
    setOpenUpdateModal(true);
    setId(id);
  };
  const UpdateModalCloseHandler = () => {
    setOpenUpdateModal(false);
  };
  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
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
        open={openUpdateModal}
        onClose={UpdateModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <UpdateTodo id={id} setOpenUpdateModal={setOpenUpdateModal} />
        </Bar>
      </Modal>
      <Modal
        open={openConfirmModal}
        onClose={ConfirmModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <DeleteConfirm id={id} setOpenConfirmModal={setOpenConfirmModal} />
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
