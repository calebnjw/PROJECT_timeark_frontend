import { Page } from "@react-pdf/renderer";
import "./App.scss";
import InvoicePage from './pages/InvoicePage'
import cors from 'cors';

function App() {
  return (
    <div className="main-container">
      <div className="invoice-container">
        <InvoicePage />
      </div>
    </div>
  );
}

export default App;
