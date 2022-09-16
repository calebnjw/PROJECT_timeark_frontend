import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewClient from "./newclients_form";

export default function Clients() {
  return (
    <div>
      <Box>
        <Grid
          container
          style={{
            justifyContent: "center",
          }}
        >
          <NewClient />
        </Grid>
      </Box>
    </div>
  );
}
