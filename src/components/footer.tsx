import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function Footer() {
  return (
    <BottomNavigation
      showLabels
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
      <BottomNavigationAction label="Copyright &copy; 2022 Time Ark" />
    </BottomNavigation>
  );
}
