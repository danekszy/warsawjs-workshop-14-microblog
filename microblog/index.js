import React from "react";
import { AppRegistry } from "react-native";

import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import App from "./src/index";

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("microblog", () => ReduxApp);

