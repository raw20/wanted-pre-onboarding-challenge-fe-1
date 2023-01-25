import * as React from "react";
import App from "../App";
import { render, renderHook, waitFor } from "@testing-library/react";
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
  test("successful query hook", async () => {
    const { result } = renderHook(() => useGetTodos(), {
      wrapper: createWrapper(),
    });
    await waitFor(() =>
      expect(result.current.map((data) => data)).toBe(typeof Object)
    );
    expect(result.current.map((data) => data)).toBeDefined();
  });
});

describe("<App /> test", () => {
  it("matches snapshopt", () => {
    const utils = render(<App />);
    expect(utils.container).toMatchSnapshot(); // snapshot match
  });
});
