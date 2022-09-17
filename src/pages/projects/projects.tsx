import { useGlobalContext } from "../../context/clientContext";
import ProjectList from "./projectList";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();

  const navigate = useNavigate();

  return (
    <Box>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3ch",
        }}
      >
        <Grid item>
          <Typography variant="h3">Projects</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("new");
            }}
          >
            + New Project
          </Button>
        </Grid>
      </Grid>
      <Stack>
        {clientList.map((client, idx) => (
          <li key={idx} style={{ listStyle: "none", marginTop: "10px" }}>
            <Typography style={{ fontWeight: "400" }}>
              <b>{client.client_name}</b>
            </Typography>
            <ProjectList client={client} />
          </li>
        ))}
      </Stack>
    </Box>
  );
};

export default Projects;
