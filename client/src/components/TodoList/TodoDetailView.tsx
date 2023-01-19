import React, { useState, MouseEvent, forwardRef, ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UpdateTodo from "../Modal/UpdateTodo";
import useGetTodos from "../../lib/hook/queries/useGetTodos";
import useDeleteTodo from "../../lib/hook/mutation/useDeleteTodo";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

function TodoDetailView() {
  const [id, setId] = useState("");
  const todos = useGetTodos();
  const deleteTodoMutation = useDeleteTodo();
  const [open, setOpen] = useState(false);

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    deleteTodoMutation.mutate(id);
  };
  const updateHandler = (id: string) => {
    setOpen(true);
    setId(id);
  };
  const ModalCloseHandler = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      {todos?.map((todo) => (
        <Grid item key={todo.title} xs={12} md={4}>
          <Card>
            <CardHeader
              title={todo.title}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  height: 50,
                  mb: 2,
                }}
              >
                <ul>
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="center"
                    key={`${todo.id}`}
                  >
                    {todo.content}
                  </Typography>
                </ul>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => updateHandler(todo.id)}
              >
                수정
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={(event) => deleteHandler(event, todo.id)}
              >
                삭제
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Modal
        open={open}
        onClose={ModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <UpdateTodo id={id} setOpen={setOpen} />
        </Bar>
      </Modal>
    </Container>
  );
}
const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));
export default TodoDetailView;
