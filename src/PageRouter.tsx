import { Route, Routes } from "react-router-dom";

//import pages for router
import InvoicePage from "./pages/InvoicePage";
import ProjectInvoices from "./components/ProjectInvoices";
import InvoiceDisplay from "./components/InvoiceDisplay";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<InvoicePage />} />
      <Route path="/invoice" element={<ProjectInvoices />} />
      <Route path="/invoices/:id" element={<InvoiceDisplay />} />
    </Routes>
  );
};

export default PageRouter;
