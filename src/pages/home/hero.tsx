import GoogleButton from "../../components/google-button";

export default function Hero() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "50px",
        paddingBottom: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Time Tracking &#38; Invoicing for Freelancers</h1>
        <br />
        <GoogleButton />
      </div>
      <div
        style={{
          width: "60%",
          paddingLeft: "5%",
          paddingRight: "5%",
          alignSelf: "center",
        }}
      >
        <p>
          TimeArk is a desktop only web application that helps freelancers to keep track of their
          projects with their clients. Every task you start is timed and the billable hours can be
          easily converted to an pdf invoice which you can send to your clients. Best of all, it’s
          free to use, just login with your Google Account to get started.
        </p>
      </div>
    </div>
  );
}
