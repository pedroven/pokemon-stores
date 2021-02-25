import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

export const mockServer = (endpoint: string, payload: any) => {
  const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_URL}${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(payload));
    })
  );
  return server;
};

export const renderWithRouter = (ui: any, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};
