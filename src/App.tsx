import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoicePage from "./pages/invoices/InvoicePage";
import Projects from "./pages/projects/projects";
import Page404 from "./pages/notFound/Page404";
import GenerateInvoice from "./pages/invoices/GenerateInvoice"; 
import InvoiceDisplay from "./pages/invoices/InvoiceDisplay";
import { ClientGlobalContext } from "./context/clientContext";

import axios from "axios";
import InvoiceForm from "./pages/invoices/Form";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`
      ); // add query user_id as 2nd param
      setClientList(result.data);
    };
    getClients();
  }, []);
  console.log("client list: ", clientList);

  return (
    <>
    <BrowserRouter>
      <ClientGlobalContext.Provider value={{ clientList, setClientList }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route index element={<Clients />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/:clientId" element={<SingleClient />} />
        <Route path="projects" element={<Projects />} />
        <Route path="invoices" element={<InvoicePage />} />
        <Route path="invoices/new" element={<GenerateInvoice />} />
        <Route path="invoices/:id" element={<InvoiceDisplay/> } />
        <Route path="*" element={<Page404 />} />
      </Routes>
      </ClientGlobalContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
