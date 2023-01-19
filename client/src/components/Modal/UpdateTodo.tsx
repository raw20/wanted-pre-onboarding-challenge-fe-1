import React, { FormEvent, SetStateAction, Dispatch } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useUpdateTodo from "../../lib/hook/mutation/useUpdateTodo";
import useGetTodoById from "../../lib/hook/queries/useGetTodoById";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UpdateTodoProps {
  id: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

function UpdateTodo({ id, setOpenModal }: UpdateTodoProps) {
  const todo = useGetTodoById(id);
  const updateTodoMutation = useUpdateTodo();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    updateTodoMutation.mutate({ title, content, id: id });
    setOpenModal(false);
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
        onClick={() => setOpenModal(false)}
      >
        취소하기
      </Button>
    </Box>
  );
}

export default UpdateTodo;
