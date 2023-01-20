import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDataType } from "../../../types/Todo.interface";
import { createTodoController } from "../../api/todo";

function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: ({ title, content }: TodoDataType) =>
      createTodoController(title, content),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return createTodoMutation;
}

export default useCreateTodo;
