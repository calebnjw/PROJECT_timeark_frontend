import { useState, useEffect } from "react";
import InvoiceLanding from "./InvoiceLanding";
import { ProjectProps } from "../../types/invoiceTypes";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const InvoicePage: React.FC = () => {
  const [project, setProject] = useState<ProjectProps[]>([]);

  return (
    <>
      <div>
      <Navbar />
      <Sidebar />
        <h1>Projects</h1>
        <InvoiceLanding setProjectProp={setProject} projectProp={project}/>
      </div>
    </>
  );
};

export default InvoicePage;
