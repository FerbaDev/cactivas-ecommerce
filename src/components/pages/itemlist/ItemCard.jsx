import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ItemCard = ({ product }) => {
  return (
    <Box
      key={product.id}
      sx={{
        minWidth: "345px",
        maxWidth: "500px",
        paddingBottom: "5px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <img
        src={product.image}
        style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
        alt={product.title}
      />
      <Box sx={{ padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Typography variant="h6" className="montserrat">
          {product.title}
        </Typography>
        <Typography variant="body1" className="montserrat">
          Precio: ${product.unit_price}
        </Typography>
        <Typography variant="body2" className="montserrat">
          Stock: {product.stock}
        </Typography>
        <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              margin: "10px 0",
              width: "100%",
              backgroundColor: "#4CAF50",
              '&:hover': {
                backgroundColor: "#45A049",
              },
            }}
          >
            Ver detalle
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
