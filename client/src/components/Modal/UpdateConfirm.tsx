import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { Dispatch, SetStateAction } from "react";
import useUpdateTodo from "../../lib/hook/mutation/useUpdateTodo";
import { style } from "../../styles/modal";

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
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        정말로 수정하시겠습니까??
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        수정이 완료되면 수정 전 Todo 는 복구할 수 없습니다.
      </Typography>
      <Grid container justifyContent="space-evenly">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            updateTodoMutation.mutate({ title, content, id: id });
            setOpenConfirmModal(false);
            setOpenUpdateModal(false);
          }}
        >
          네
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={ConfirmModalCloseHandler}
        >
          아니오
        </Button>
      </Grid>
    </Box>
  );
}

export default UpdateConfirm;
