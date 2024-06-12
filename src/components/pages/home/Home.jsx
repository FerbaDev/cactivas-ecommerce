import { Box } from "@mui/material";
import { Hero } from "./Hero";
import { Novedades } from "./Novedades";
import "./home.css"
import ProductosDestacados from "./ProductosDestacados";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Novedades />
      <ProductosDestacados />
    </Box>
  );
};

export default Home;
