import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Dashboard from "./pages/dashboard/dashboard";

import Home from "./pages/home/home";
import Login from "./pages/login/login";

import AppLayout from "./layout/appLayout";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";

import EditSingleClient from "./pages/clients/editSingleClients";
import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import EditProjectForm from "./pages/projects/editProjectForm";
import SingleProject from "./pages/projects/singleProject";

import NewTask from "./pages/tasks/newTaskForm";
import EditTask from "./pages/tasks/editTask";

import Profile from "./pages/profile/profile";
import Onboard from "./pages/profile/onboard";
import ProfileInfo from "./pages/profile/components/profileInfo";
import ProfileEdit from "./pages/profile/components/profileEdit";

import Time from "./pages/timeTracking/time";

import InvoiceDisplay from "./pages/invoices/InvoiceDisplay";
import InvoicePage from "./pages/invoices/InvoicePage";
import GenerateInvoice from "./pages/invoices/GenerateInvoice";
import InvoiceForm from "./pages/invoices/newInvoiceForm";
import EditInvoiceForm from "./pages/invoices/EditInvoiceForm";

import Page404 from "./pages/notFound/Page404";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="onboard" element={<Onboard />} />

        <Route path="clients">
          <Route index element={<Clients />} />
          <Route path="new" element={<AddClient />} />
          <Route path=":clientId">
            <Route index element={<SingleClient />} />
            <Route path="update" element={<EditSingleClient />} />
          </Route>
        </Route>

        <Route path="projects">
          <Route index element={<Projects />} />
          <Route path="new" element={<NewProject />} />
          <Route path=":project_id">
            <Route index element={<SingleProject />} />
            <Route path="update" element={<EditProjectForm />} />
            <Route path="tasks">
              <Route path="new" element={<NewTask />} />
              <Route path=":task_id/update" element={<EditTask />} />
            </Route>
          </Route>
        </Route>

        <Route path="tasks">
          <Route path="new" element={<NewTask />} />
          <Route path=":task_id/update" element={<EditTask />} />
        </Route>

        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileInfo />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>

        <Route path="time">
          <Route index element={<Time />} />
          <Route path=":selectedDate" element={<Time />} />
        </Route>

        <Route path="invoices">
          <Route index element={<InvoicePage />} />
          <Route path="projects/:project_id" element={<GenerateInvoice />} />
          <Route path="new" element={<InvoiceForm />} />
          <Route path=":invoice_id/update" element={<EditInvoiceForm />} />
          <Route path=":invoice_id" element={<InvoiceDisplay />} />
        </Route>
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
