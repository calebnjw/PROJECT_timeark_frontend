// import { Page } from "@react-pdf/renderer";
import "./App.scss";
import PageRouter from "./PageRouter";


function App() {
  return (
    <div className="main-container">
      <div className="invoice-container">
        <PageRouter />
      </div>
    </div>
  );
}

export default App;
