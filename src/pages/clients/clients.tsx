import { useGlobalContext } from "../../context/clientContext";
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";

export default function Clients() {
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            <h2>Clients</h2>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Button variant="contained" color="success">
              <Link to="new" style={{ color: "white", textDecoration: "none" }}>
                + New client
              </Link>
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} style={{ width: "92%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightgray" }}>
                <TableCell>Client</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientList.map((client, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {client.client_name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/app/clients/${client._id}`);
                      }}
                    >
                      {<VisibilityIcon />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
