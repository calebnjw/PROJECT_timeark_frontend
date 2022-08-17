import React from 'react'
import { Route, Routes } from 'react-router-dom';

//import pages for router
import InvoicePage from './pages/Invoice';


const PageRouter = () => {
    return (
        <Routes>
            <Route path='/invoice' element={<InvoicePage />}/>
        </Routes>
    )
}

export default PageRouter;