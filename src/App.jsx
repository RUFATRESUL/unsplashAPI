import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import CardMenu from "./components/CardMenu";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function App() {
 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <SubHeader />
        <CardMenu />
      </PersistGate>
    </Provider>
  );
}

export default App;
