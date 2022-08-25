import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
axios.defaults.withCredentials = true;

const newProjectForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();
  const clientOptions = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  console.log("client: ", clientOptions);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      budget: { value: number };
      rate: { value: number };
      due_date: { value: Date };
      category_name: { value: [] };
      client_id: { value: string };
    };

    const newProject = {
      name: target.name.value,
      budget: Number(target.budget.value),
      rate: Number(target.rate.value),
      due_date: target.due_date.value,
      category_name: target.category_name.value.split(","),
      client_id: target.client_id.value,
    };

    console.log("new project: ", newProject);
    if (newProject) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/projects/new`,
          newProject
        );
        console.log("added new project:", result.data);
        const project_id: any = result.data.project_id;
        console.log("project id: ", project_id);
        const newClientList: any = clientList.map((c) => {
          if (c._id === newProject.client_id) {
            return { ...c, project_ids: [...c.project_ids, project_id] };
          }
          return c;
        });
        console.log("updated client list: ", newClientList);
        setClientList(newClientList);
        navigate(`/projects/${project_id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%" }}>
        <Button>
          <Link to="/projects">Cancel</Link>
        </Button>
        <h3>New Project</h3>

        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              *Client
              <select name="client_id">
                {clientOptions.map((c: { id: string; name: string }, idx) => (
                  <option key={idx} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button onClick={() => navigate("/clients/new")}>
                + New Client
              </button>
            </label>

            <label>
              *Project Name
              <input type="text" name="name" />
            </label>
            <label>
              *Budget
              <input type="number" name="budget" />
            </label>
            <label>
              *Rate
              <input type="number" name="rate" />
            </label>
            <label>
              *Due Date
              <input type="date" name="due_date" />
            </label>
            <label>Category</label>
            <textarea
              name="category_name"
              style={{ width: "180px", height: "60px" }}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default newProjectForm;
