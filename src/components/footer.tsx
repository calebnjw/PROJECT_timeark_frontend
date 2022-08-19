import BottomNavigation from "@mui/material/BottomNavigation";

export default function Footer() {
  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        align: "center",
        bgcolor: "primary.main",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <p>Copyright &copy; 2022 Time Ark</p>
    </BottomNavigation>
  );
}
