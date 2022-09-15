import DashboardList from "./dashboardlist";
import { useGlobalContext } from "../../context/clientContext";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Paper, Stack, Typography } from "@mui/material";

export default function DashboardProject() {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <Paper
      elevation={2}
      // variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        // marginTop: "80px",
        // marginRight: "15%",
        // width: "800px",
        backgroundColor: "#f0f0f0",
        padding: "15px",
      }}
    >
      {/* <Card
        raised
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent> */}
      <Stack direction="row">
        <Typography
          variant="h4"
          style={{
            // marginLeft: "10%",
            flexGrow: 1,
          }}
        >
          Projects
        </Typography>
        <Button variant="contained" color="success">
          <Link to="/app/projects/new" style={{ color: "white", textDecoration: "none" }}>
            + New Project
          </Link>
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
      {/* </CardContent>
      </Card> */}
    </Paper>
  );
}
