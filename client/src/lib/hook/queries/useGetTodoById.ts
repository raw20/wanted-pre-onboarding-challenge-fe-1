import { useQuery } from "@tanstack/react-query";
import { getTodoByIdController } from "../../api/todo";

function useGetTodoById(id: string) {
  const {
    data: todo,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoByIdController(id),
  });
  return { todo, isSuccess, isError };
}

export default useGetTodoById;
