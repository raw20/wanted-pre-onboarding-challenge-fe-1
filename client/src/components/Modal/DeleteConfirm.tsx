import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { Dispatch, SetStateAction } from "react";
import useDeleteTodo from "../../lib/hook/mutation/useDeleteTodo";
import { style } from "../../styles/modal";

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
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        정말로 지우시겠습니까??
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        삭제된 Todo 는 복구할 수 없습니다.
      </Typography>
      <Grid container justifyContent="space-evenly">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            deleteTodoMutation.mutate(id);
            setOpenConfirmModal(false);
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

export default DeleteConfirm;
