import { useGlobalContext } from "../../context/clientContext";
import {
  Box,
  Grid,
  Typography,
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
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const { clientList } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Box>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3ch",
        }}
      >
        <Grid item>
          <Typography variant="h3">Clients</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("new");
            }}
          >
            + New client
          </Button>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
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
  );
}
