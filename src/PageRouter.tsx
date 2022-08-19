import { Route, Routes } from "react-router-dom";

//import pages for router
import InvoicePage from "./pages/InvoicePage";
import ProjectInvoices from "./components/ProjectInvoices";
import InvoiceLanding from "./components/InvoiceLanding";
import InvoiceDisplay from "./components/InvoiceDisplay";

const PageRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
      {/* <Routes>
        <Route path="/invoice/:id" element={<InvoiceLanding />} />
      </Routes> */}

    </>
  );
};

export default PageRouter;
