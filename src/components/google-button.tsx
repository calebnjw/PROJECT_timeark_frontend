import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function GoogleButton() {
  return (
    <Paper
      elevation={3}
      style={{
        width: "250px",
      }}
    >
      <Button
        variant="outlined"
        href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
        style={{
          fontSize: "14px",
          width: "250px",
        }}
      >
        <img
          src="./google-icon.png"
          alt="google-icon"
          style={{
            width: "18px",
            marginRight: "8px",
          }}
        />
        Sign In with Google
      </Button>
    </Paper>
  );
}
