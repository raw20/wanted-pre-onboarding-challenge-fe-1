import React, {
  FormEvent,
  SetStateAction,
  Dispatch,
  useState,
  forwardRef,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useGetTodoById from "../../lib/hook/queries/useGetTodoById";
import { style } from "../../styles/modal";
import { BarProps, Ref } from "../../Types/IProps";
import Modal from "@mui/material/Modal";
import UpdateConfirm from "./UpdateConfirm";

interface UpdateTodoProps {
  id: string;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

function UpdateTodo({ id, setOpenUpdateModal }: UpdateTodoProps) {
  const todo = useGetTodoById(id);
  const [title, setTitle] = useState<FormDataEntryValue>("");
  const [content, setContent] = useState<FormDataEntryValue>("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title: FormDataEntryValue = data.get("title") ?? "";
    const content: FormDataEntryValue = data.get("content") ?? "";
    setTitle(title);
    setContent(content);
    setOpenConfirmModal(true);
  };
  const ConfirmModalCloseHandler = () => {
    setOpenConfirmModal(false);
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
        label={todo?.title}
        name="title"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label={todo?.content}
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
        onClick={() => setOpenUpdateModal(false)}
      >
        취소하기
      </Button>
      <Modal
        open={openConfirmModal}
        onClose={ConfirmModalCloseHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Bar type={"span"}>
          <UpdateConfirm
            id={id}
            title={title}
            content={content}
            setOpenConfirmModal={setOpenConfirmModal}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Bar>
      </Modal>
    </Box>
  );
}
const Bar = forwardRef<Ref, BarProps>((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));
export default UpdateTodo;
