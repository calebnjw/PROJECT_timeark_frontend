import React from 'react';
import { Box, Typography, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const PreForm = () => {
    // const [clientList, setClientList] from 
    return (
        <Box component="form" autoComplete="off">
            <Typography variant="h5" align="center">
                Invoices
            </Typography>
            <div>
                <TextField />
            </div>
            <div>
                <TextField />
            </div>
        </Box>
    )
}

export default PreForm;