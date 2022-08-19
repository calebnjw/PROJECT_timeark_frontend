import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
