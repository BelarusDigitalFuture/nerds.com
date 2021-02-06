import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import FirstStep from '../firstStep/FirstStep';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/recommendation" />
        <Route exact path="/recommendation" component={FirstStep} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default Routes;
