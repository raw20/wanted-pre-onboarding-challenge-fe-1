import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoController } from "../../api/todo";

function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => deleteTodoController(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return deleteTodoMutation;
}

export default useDeleteTodo;
