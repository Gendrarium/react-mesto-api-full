import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./components/App/App";
import HelmetTitle from "./components/HelmetTitle/HelmetTitle";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.scss";

const rootElement = document.querySelector(".page") as HTMLDivElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetTitle />
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
