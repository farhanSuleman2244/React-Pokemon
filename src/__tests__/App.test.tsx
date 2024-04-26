import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import App from "../App";

import { Provider } from "react-redux";
import { store } from "../store";

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("it should describe app render", () => {
  it("render app component", () => {
    render(<App />, { wrapper });
    expect(screen.getByRole("app")).toBeInTheDocument();
    expect(screen.getByRole("react-poke")).toBeInTheDocument();
  });
});
