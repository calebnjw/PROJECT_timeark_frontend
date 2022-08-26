// import { TableProps } from "../../types/invoiceTypes";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import {
//   Table,
//   TableRow,
//   TableCell,
//   styled,
//   Button,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableBody,
//   FormControl,
//   MenuItem,
//   Select,
//   InputLabel,
//   Paper,
// } from "@mui/material";
// import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// axios.defaults.withCredentials = true;
// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

// //===================================Table styling==========================//
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// //===============================onClick & onChange functions==========================//
// const handleInvoices = () => {
//   console.log("Invoices button clicked");
// };

// const handleSelector = () => {
//   console.log("Paid/overdue selected");
// };

// //======================================Return section=======================//
// const MyTable = ({ rows }: TableProps) => {
//   return (
//     <>
//       <div className="invoice-list">
//         <TableContainer style={{ paddingLeft: "100px", paddingRight: "100px" }}>
//           <Paper>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell align="right">
//                     Invoice Number
//                   </StyledTableCell>
//                   <StyledTableCell align="right">Issued Date</StyledTableCell>
//                   <StyledTableCell align="right">Due Date</StyledTableCell>
//                   <StyledTableCell align="right">Status</StyledTableCell>
//                   <StyledTableCell align="right">View Invoices</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <StyledTableRow /*key={row.id}*/>
//                     <StyledTableCell align="left">{row.id}</StyledTableCell>
//                     <StyledTableCell align="left">{row.issuedDate}</StyledTableCell>
//                     <StyledTableCell align="left">{row.dueDate}</StyledTableCell>
//                     <FormControl sx={{ m: 1, minWidth: 90 }}>
//                       <InputLabel id="demo-simple-select-label">
//                         Status
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         // value={age}
//                         label="Status"
//                         onChange={handleSelector}
//                         variant="outlined"
//                       >
//                         <MenuItem value={"paid"}>Paid</MenuItem>
//                         <MenuItem value={"overdue"}>Overdue</MenuItem>
//                       </Select>
//                     </FormControl>
//                     <StyledTableCell align="right">
//                       <Button variant="outlined" onClick={handleInvoices}>
//                         <ReceiptRoundedIcon />
//                       </Button>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                  ))} 
//               </TableBody>
//             </Table>
//           </Paper>
//         </TableContainer>
//       </div>
//     </>
//   );
// };

// export default MyTable;

const MyTable = () => {
    return(
        <>
        </>
    )
}

export default MyTable;