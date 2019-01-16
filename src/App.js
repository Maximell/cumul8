// Libraries
import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// Custom
import "./App.css";
import Four04 from "./routes/Four04/Four04";
import Home from "./routes/Home/Home";
import Store from "./store/Store";


class App extends Component {

  render() {

    const routes = [
      {
        path: "/",
        component: Home,
        exact: true
      },
      // 404
      {
        component: Four04
      }
    ]

    return (
      <Provider store={Store}>
        <Router>
          <Switch>
            {routes.map((route, i) => <Route path={route.path} component={route.component} exact={route.exact} key={i} />)}
          </Switch>
        </Router>
      </Provider>      
    )
  }
}

export default App;
