// src/main.jsx or src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import {  AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Router>
 
    <AuthProvider>
      <AppProvider>
     
        <App />
      </AppProvider>
    </AuthProvider>
   
    </Router>
  </React.StrictMode>
);
