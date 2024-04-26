import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import Pokemon from "../Pokemon";
import { mockPokeList } from "../../../mock/mockPoke";
import fetchMock from "jest-fetch-mock";

import { Provider } from "react-redux";
import { store } from "../../../store";

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("It should decribe pokemon details view", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("should render loading on pokemon and then data", async () => {
    //Given
    fetchMock.mockResponse(JSON.stringify({ ...mockPokeList }));
    //When
    render(<Pokemon />, { wrapper });
    //Then
    expect(screen.getByRole("contentLoader")).toBeInTheDocument();
    expect(await screen.findAllByRole("pokeName")).toHaveLength(8);
  });
});
