import { useMediaQuery, BottomNavigation, Container, Link, Stack, Typography } from "@mui/material";

export default function Footer() {
  // const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2} textAlign={"inherit"}>
        <Typography variant="subtitle2" color="primary" component="span">
          &copy; 2022 Time Ark
        </Typography>

        <Stack direction={"row"} spacing={3} textAlign={"inherit"}>
          <Typography
            variant="subtitle2"
            color="primary"
            component={Link}
            href="https://codedthemes.com"
            target="_blank"
            underline="hover"
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            component={Link}
            href="https://codedthemes.support-hub.io/"
            target="_blank"
            underline="hover"
          >
            Support
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
