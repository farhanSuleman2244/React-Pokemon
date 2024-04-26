import { render, screen } from "@testing-library/react";
import PokeDetails from "../PokeDetails";
import { mockPoke } from "../../../mock/mockPoke";
import userEvent from "@testing-library/user-event";

describe("It should decribe pokemon details view", () => {
  it("should render pokemon details without errors", () => {
    const handleViewList = jest.fn();
    render(<PokeDetails poke={mockPoke} handleViewList={handleViewList} />);
    expect(screen.getByRole("pokeHeight")).toHaveTextContent("11 cm");
    expect(screen.getByRole("pokeWeight")).toHaveTextContent("190 kg");
    expect(screen.getByRole("pokeName")).toHaveTextContent("charmeleon");
  });

  it("should click on back button to view poke list", async () => {
    const handleViewList = jest.fn();
    render(<PokeDetails poke={mockPoke} handleViewList={handleViewList} />);
    const backButton = screen.getByRole("displayListViewButton");
    await userEvent.click(backButton);
    expect(handleViewList).toBeCalled();
  });
});
