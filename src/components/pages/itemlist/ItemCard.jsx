import { Box, Button } from "@mui/material";
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
          display: "flex", flexDirection: "column", 
        }}
      >
        <img
          src={product.image}
          style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
          alt={product.title}
        />
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              marginTop: "-10px",
            }}
          >
            <h4 className="montserrat">{product.title}</h4>
            <h4 className="montserrat">Precio: ${product.unit_price}</h4>
            <h4 className="montserrat">Stock: {product.stock}</h4>
          </Box>
          <Link to={`/itemDetail/${product.id}`}>
            <Button variant="contained" sx={{ margin: "10px" }}>
              Ver detalle
            </Button>
          </Link>
        </div>
      </Box>
    
  );
};
