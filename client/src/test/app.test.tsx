import * as React from "react";
import App from "../App";
import { render } from "@testing-library/react";

describe("<App /> test", () => {
  it("matches snapshopt", () => {
    const utils = render(<App />);
    expect(utils.container).toMatchSnapshot(); // snapshot match
  });
});
