import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { MembersAreaContainer, MembersViewComponent } from './components';
import { MemberViewContainer } from './components/member-view/member-view.container';

export const App = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route
            exact={true}
            path="/miembros/:username/"
            component={MemberViewContainer}
          />
          <Route
            exact={true}
            path="/miembros/"
            component={MembersAreaContainer}
          />
          <Route exact={true} path="/" component={MembersAreaContainer} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
}
