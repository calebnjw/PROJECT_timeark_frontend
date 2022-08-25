import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

export default function Login() {
  return (
    <Box>
      <Grid container direction={"column"} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" textAlign={"center"}>
            Log in to your account
          </Typography>
        </Grid>
        <Card>
          <CardContent>
            <Button href="/login/federated/google" variant="contained">
              Login with Google
            </Button>
            <Divider variant="middle" />
            <Button href="/login/federated/google" variant="contained">
              Login with GitHub
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
