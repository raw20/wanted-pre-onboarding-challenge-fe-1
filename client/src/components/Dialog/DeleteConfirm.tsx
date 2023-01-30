import Button from "@mui/material/Button";
import React, { Dispatch, SetStateAction } from "react";
import useDeleteTodo from "../../lib/hook/mutation/useDeleteTodo";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface IDeleteConfirmProps {
  id: string;
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
}

function DeleteConfirm({ id, setOpenConfirmModal }: IDeleteConfirmProps) {
  const deleteTodoMutation = useDeleteTodo();
  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
  };
  return (
    <>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        정말로 삭제하시겠습니까?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          삭제된 데이터는 복구할 수 없습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={ConfirmModalCloseHandler}>
          취소
        </Button>
        <Button
          onClick={() => {
            deleteTodoMutation.mutate(id);
            setOpenConfirmModal(false);
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteConfirm;
