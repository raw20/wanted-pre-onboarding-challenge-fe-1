import { useQuery } from "@tanstack/react-query";
import { getTodosController } from "../../api/todo";

function useGetTodos() {
  const {
    data: todos,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosController,
  });

  return { todos, isSuccess, isError };
}
export default useGetTodos;
