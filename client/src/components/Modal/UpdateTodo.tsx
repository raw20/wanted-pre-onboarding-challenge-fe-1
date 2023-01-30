import React, { FormEvent, SetStateAction, Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useGetTodoById from "../../lib/hook/queries/useGetTodoById";
import { style } from "../../styles/modal";
import Dialog from "@mui/material/Dialog";
import UpdateConfirm from "../Dialog/UpdateConfirm";
import PaperComponent from "../Paper/PaperComponent";

interface UpdateTodoProps {
  id: string;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

function UpdateTodo({ id, setOpenUpdateModal }: UpdateTodoProps) {
  const { todo } = useGetTodoById(id);
  const [title, setTitle] = useState<FormDataEntryValue>("");
  const [content, setContent] = useState<FormDataEntryValue>("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    setTitle(title);
    setContent(content);
    setOpenConfirmModal(true);
  };
  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
  };
  return (
    <Box component="form" sx={style} onSubmit={handleSubmit}>
      <Typography
        component="h3"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Todo-List Update
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label={todo?.title}
        name="title"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label={todo?.content}
        name="content"
        autoFocus
      />

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        수정하기
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, ml: 1 }}
        onClick={() => setOpenUpdateModal(false)}
      >
        취소하기
      </Button>
      <Dialog
        open={openConfirmModal}
        onClose={ConfirmModalCloseHandler}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <UpdateConfirm
          id={id}
          title={title}
          content={content}
          setOpenConfirmModal={setOpenConfirmModal}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      </Dialog>
    </Box>
  );
}

export default UpdateTodo;
