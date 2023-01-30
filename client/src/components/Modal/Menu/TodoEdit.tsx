import React, { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteConfirm from "../../Dialog/DeleteConfirm";
import Dialog from "@mui/material/Dialog";
import PaperComponent from "../../Paper/PaperComponent";

interface ITodoEditProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

function TodoEdit({
  open,
  anchorEl,
  setAnchorEl,
  setOpenUpdateModal,
  setId,
  id,
}: ITodoEditProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(null);
    setOpenConfirm(true);
  };

  const updateHandler = (id: string) => {
    setOpenUpdateModal(true);
    setAnchorEl(null);
    setId(id);
  };

  const ConfirmModalCloseHandler = () => {
    setOpenConfirm(false);
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
        <IconButton onClick={deleteHandler}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Menu>
      <Dialog
        open={openConfirm}
        onClose={ConfirmModalCloseHandler}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DeleteConfirm id={id} setOpenConfirm={setOpenConfirm} />
      </Dialog>
    </>
  );
}

export default TodoEdit;
