import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import UpdateTodo from "../Modal/UpdateTodo";
import useGetTodos from "../../lib/hook/queries/useGetTodos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";
import { Bar } from "../Bar/Bar";
import Accordion from "../Accordion/Accordion";
import AccordionSummary from "../Accordion/AccordionSummary";
import { Typography } from "@mui/material";
import AccordionDetails from "../Accordion/AccordionDetails";
import TodoEdit from "../Modal/Menu/TodoEdit";

function Todo() {
  const [id, setId] = useState("");
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const { todos } = useGetTodos();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const UpdateModalCloseHandler = () => {
    setOpenUpdateModal(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const todoAccordionHandler =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Box
        sx={{
          alignItems: "baseline",
          mb: 2,
        }}
      >
        {todos?.map((todo, index) => (
          <Accordion
            key={todo?.id}
            expanded={expanded === `panel${index + 1}`}
            onChange={todoAccordionHandler(`panel${index + 1}`)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{todo?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{todo?.content}</Typography>
              <Typography>
                <CardHeader
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
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
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Modal
        open={openUpdateModal}
        onClose={UpdateModalCloseHandler}
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

export default Todo;
