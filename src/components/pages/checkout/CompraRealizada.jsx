import { Link } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Typography } from "@mui/material";

export const CompraRealizada = ({ orderId }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5">El pago se realizó con éxito</Typography>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "20px",
          width: "98%",
          marginTop: "20px",
        }}
      >
        <Typography paragraph sx={{ width: "100%" }}>
          Su número de compra es: {orderId}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column-reverse",
          gap: "1em",
        }}
      >
        <Link to="/shop">
          <Button variant="contained">Seguir comprando</Button>
        </Link>
        <ReactWhatsapp
          number="549-3571-57-3266"
          message="Hola! Me gustaría hacer una consulta."
          element="button"
          className="whatsapp"
        >
          <WhatsAppIcon />
          Whatsapp
        </ReactWhatsapp>
      </Box>
    </Box>
  );
};
