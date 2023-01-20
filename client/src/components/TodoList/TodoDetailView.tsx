import React, { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UpdateTodo from "../Modal/UpdateTodo";
import useGetTodos from "../../lib/hook/queries/useGetTodos";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TodoEdit from "../Menu/TodoEdit";
import { BarProps, Ref } from "../../interface/IProps";

function TodoDetailView() {
  const [id, setId] = useState("");
  const todos = useGetTodos();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const ModalCloseHandler = () => {
    setOpenUpdateModal(false);
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
              action={
                <>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, todo.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <TodoEdit
                    open={open}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    setOpenUpdateModal={setOpenUpdateModal}
                    setId={setId}
                    id={id}
                  />
                </>
              }
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
          </Card>
        </Grid>
      ))}
      <Modal
        open={openUpdateModal}
        onClose={ModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <UpdateTodo id={id} setOpenUpdateModal={setOpenUpdateModal} />
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
