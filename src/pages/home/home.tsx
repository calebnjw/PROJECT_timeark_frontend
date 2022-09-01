import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Typography from "@mui/material/Typography";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

// import Sidebar from "../../components/sidebar";
import Clients from "../clients/clients";
import Projects from "../projects/projects";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}

      <Box
        style={{
          marginTop: "80px",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" align="center">
          Time Tracking &#38; Invoicing App for Freelancers
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop="30px"
        >
          <br />
          <Grid item xs={8}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
            justo eget quam tristique volutpat in non ante. Praesent egestas
            varius diam, eu volutpat felis malesuada non. Phasellus suscipit
            risus orci, eget condimentum neque elementum maximus. Curabitur
            vitae sapien non elit euismod fringilla non a est. Ut pellentesque
            fermentum imperdiet. Duis fringilla ipsum vitae felis maximus, ac
            rhoncus neque porta. Curabitur placerat velit at tortor tincidunt,
            lobortis sollicitudin lectus lacinia. Curabitur eleifend sit amet
            quam vel rutrum. Phasellus sed mollis quam, eget mollis augue.
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
