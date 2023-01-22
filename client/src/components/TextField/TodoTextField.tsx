import React, { FormEvent, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useCreateTodo from "../../lib/hook/mutation/useCreateTodo";
import Grid from "@mui/material/Grid";

function TodoTextField() {
  const createTodoMutation = useCreateTodo();
  const [titleDefault, setTitleDefault] = useState(" ");
  const [contentDefault, setContentDefault] = useState(" ");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    createTodoMutation.mutate({ title, content });
    setTitleDefault("");
    setContentDefault("");
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, mb: 8 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Write down your to-dos title"
          name="title"
          value={titleDefault}
          onChange={(newValue) => {
            setTitleDefault(newValue.target.value);
          }}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="content"
          label="Write down your to-dos content"
          name="content"
          value={contentDefault}
          onChange={(newValue) => {
            setContentDefault(newValue.target.value);
          }}
          autoFocus
        />
        <Grid container justifyContent="center">
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            작성하기
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default TodoTextField;
