import React from "react";

import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const projects = () => {
  return <div>projects page</div>;
};

export default projects;
