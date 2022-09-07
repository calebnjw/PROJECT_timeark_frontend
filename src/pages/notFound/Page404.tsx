import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h1>Page404</h1>
      <p>Page is not found!</p>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default Page404;
