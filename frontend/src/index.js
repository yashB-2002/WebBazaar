import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
import { CartProvider } from "./context/Context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
