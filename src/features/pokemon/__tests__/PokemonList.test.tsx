import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import PokemonList from "../PokemonList";
import { mockPoke, mockPokeList } from "../../../mock/mockPoke";
import fetchMock from "jest-fetch-mock";

import { Provider } from "react-redux";
import { store } from "../../../store";
import userEvent from "@testing-library/user-event";

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("It should decribe pokemon details view", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("should render loading on pokemonList and then data", async () => {
    //Given
    fetchMock.mockResponse(JSON.stringify({ ...mockPoke }));
    const handleViewList = jest.fn();
    //When
    render(
      <PokemonList
        poke={mockPokeList.results[0]}
        handleViewDetails={handleViewList}
      />,
      { wrapper }
    );
    //Then
    expect(screen.getByRole("contentLoader")).toBeInTheDocument();
    expect(await screen.findByRole("pokeName")).toBeInTheDocument();
    expect(screen.getByRole("pokeName")).toHaveTextContent("charmeleon");
    const showPokeDetails = screen.getByRole("showPokeDetails");
    await userEvent.click(showPokeDetails);
    expect(handleViewList).toBeCalled();
  });
});
