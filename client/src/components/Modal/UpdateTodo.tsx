import React, { FormEvent, SetStateAction, Dispatch } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  getTodoByIdController,
  updateTodoController,
} from "../../lib/api/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoDataByIdType } from "../../interface/Todo.interface";

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
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateTodo({ id, setOpen }: UpdateTodoProps) {
  const queryClient = useQueryClient();
  const { data: todo, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoByIdController(id),
  });
  const updateTodoMutation = useMutation({
    mutationFn: ({ title, content, id }: TodoDataByIdType) =>
      updateTodoController(title, content, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    updateTodoMutation.mutate({ title, content, id: id });
    //updateTodoController(editTodoData.id, title, content);
    setOpen(false);
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
        onClick={() => setOpen(false)}
      >
        취소하기
      </Button>
    </Box>
  );
}

export default UpdateTodo;
