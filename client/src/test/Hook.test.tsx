import * as React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetTodos from "../lib/hook/queries/useGetTodos";
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("query hook", () => {
  test("successful useGetTodos query hook", async () => {
    const { result } = renderHook(() => useGetTodos(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(false));
    expect(result.current.todos).toBeDefined();
  });
  test("error useGetTodoById query hook", async () => {
    const { result } = renderHook(() => useGetTodos(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
