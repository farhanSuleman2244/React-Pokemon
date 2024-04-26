import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemon, IPokemonListing } from "../types/pokemonTypes";

const baseUrl =
  process.env.REACT_APP_API_BASE_URL ?? "https://pokeapi.co/api/v2/";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPokemonById: builder.query<IPokemon, string>({
      query: (id) => `/pokemon/${id}`,
    }),
    getPokemonList: builder.query<IPokemonListing, void>({
      query: () => {
        return {
          url: "pokemon",
          params: { limit: 8 },
        };
      },
    }),
  }),
});

export const { useGetPokemonByIdQuery, useGetPokemonListQuery } = pokemonApi;
