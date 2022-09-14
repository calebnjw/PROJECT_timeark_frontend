import DashboardList from "./dashboardlist";
import { useGlobalContext } from "../../context/clientContext";
import { Paper } from "@mui/material";

export default function DashboardProject() {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <Paper
      elevation={7}
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "80px",
        marginRight: "15%",
        width: "800px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            marginLeft: "10%",
          }}
        >
          Projects
        </h2>
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {clientList.map((client, idx) => (
            <li key={idx}>
              <DashboardList client={client} />
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
}
