import GoogleButton from "./google-button";

export default function CallToAction() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "200px",
        }}
      >
        <h2>Still Reading?</h2>
        <p>Get Started to save time and money today!</p>
        <br />
        <GoogleButton />
      </div>
      <div
        style={{
          width: "50%",
          justifyContent: "center",
          marginTop: "20px",
          marginLeft: "-150px",
        }}
      >
        <img src="./timeark-logo.png" alt="timeark logo" width="220px" />
      </div>
    </div>
  );
}
