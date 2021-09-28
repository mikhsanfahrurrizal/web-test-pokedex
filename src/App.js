import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Body from "./features/app";
import Home from "./features/home";

import "./App.css";

function App() {
  return (
    <Router>
      <>
        <Body>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Body>
      </>
    </Router>
  );
}

export default App;
