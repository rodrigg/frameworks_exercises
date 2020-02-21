import * as React from "react";
import { MembersTableComponent, MembersViewComponent } from "./components";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

export const App: React.FC = () => (
  <>
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path="/miembros/:username/"
          component={MembersViewComponent}
        />
        <Route
          exact={true}
          path="/miembros/"
          component={MembersTableComponent}
        />
        <Route exact={true} path="/" component={MembersTableComponent} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  </>
);
