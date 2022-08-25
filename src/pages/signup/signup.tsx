import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Divider from "@mui/material/Divider";
import freelancerImg from "../../assets/images/freelancer.jpg";

export default function SignUp() {
  return (
    <Box sx={{ mt: "2rem" }}>
      <h1>SIGNUP PAGE</h1>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          YOU ARE SIGNING UP
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Image src={freelancerImg} />
        </Grid>
      </Grid>
    </Box>
  );
}
