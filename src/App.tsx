import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/clients" element={<Clients />}></Route>
        <Route path="/projects"></Route>
        <Route path="/invoices"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
