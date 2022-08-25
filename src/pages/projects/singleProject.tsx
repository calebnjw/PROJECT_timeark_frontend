import React from "react";
import { useParams } from "react-router-dom";

const SingleProject = () => {
  let { project_id } = useParams();
  console.log("project id: ", project_id);

  return (
    <div>
      <h3>Show Single Project</h3>
    </div>
  );
};

export default SingleProject;
