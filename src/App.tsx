import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";

import HomeLayout from "./layout/homeLayout";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Route>
        {/* <Route path="/app" element={<MainLayout.tsx />}>
          <Route index element={<Login />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
