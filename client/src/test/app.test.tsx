import * as React from "react";
import App from "../App";
import { rest } from "msw";
import { render, screen } from "@testing-library/react";
import { server } from "../setupTests";
import TodoList from "../pages/TodoList";
import TodoListView from "../components/TodoList/TodoListView";
import TodoDetailView from "../components/TodoList/TodoDetailView";

describe("query component", () => {
  test("successful query component", async () => {
    render(<TodoList />);
    render(<TodoListView />);
    render(<TodoDetailView />);

    const listitems = await screen.findAllByRole("listitem");
    expect(listitems).not.toHaveLength(0);
  });

  test("failure query component", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<TodoList />);
    render(<TodoListView />);
    render(<TodoDetailView />);
    const error = () => {
      throw new TypeError("UNKNOWN ERROR");
    };
    expect(error).toThrow(TypeError);
  });
});

describe("<App /> test", () => {
  it("matches snapshopt", () => {
    const utils = render(<App />);
    expect(utils.container).toMatchSnapshot(); // snapshot match
  });
});
