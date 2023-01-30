import Button from "@mui/material/Button";
import React, { Dispatch, SetStateAction } from "react";
import useUpdateTodo from "../../lib/hook/mutation/useUpdateTodo";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IUpdateConfirmProps {
  id: string;
  title: FormDataEntryValue;
  content: FormDataEntryValue;
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

function UpdateConfirm({
  id,
  title,
  content,
  setOpenConfirmModal,
  setOpenUpdateModal,
}: IUpdateConfirmProps) {
  const updateTodoMutation = useUpdateTodo();
  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
  };
  return (
    <>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        정말로 수정하시겠습니까?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          수정하기 전 데이터는 복구할 수 없습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={ConfirmModalCloseHandler}>
          취소
        </Button>
        <Button
          onClick={() => {
            updateTodoMutation.mutate({ title, content, id: id });
            setOpenConfirmModal(false);
            setOpenUpdateModal(false);
          }}
        >
          수정
        </Button>
      </DialogActions>
    </>
  );
}

export default UpdateConfirm;
