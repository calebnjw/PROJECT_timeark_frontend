import { useState, useEffect } from "react";
import InvoiceLanding from "../components/InvoiceLanding";
import ProjectInvoices from "../components/ProjectInvoices";
import { InvoiceProps } from "../types/invoiceTypes";

const InvoicePage: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceProps[]>([]);

  return (
    <>
      <div>
        <h1>Projects</h1>
        <InvoiceLanding setInvoiceProp={setInvoice} invoiceProp={invoice}/>
      </div>
    </>
  );
};

export default InvoicePage;
