import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { PORT } from "../../utils/auth/api";
import { deleteTodoHandler, getTodoByIdHandler } from "../../utils/todo/api";
import UpdateTodo from "../UpdateTodoModal/UpdateTodo";
import { useRecoilState } from "recoil";
import { refreshState } from "../../store/atom";

function TodoListView(token) {
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
      <Box
        sx={{
          alignItems: "baseline",
          mb: 2,
        }}
      >
        {data?.map((ele) => (
          <ListItemButton component="a" href="#simple-list" key={ele.id}>
            <ListItemText primary={ele.title} />
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
          </ListItemButton>
        ))}
      </Box>
    </Container>
  );
}

const Bar = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default TodoListView;
