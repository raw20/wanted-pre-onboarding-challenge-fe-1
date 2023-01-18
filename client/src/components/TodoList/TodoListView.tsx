import React, { useState, MouseEvent, forwardRef, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { deleteTodoController } from "../../lib/api/todo";
import UpdateTodo from "../Modal/UpdateTodo";
import { getTodosController } from "../../lib/api/todo";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

function TodoListView() {
  const [id, setId] = useState("");
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosController,
  });
  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => deleteTodoController(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
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
      <Box
        sx={{
          alignItems: "baseline",
          mb: 2,
        }}
      >
        {todos?.map((todo) => (
          <ListItemButton component="a" href="#simple-list" key={todo?.id}>
            <ListItemText primary={todo?.title} />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => updateHandler(todo?.id)}
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
          </ListItemButton>
        ))}
      </Box>
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

export default TodoListView;
