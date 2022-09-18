import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/clientContext";
import EditClientForm from "./editClient_form";

export default function EditSingleClient() {
  const { setClientList } = useGlobalContext();
  const location = useLocation();
  const { client }: any = location.state;

  return (
    <div>
      <Box>
        <Grid
          container
          style={{
            // flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <EditClientForm client={client} setClientList={setClientList} />
        </Grid>
      </Box>
    </div>
  );
}
