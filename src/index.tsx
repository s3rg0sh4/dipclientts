import ReactDOM from "react-dom/client";
import App from "./App";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
