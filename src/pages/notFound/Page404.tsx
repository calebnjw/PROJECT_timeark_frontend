import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./style.scss";

const Page404 = () => {
  return (
    <Box
      style={{
        backgroundImage:
          "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/257418/andy-holmes-698828-unsplash.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        color: "white",
      }}
    >
      <Typography variant="h2">
        <b>404</b>
      </Typography>
      <Typography variant="h4">Page is not found!</Typography>
      <Button variant="contained" style={{ color: "white" }} color="error">
        <Link to="/app/dashboard" style={{ textDecoration: "none" }}>
          Back To Dashboard
        </Link>
      </Button>
    </Box>
  );
};

export default Page404;
