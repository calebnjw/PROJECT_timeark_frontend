import DashboardList from "./dashboardlist";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Stack, Typography } from "@mui/material";

export default function DashboardProject() {
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={7}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: "15px",
        borderRadius: "20px",
      }}
    >
      <Stack direction="row">
        <Typography
          variant="h4"
          style={{
            flexGrow: 1,
          }}
        >
          Projects
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            navigate("/app/projects/new");
          }}
        >
          + New Project
        </Button>
      </Stack>

      {clientList.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            marginTop: "30px",
          }}
        >
          {clientList.map((client, idx) => (
            <li key={idx}>
              <DashboardList client={client} />
            </li>
          ))}
        </ul>
      )}
    </Paper>
  );
}
