import React, { useEffect, useState } from "react";
import { Project } from "../../types/project";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  projectList: Project[];
}

const SingleProject = ({ projectList }: Props) => {
  console.log(projectList);
  if (!projectList.length) {
    return <div>Client has no on going project!</div>;
  }
  return (
    <div>
      {projectList.map((p, idx) => (
        <li key={idx}>{p.name}</li>
      ))}
    </div>
  );
};

export default SingleProject;
