import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const OrdersList = ({ orders, setIsChange }) => {
  const deleteOrder = (id) => {
    deleteDoc(doc(db, "orders", id));
    setIsChange(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">email</TableCell>
              <TableCell align="left">telefono</TableCell>
              <TableCell align="left">item</TableCell>
              <TableCell align="left">total</TableCell>
              <TableCell align="left">cp</TableCell>
              <TableCell align="left">acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {order.email}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {order.phone}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {order.items}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {order.total}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {order.cp}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => deleteOrder(order.id)}>
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
