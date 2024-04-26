import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { store } from "../store";
import {
  useGetPokemonByIdQuery,
  useGetPokemonListQuery,
} from "./pokemonService";
import { Provider } from "react-redux";

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useGetPokemonByIdQuery", () => {
  const pokemon = "1/";
  const data = {};

  it("renders getPokemonById hook", async () => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
    const endpointName = "getPokemonById";
    const { result } = renderHook(() => useGetPokemonByIdQuery(pokemon), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });

  it("renders getPokemonListing hook", async () => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
    const endpointName = "getPokemonList";
    const { result } = renderHook(() => useGetPokemonListQuery(), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});
