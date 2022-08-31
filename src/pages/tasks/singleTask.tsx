// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/navbar";
// import Sidebar from "../../components/sidebar";
// import { Project } from "../../types/project";
// import { useGlobalContext } from "../../context/clientContext";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";

// import axios from "axios";
// axios.defaults.withCredentials = true;

// const SingleTask = () => {
//   const navigate = useNavigate();

//   const { clientList } = useGlobalContext();
//   let { task_id } = useParams();
//   const [project, setProject] = useState<Project>();

//   useEffect(() => {
//     const getProjectInfo = async () => {
//       try {
//         const result = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/tasks/${task_id}`
//         );
//         setProject(result.data.project);
//       } catch (error) {
//         console.log("Error message: ", error);
//       }
//     };
//     getProjectInfo();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Sidebar />
//       <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
//         <Stack direction="row" spacing={2}>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => {
//               navigate("/projects");
//             }}
//           >
//             Back
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => {
//               navigate(`/projects/${project?._id}/update`, { state: project });
//             }}
//           >
//             Edit
//           </Button>
//         </Stack>
//         <h3>Project Details: </h3>
//         <div>
//           <h5>{client?.client_name}</h5>
//           <p>Project Name: {project?.name}</p>
//           <p>Project Budget: {project?.budget}</p>
//           <p>Project Rate: {project?.rate}</p>
//           <p>Project Due Date: {project?.due_date}</p>
//           <p>Tasks: To be added </p>
//         </div>
//         <br />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             navigate(`/tasks/new`);
//           }}
//         >
//           Add New Task
//         </Button>
//       </div>
//     </>
//   );
// };

// export default SingleTask;

export {};
