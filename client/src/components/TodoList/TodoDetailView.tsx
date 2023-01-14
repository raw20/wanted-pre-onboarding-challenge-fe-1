import axios from "axios";
import React, {
  useEffect,
  useState,
  MouseEvent,
  forwardRef,
  ReactNode,
} from "react";
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
import { PORT } from "../../utils/auth/api";
import { deleteTodoHandler, getTodoByIdHandler } from "../../utils/todo/api";
import UpdateTodo from "../Modal/UpdateTodo";
import { TodoList, TokenType } from "../../interface/Todo.interface";
import { useOutletContext } from "react-router-dom";

interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
export type Ref = HTMLButtonElement;

function TodoDetailView() {
  const { token } = useOutletContext<TokenType>();
  const [toDoData, setTodoData] = useState<TodoList[]>([]);
  const [editTodoData, setEditTodoData] = useState([]);
  const [open, setOpen] = useState(false);

  async function getTodosHandler() {
    await axios
      .get(`${PORT}/todos`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setTodoData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    deleteTodoHandler(id);
  };
  const updateHandler = (id: string) => {
    setOpen(true);
    getTodoByIdHandler(id, setEditTodoData);
  };
  const ModalCloseHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTodosHandler();
  }, []);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Grid container spacing={5} alignItems="flex-end">
        {toDoData?.map((todo) => (
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
                <Modal
                  open={open}
                  onClose={ModalCloseHandler}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Bar type={"span"}>
                    <UpdateTodo editTodoData={editTodoData} setOpen={setOpen} />
                  </Bar>
                </Modal>
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
      </Grid>
    </Container>
  );
}
const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));
export default TodoDetailView;
