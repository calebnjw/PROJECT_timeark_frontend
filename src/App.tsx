import React, { useEffect, useState } from "react";

import Dashboard from "./pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Home from "./pages/home/home";
// import Login from "./pages/login/login";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";

import InvoiceDisplay from "./pages/invoices/InvoiceDisplay";
import InvoicePage from "./pages/invoices/InvoicePage";
import GenerateInvoice from "./pages/invoices/GenerateInvoice";
import InvoiceForm from "./pages/invoices/newInvoiceForm";
import EditSingleClient from "./pages/clients/editSingleClients";
import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import EditProjectForm from "./pages/projects/editProjectForm";
import SingleProject from "./pages/projects/singleProject";
import Login from "./pages/login/login";
import Tasks from "./pages/tasks/task";
import NewTask from "./pages/tasks/newTaskForm";
import SingleTask from "./pages/tasks/singleTask";
import EditTask from "./pages/tasks/editTask";
import Profile from "./pages/profile/profile";
import Onboard from "./pages/profile/onboard";
import ProfileInfo from "./pages/profile/components/profileInfo";
import ProfileEdit from "./pages/profile/components/profileEdit";
import Page404 from "./pages/notFound/Page404";
import { DateTime } from "luxon";
import Time from "./pages/timeTracking/time";

import { User } from "./types/user";

import { ClientGlobalContext } from "./context/clientContext";
import { UserContext } from "./context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  // get client list
  const getClients = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/clients`
    );
    // console.log("fetch user's client list: ", result.data);
    setClientList(result.data);
  };

  // get user info
  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/user`
        );
        // console.log("get user info: ", result.data);
        const userId = result.data.user._id;
        if (userId) {
          getClients();
        }
        setUserProfile(result.data.user);
        setNewUser(result.data.newUser);
        setUserId(userId);
      } catch (error) {
        console.log("Error message: ", error);
      }
    };
    getProfile();
  }, []);

  // useEffect(() => {
  //   if (userId && userId.length > 0) {
  //     const getClients = async () => {
  //       const result = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/clients`,
  //         {
  //           params: { user_id: userId },
  //         }
  //       );
  //       console.log("fetch user's client list: ", result.data);

  //       setClientList(result.data);
  //     };
  //     getClients();
  //   }
  // }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        newUser,
      }}
    >
    <ClientGlobalContext.Provider
    value={{
      clientList,
      setClientList,
      userId,
    }}
    >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="onboard" element={<Onboard />} />

          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/:clientId" element={<SingleClient />} />
          <Route
            path="clients/:clientId/update"
            element={<EditSingleClient />}
          />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:project_id" element={<SingleProject />} />
          <Route
            path="projects/:project_id/update"
            element={<EditProjectForm />}
          />

          <Route
            path="projects/:project_id/tasks/:task_id"
            element={<SingleTask />}
          />
          <Route
            path="projects/:project_id/tasks/:task_id/update"
            element={<EditTask />}
          />

          <Route path="tasks/new" element={<NewTask />} />

          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>

          <Route path="time" element={<Time />} />

    <Route path="invoices" element={<InvoicePage />} />
    <Route path="invoices/:project_id" element={<GenerateInvoice />} />
    <Route path="invoices/new" element={<InvoiceForm />} />
    <Route path="invoices/invoice/:invoice_id" element={<InvoiceDisplay />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </ClientGlobalContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
