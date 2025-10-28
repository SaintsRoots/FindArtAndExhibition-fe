import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import SocketProvider from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SocketProvider>
      <AppRoutes />
    </SocketProvider>
  </Provider>
);
