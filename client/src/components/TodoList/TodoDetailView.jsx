import axios from "axios";
import React, { useEffect, useState } from "react";
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
import UpdateTodo from "../UpdateTodoModal/UpdateTodo";
import { useRecoilState } from "recoil";
import { refreshState } from "../../store/atom";

function TodoDetailView(token) {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useRecoilState(refreshState);

  async function getTodosHandler() {
    await axios
      .get(`${PORT}/todos`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const deleteHandler = (event, id) => {
    event.preventDefault();
    deleteTodoHandler(id, token);
    setRefreshKey((oldKey) => oldKey + 1);
  };
  const updateHandler = (id) => {
    setOpen(true);
    getTodoByIdHandler(id, token, setEditData);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTodosHandler();
  }, [refreshKey]);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Grid container spacing={5} alignItems="flex-end">
        {data?.map((ele) => (
          <Grid item key={ele.title} xs={12} md={4}>
            <Card>
              <CardHeader
                title={ele.title}
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
                      key={`${ele.id}`}
                    >
                      {ele.content}
                    </Typography>
                  </ul>
                </Box>
              </CardContent>
              <CardActions>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Bar>
                    <UpdateTodo
                      editData={editData}
                      token={token}
                      setOpen={setOpen}
                      setRefreshKey={setRefreshKey}
                    />
                  </Bar>
                </Modal>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => updateHandler(ele.id)}
                >
                  수정
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(event) => deleteHandler(event, ele.id)}
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
const Bar = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default TodoDetailView;
