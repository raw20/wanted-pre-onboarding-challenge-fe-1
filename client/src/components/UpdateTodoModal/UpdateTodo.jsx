import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { updateTodoHandler } from "../../utils/todo/api";

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

function UpdateTodo({ editData, token, setOpen, setRefreshKey }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const content = data.get("content");
    updateTodoHandler(editData.id, token, title, content);
    setOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
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
        label={editData.title}
        name="title"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label={editData.content}
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
