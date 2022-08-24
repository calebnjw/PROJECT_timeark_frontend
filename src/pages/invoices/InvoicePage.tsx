import { useState, useEffect } from "react";
import InvoiceLanding from "./InvoiceLanding";
import { InvoiceProps } from "../../types/invoiceTypes";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "../clients/clients_sidebar";

const InvoicePage: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceProps[]>([]);

  return (
    <>
      <div>
      <Navbar />
      <Sidebar />
      {/* <ClientSidebar /> */}
        <InvoiceLanding setInvoiceProp={setInvoice} invoiceProp={invoice}/>
      </div>
    </>
  );
};

export default InvoicePage;
