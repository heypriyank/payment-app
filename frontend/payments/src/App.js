import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Home from "./pages/home/home";
import Transactions from "./pages/transactions/transactions"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/">
          <LoginSignup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
