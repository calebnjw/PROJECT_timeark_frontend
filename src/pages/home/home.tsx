import Hero from "./hero";
import Testimonial from "./testimonial";
import CallToAction from "./cta";
import Reasons from "./reasons";


export default function Home() {
  return (
    <>
      <Hero />
      <Testimonial />
      <Reasons />
      <CallToAction />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0047AB",
          padding: "5px",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "10px",
          }}
        >
          Copyright &copy; 2022 Time Ark"
        </p>
      </div>
    </>
  );
}
