import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware'
import DrawerNavigator from "./src/Navigation/DrawerNavigator";
import reducers from './src/reducers'

const store = createStore(reducers, applyMiddleware(createPromise(), thunkMiddleware));
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
export default App;