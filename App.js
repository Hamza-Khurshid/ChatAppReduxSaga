import React from 'react';
import Chat from './source/screens/Chat';
import store from "./source/redux/configureStore";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
};

export default App;
