import React from "react";
import { cleanup, waitFor, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import { mockServer, renderWithRouter } from "../testUtils/mocks";
import * as redux from "react-redux";

const state = {
  productsState: { products: [] },
  searchedNameState: { searchedNameState: "" }
};

const dispatch = jest.fn();
jest.spyOn(redux, "useDispatch").mockReturnValue(dispatch);
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: () => ({
    push: jest.fn()
  })
}));
jest
  .spyOn(redux, "useSelector")
  .mockImplementation(callback => callback(state));

const server = mockServer("type/fire/", {
  pokemon: [
    {
      pokemon: {
        name: "charmeleon",
        url: "https://foo/api/v2/pokemon/5/"
      }
    },
    {
      pokemon: {
        name: "charizard",
        url: "https://foo/api/v2/pokemon/6/"
      }
    }
  ]
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(cleanup);
afterAll(() => server.close());

it("Should render all pokemon cards", async () => {
  const { getAllByTestId } = renderWithRouter(<App />, {
    route: "/store/fogo"
  });
  const pokemonCards = await waitFor(() =>
    getAllByTestId("pokemon-card").map(li => li.textContent)
  );
  expect(pokemonCards).toHaveLength(2);
  expect(pokemonCards[0]).toMatch(/(Charmeleon)/i);
  expect(pokemonCards[1]).toMatch(/(Charizard)/i);
});

it("Should add one pokemon to the cart", async () => {
  const { getAllByText } = renderWithRouter(<App />, {
    route: "/store/fogo"
  });
  const addToCartButtons = await waitFor(() => getAllByText("Adicionar"));
  //click the first one
  fireEvent.click(addToCartButtons[0]);
  expect(dispatch).toHaveBeenCalled();
});

it("Should finish a pokemon purchase", async () => {
  const state = {
    productsState: {
      products: [
        {
          id: "5",
          name: "charizard",
          price: 100,
          url: "https://foo/api/v2/pokemon/5/",
          amount: 1,
          storeType: "fire"
        }
      ]
    },
    searchedNameState: { searchedNameState: "" }
  };
  jest
    .spyOn(redux, "useSelector")
    .mockImplementation(callback => callback(state));
  const { getByTitle, getAllByTestId } = renderWithRouter(<App />, {
    route: "/store/fogo"
  });
  await waitFor(() => getAllByTestId("pokemon-card"));
  fireEvent.click(getByTitle("Pokemon Selecionados"));
  fireEvent.click(screen.getByText("Finalizar"));
  expect(
    screen.queryByText("Obrigado por finalizar sua compra!")
  ).not.toBeNull();
});

it("Should remove a pokemon for the cart", async () => {
  const state = {
    productsState: {
      products: [
        {
          id: "5",
          name: "charizard",
          price: 100,
          url: "https://foo/api/v2/pokemon/5/",
          amount: 1,
          storeType: "fire"
        }
      ]
    },
    searchedNameState: { searchedNameState: "" }
  };
  jest
    .spyOn(redux, "useSelector")
    .mockImplementation(callback => callback(state));
  const { getByTitle, getAllByTestId } = renderWithRouter(<App />, {
    route: "/store/fogo"
  });
  await waitFor(() => getAllByTestId("pokemon-card"));
  fireEvent.click(getByTitle("Pokemon Selecionados"));
  fireEvent.click(getByTitle("Remover"));
  expect(dispatch).toHaveBeenCalled();
  expect(screen.queryByText("Obrigado por finalizar sua compra!")).toBeNull();
});
