import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

import "./assets/styles/app.css";
import "./assets/styles/responsive.css";
import "./assets/styles/index.css";

// //  import "antd/dist/antd.min.css";
//import "antd/dist/antd.css";


// import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
