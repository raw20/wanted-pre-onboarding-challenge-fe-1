import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDataByIdType } from "../../../interface/Todo.interface";
import { updateTodoController } from "../../api/todo";

function useUpdateTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: ({ title, content, id }: TodoDataByIdType) =>
      updateTodoController(title, content, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return updateTodoMutation;
}

export default useUpdateTodo;
