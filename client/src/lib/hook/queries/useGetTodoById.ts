import { useQuery } from "@tanstack/react-query";
import { getTodoByIdController } from "../../api/todo";

function useGetTodoById(id: string) {
  const { data: todo } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoByIdController(id),
  });
  return todo;
}

export default useGetTodoById;
