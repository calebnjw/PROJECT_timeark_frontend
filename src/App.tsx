import { Page } from "@react-pdf/renderer";
import "./App.scss";
import InvoiceLanding from './pages/Invoice'

function App() {
  return (
    <div className="main-container">
      <div className="invoice-container">
      <InvoiceLanding />
      </div>
    </div>
  );
}

export default App;
