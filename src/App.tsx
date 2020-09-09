import React, { useEffect } from "react";
import MoviesList from "./modules/list/ui";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Movie from "./modules/list/ui/componens/show";
import { getConfig } from "./store";

const App = () => {
  useEffect(() => {
    getConfig();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<MoviesList />} />
        <Route exact path="/:id" render={() => <Movie />} />
      </Switch>
    </Router>
  );
};

export default App;
