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
  id: string;
}

function TodoEdit({
  open,
  anchorEl,
  setAnchorEl,
  setOpenModal,
  setId,
  id,
}: ITodoEditProps) {
  const deleteTodoMutation = useDeleteTodo();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    setAnchorEl(null);
    deleteTodoMutation.mutate(id);
  };
  const updateHandler = (id: string) => {
    setOpenModal(true);
    setAnchorEl(null);
    setId(id);
  };
  return (
    <>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <IconButton onClick={() => updateHandler(id)}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={(event) => deleteHandler(event, id)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Menu>
    </>
  );
}

export default TodoEdit;
