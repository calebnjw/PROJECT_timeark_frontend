import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Testimonail() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        backgroundColor: "#0047AB",
      }}
    >
      <Card
        style={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          marginRight: "50px",
        }}
      >
        <img
          src="./kai-homepage.jpeg"
          alt="Kai Rocket"
          style={{
            borderRadius: "50%",
            width: "180px",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Kai,
            <br /> Founder,
            <br /> Rocket Academy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            “Really Good Effort”
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          marginRight: "50px",
        }}
      >
        <img
          src="./bryan-homepage.jpeg"
          alt="Bryan Rocket"
          style={{
            borderRadius: "50%",
            width: "180px",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Bryan,
            <br /> Software Developer,
            <br /> Rocket Academy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            “Really useful to keep track my tasks here”
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="./foong-homepage.jpeg"
          alt="Foong Rocket"
          style={{
            borderRadius: "50%",
            width: "180px",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Foong,
            <br /> Head of Operations,
            <br /> Rocket Academy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            “It’s the best timer/invoicing app, I’ve seen”
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
