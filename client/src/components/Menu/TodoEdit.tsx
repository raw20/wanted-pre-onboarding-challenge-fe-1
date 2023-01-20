import React, { forwardRef, MouseEvent, ReactNode, useState } from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "@mui/material/Modal";
import DeleteConfirm from "../Modal/DeleteConfirm";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

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
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(null);
    setOpenConfirmModal(true);
  };

  const updateHandler = (id: string) => {
    setOpenUpdateModal(true);
    setAnchorEl(null);
    setId(id);
  };

  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
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
    </>
  );
}
const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default TodoEdit;
