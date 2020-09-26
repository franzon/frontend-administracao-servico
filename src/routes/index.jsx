import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AuthPage from '../pages/auth';
import HomePage from '../pages/home';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AuthPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
