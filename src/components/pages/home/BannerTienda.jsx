import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const BannerTienda = () => {
  return (
    <Box>
      <h1>Tienda</h1>
      <p>
        Actualmente en nuestra tienda online van a encontrar cactus y
        suculentas, productos orgánicos para el cuidado de las plantas y depende
        de la estación, algunas semillas.
      </p>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cactivas-ecommerce.appspot.com/o/pizarra.jpg?alt=media&token=acba84f5-e97a-4771-9e61-0165c6251ddc"
        alt=""
        style={{ width: "100%", height: "auto", padding: "20px" }}
      />
      <Link to={"/shop"}>Ver tienda</Link>
    </Box>
  );
};
