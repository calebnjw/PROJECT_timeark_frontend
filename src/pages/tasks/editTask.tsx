// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Navbar from "../../components/navbar";
// import Sidebar from "../../components/sidebar";
// import { useGlobalContext } from "../../context/clientContext";
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import { useState } from "react";
// import { Project } from "../../types/project";

// import axios from "axios";
// axios.defaults.withCredentials = true;

// const EditTaskForm = () => {
//   const { clientList, setClientList } = useGlobalContext();
//   const [projectList, setProjectList] = useState<Project[]>([]);
//     const [categoryList, setCategoryList] = useState([]);
//   const { selectedTask, setSelectedTask } = useState([])

//   const navigate = useNavigate();
//   let { task_id } = useParams();

//   const handleCancelButton = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     function getSingleTask () {
//       try {
//         const result = axios.get(`tasks/${task_id}`)
//         setSelectedTask(result)
//         console.log('selectedTask', selectedTask)
//       } catch (error) {
//         console.log("Error message: ", error);
//       }
//     }
//     getSingleTask();
//   }, [selectedTask]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const target = e.target as typeof e.target & {
//       client_id: { value: string };
//       project_id: { value: string };
//       category_name: { value: string };
//       task: { value: string };
//     };

//     const updateTask = {
//       client_id: target.client_id.value,
//       project_id: target.project_id.value,
//       category_name: target.category_name.value,
//       task: target.task.value,
//     };

//     console.log("update task: ", updateTask);
//       try {
//         const result: any = await axios.put(
//           `${process.env.REACT_APP_BACKEND_URL}/tasks/${task_id}/update`,
//           updateTask
//         );

//         navigate(`/projects/${result.project_id}`);
//       } catch (error) {
//         console.error(error);
//       }
//   };

//   return (
//     <>
//       <Navbar />
//       <Sidebar />
//       <Box style={{ width: "80%", marginLeft: "32%", marginTop: "90px" }}>
//         <Button
//           color="secondary"
//           variant="contained"
//           onClick={handleCancelButton}
//         >
//           CANCEL
//         </Button>
//         <h3>Edit Task</h3>
//         <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
//           {" "}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               width: "600px",
//               justifyContent: "space-around",
//             }}
//           >
//             <TextField
//               type="text"
//               name="project"
//               label="*Project Name"
//               defaultValue={selectedTask.project_id}
//             />

//           </div>
//           <div>
//             <Button type="submit" value="Submit" variant="contained">
//               Update Task
//             </Button>
//           </div>
//         </form>
//       </Box>
//     </>
//   );
// };
// export default EditTaskForm;

export {};
