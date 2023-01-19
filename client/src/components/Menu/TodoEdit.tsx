import React, { MouseEvent } from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useDeleteTodo from "../../lib/hook/mutation/useDeleteTodo";

interface ITodoEditProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  todoId: string;
}

function TodoEdit({
  open,
  anchorEl,
  setAnchorEl,
  setOpenModal,
  setId,
  todoId,
}: ITodoEditProps) {
  const deleteTodoMutation = useDeleteTodo();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteHandler = (
    event: MouseEvent<HTMLButtonElement>,
    todoId: string
  ) => {
    event.preventDefault();
    deleteTodoMutation.mutate(todoId);
  };
  const updateHandler = (todoId: string) => {
    setOpenModal(true);
    setId(todoId);
  };
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <IconButton onClick={() => updateHandler(todoId)}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={(event) => deleteHandler(event, todoId)}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Menu>
  );
}

export default TodoEdit;
