import React from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects/projects";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="clients" element={<Clients />} />
        <Route path="projects" element={<Projects />} />
        <Route path="invoices" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
