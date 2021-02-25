import React from "react";
import { cleanup, waitFor, fireEvent } from "@testing-library/react";
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
  }),
  useLocation: () => ({
    state: { price: 100 }
  })
}));
jest
  .spyOn(redux, "useSelector")
  .mockImplementation(callback => callback(state));

const server = mockServer("pokemon/6", {
  abilities: [
    { ability: { name: "blaze" } },
    { ability: { name: "solar-power" } }
  ],
  moves: [{ move: { name: "scratch" } }, { move: { name: "fly" } }],
  name: "charizard",
  height: 17,
  weight: 905
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(cleanup);
afterAll(() => server.close());

it("Should render pokemon info", async () => {
  const { getByText, queryByText } = renderWithRouter(<App />, {
    route: "/pokemon/fogo/6/"
  });
  await waitFor(() => getByText("Charizard"));
  expect(queryByText("Adicionar")).not.toBeNull();
});

it("Should add a pokemon to the cart", async () => {
  const { getByText } = renderWithRouter(<App />, {
    route: "/pokemon/fogo/6/"
  });
  await waitFor(() => getByText("Charizard"));
  fireEvent.click(getByText("Adicionar"));
  expect(dispatch).toHaveBeenCalled();
});
