import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
<<<<<<< Updated upstream
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
=======
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> Stashed changes

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/mainplacehiringclient">
      <App />
    </BrowserRouter>
  </Provider>
);
