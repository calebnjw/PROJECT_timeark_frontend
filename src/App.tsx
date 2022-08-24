import React from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoicePage from "./pages/invoices/InvoicePage";
import Projects from "./pages/projects/projects";
import Page404 from "./pages/notFound/Page404";
import GenerateInvoice from './pages/invoices/GenerateInvoice'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route index element={<Clients />} />
        <Route path="clients" element={<Clients />} />
        <Route path="projects" element={<Projects />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="invoices/new" element={<GenerateInvoice />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
