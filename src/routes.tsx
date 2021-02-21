import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";
import Store from "./pages/Store";
import PokemonInfo from "./pages/PokemonInfo";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/store/fogo"
          exact
          component={() => <Store type="fire" />}
        />
        <Route
          path="/store/agua"
          exact
          component={() => <Store type="water" />}
        />
        <Route
          path="/store/grama"
          exact
          component={() => <Store type="grass" />}
        />
        <Route path="/pokemon/:id" exact component={PokemonInfo} />
        <Route
          path="/*"
          exact
          component={() => <h1>Página não encontrada</h1>}
        />
      </Switch>
    </Router>
  );
}
