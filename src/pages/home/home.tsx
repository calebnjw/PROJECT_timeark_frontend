import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Divider from "@mui/material/Divider";
import freelancerImg from "../../assets/images/freelancer.jpg";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Box sx={{ mt: "2rem" }}>
        <h1>Timer &#38; Invoicing App for Freelancers</h1>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id justo eget quam
            tristique volutpat in non ante. Praesent egestas varius diam, eu volutpat felis
            malesuada non. Phasellus suscipit risus orci, eget condimentum neque elementum maximus.
            Curabitur vitae sapien non elit euismod fringilla non a est. Ut pellentesque fermentum
            imperdiet. Duis fringilla ipsum vitae felis maximus, ac rhoncus neque porta. Curabitur
            placerat velit at tortor tincidunt, lobortis sollicitudin lectus lacinia. Curabitur
            eleifend sit amet quam vel rutrum. Phasellus sed mollis quam, eget mollis augue.
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <Image src={freelancerImg} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
