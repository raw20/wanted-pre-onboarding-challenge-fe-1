import React, { FormEvent } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTodoHandler } from "../../utils/todo/api";
import { useRecoilState } from "recoil";
import { refreshState } from "../../store/atom";

function TodoTextField() {
  const [refreshKey, setRefreshKey] = useRecoilState(refreshState);
  console.log(refreshKey);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    createTodoHandler(title, content);
    setRefreshKey((oldKey) => oldKey + 1);
  };
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Write down your to-dos title"
          name="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="content"
          label="Write down your to-dos content"
          name="content"
          autoFocus
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          작성하기
        </Button>
      </Box>
    </Container>
  );
}

export default TodoTextField;
