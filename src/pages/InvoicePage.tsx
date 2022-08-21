import { useState, useEffect } from "react";
import InvoiceLanding from "../components/InvoiceLanding";
import ProjectInvoices from "../components/ProjectInvoices";
import { ProjectProps } from "../types/invoiceTypes";

const InvoicePage: React.FC = () => {
  const [project, setProject] = useState<ProjectProps[]>([]);

  return (
    <>
      <div>
        <h1>Projects</h1>
        <InvoiceLanding setProjectProp={setProject} projectProp={project}/>
      </div>
    </>
  );
};

export default InvoicePage;
