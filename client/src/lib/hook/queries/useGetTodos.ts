import { useQuery } from "@tanstack/react-query";
import { getTodosController } from "../../api/todo";

function useGetTodos() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosController,
  });

  return todos;
}
export default useGetTodos;
