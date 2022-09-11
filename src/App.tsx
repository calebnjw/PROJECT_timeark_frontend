import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";
import EditSingleClient from "./pages/clients/editSingleClients";
import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import SingleProject from "./pages/projects/singleProject";
import EditProjectForm from "./pages/projects/editProjectForm";
import Tasks from "././pages/tasks/task";
import NewTask from "./pages/tasks/newTaskForm";
// import SingleTask from "./pages/tasks/singleTask";
// import EditTask from "./pages/tasks/editTask";
import Invoices from "./pages/invoices/invoices";
import Profile from "./pages/profile/profile";
import Onboard from "./pages/profile/onboard";
import ProfileInfo from "./pages/profile/components/profileInfo";
import ProfileEdit from "./pages/profile/components/profileEdit";
import Page404 from "./pages/notFound/Page404";
import Dashboard from "./pages/dashboard/dashboard";
import Time from "./pages/timeTracking/time";

import axios from "axios";
import HomeLayout from "./layout/homeLayout";
import AppLayout from "./layout/appLayout";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
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
          </Route>
        </Route>

        <Route path="tasks">
          <Route index element={<Tasks />} />
          <Route path="new" element={<NewTask />} />
        </Route>

        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileInfo />} />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>

        <Route path="time" element={<Time />} />

        <Route path="invoices" element={<Invoices />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
