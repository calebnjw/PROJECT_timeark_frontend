import AppNavbar from "../../components/navbar-App";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import ProjectList from "./projectList";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <>
      <AppNavbar />
      <Sidebar />
      <Container
        style={{
          width: "100%",
          marginLeft: "23%",
          marginTop: "100px",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={6}>
              <h2>Clients/Projects</h2>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: "right", marginRight: "100px" }}
            >
              <Button variant="contained" color="success">
                <Link
                  to="new"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  + New Project
                </Link>
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
      </Container>
    </>
  );
};

export default Projects;
